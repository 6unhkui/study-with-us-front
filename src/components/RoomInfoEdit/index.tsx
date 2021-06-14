import { useTypedSelector } from "@/store";
import makeFileUrl from "@/utils/makeFileUrl";
import React, { useCallback, useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import TextOrInputField from "@/components/TextOrInputField";
import useToggle from "@/hooks/useToggle";
import { useDispatch } from "react-redux";
import { RoomDetailDTO, UpdateRoomDTO } from "@/api/dto/room.dto";
import { Alert, Button, InputNumber, message, Switch } from "antd";
import useModal from "@/hooks/useModal";
import ManagerChangeModal from "@/components/ManagerChangeModal";
import CategoryModal from "@/components/CategoryChangeModal";
import useInput from "@/hooks/useInput";
import { changeCoverImageAsync, deleteRoomAsync, updateRoomAsync } from "@/store/room";
import { MemberDTO } from "@/api/dto/member.dto";
import DragNDropImageUploader from "@/components/DragNDropImageUploader";
import styles from "./RoomInfoEdit.module.less";
import Modal from "../Modal";
import Checkbox from "../Checkbox";

const CategoryField: React.FC<{
    category: string;
    categoryId: number;
    isManager: boolean;
    roomId: number;
}> = React.memo(({ category, categoryId, isManager, roomId }) => {
    const { visible, onClose, onOpen } = useModal();

    return (
        <>
            {visible && <CategoryModal visible={visible} onClose={onClose} roomId={roomId} defaultCategoryId={categoryId} />}
            <Badge type="primary">{category}</Badge>
            {isManager && (
                <Button className={styles.btn} onClick={onOpen}>
                    카테고리 변경
                </Button>
            )}
        </>
    );
});

const ManagerField: React.FC<{ manager: MemberDTO; isManager: boolean; roomId: number }> = React.memo(
    ({ manager, isManager, roomId }) => {
        const { visible, onClose, onOpen } = useModal();

        return (
            <>
                {visible && <ManagerChangeModal visible={visible} onClose={onClose} roomId={roomId} />}
                <Avatar name={manager.name} profileImage={manager.profileImg} size={40} />
                <span>{manager.name}</span>
                {isManager && <Button onClick={onOpen}>매니저 위임</Button>}
            </>
        );
    }
);

const CoverImageField: React.FC<{
    coverImage: string;
    coverGroupId?: number;
    roomName: string;
    isManager: boolean;
    roomId: number;
}> = React.memo(({ isManager, coverGroupId, coverImage, roomId, roomName }) => {
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (file: File) => {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                dispatch(changeCoverImageAsync.request({ fileGroupId: coverGroupId, file: formData, roomId }));
            }
        },
        [dispatch, roomId, coverGroupId]
    );

    return (
        <div className={styles.coverImageWrapper}>
            {isManager ? (
                <DragNDropImageUploader defaultPreview={coverImage} alt={roomName} onChange={onSubmit} />
            ) : (
                <img src={coverImage} alt={roomName} className={styles.coverImage} />
            )}
        </div>
    );
});

const RoomDeleteField: React.FC<{ roomId: number; roomName: string }> = React.memo(({ roomId, roomName }) => {
    const { onClose, onOpen, visible } = useModal();
    const { onToggle, isOn, reset } = useToggle();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        if (!isOn) {
            setError("동의 버튼을 눌러주세요.");
            return;
        }

        dispatch(deleteRoomAsync.request(roomId));
    }, [isOn, dispatch, roomId]);

    const onModalOpen = useCallback(() => {
        setError("");
        reset();
        onOpen();
    }, [onOpen, reset]);

    return (
        <div>
            {visible && (
                <Modal type="confirm" header="스터디방 폐쇄" visible={visible} onClose={onClose} onOk={onSubmit}>
                    {error && (
                        <>
                            <Alert type="error" message={error} showIcon /> <br />
                        </>
                    )}
                    <span>[{roomName}] 스터디방을 정말 폐쇄하시겠습니끼?</span>
                    <br />
                    <span> 폐쇄를 진행할 경우, 데이터는 복원할 수 없습니다.</span>
                    <br /> <br />
                    <Checkbox label="동의 합니다" value={isOn} onChange={onToggle} />
                </Modal>
            )}
            <Button onClick={onModalOpen} type="dashed">
                폐쇄 하기
            </Button>
            <div className={styles.guide}>
                ✓ 스터디방을 폐쇄하면 데이터를 복원할 수 없습니다.
                <br />
                폐쇄는 신중하게 진행해주세요.
            </div>
        </div>
    );
});

interface RoomInfoEditProps extends RoomDetailDTO {}

const RoomInfoEdit: React.FC<RoomInfoEditProps> = ({ roomId, ...room }) => {
    const { onToggle, isOn: editModeIsOn } = useToggle();
    const { input: nameInput, onChange: changeNameInput, reset: resetNameInput } = useInput(room.name);
    const { input: descInput, onChange: changeDescInput, reset: resetDescInput } = useInput(room.description);
    const { isOn: limitSwitchIsOn, onToggle: toggleLimitSwitch, reset: resetLimitSwitch } = useToggle(!room.unlimited);
    const [finiteNumbers, setFiniteNumber] = useState<number>(room.maxCount !== 0 ? room.maxCount : room.joinCount);
    const { data, loading } = useTypedSelector(state => state.room.updateRoom);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(updateRoomAsync.cancel(""));
        };
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            message.success("정보 변경에 성공하였습니다.");
        }
    }, [data]);

    const onSubmit = useCallback(() => {
        if (nameInput) {
            const payload: Partial<UpdateRoomDTO> = {
                roomId,
                name: nameInput,
                description: descInput
            };

            if (limitSwitchIsOn) {
                payload.unlimited = false;
                payload.maxCount = finiteNumbers;
            } else {
                payload.unlimited = true;
                payload.maxCount = 0;
            }

            dispatch(updateRoomAsync.request(payload as UpdateRoomDTO));
            onToggle();
        }
    }, [nameInput, descInput, dispatch, roomId, finiteNumbers, limitSwitchIsOn, onToggle]);

    const onCancel = useCallback(() => {
        onToggle();
        resetNameInput();
        resetDescInput();
        resetLimitSwitch();
        setFiniteNumber(room.maxCount !== 0 ? room.maxCount : room.joinCount);
    }, [onToggle, resetNameInput, resetDescInput, resetLimitSwitch, setFiniteNumber, room]);

    let buttonArea;
    if (editModeIsOn) {
        buttonArea = (
            <>
                <Button type="primary" onClick={onSubmit} loading={loading}>
                    저장하기
                </Button>
                <Button onClick={onCancel}>취소</Button>
            </>
        );
    } else {
        buttonArea = (
            <Button onClick={onToggle} type="primary">
                변경하기
            </Button>
        );
    }

    return (
        <section className={styles.container}>
            <div className={styles.titleArea}>
                <h4 className={styles.sectionTitle}>스터디방 정보</h4>
                {room.isManager && <div className={styles.buttonArea}>{buttonArea}</div>}
            </div>

            <table>
                <tbody>
                    <tr>
                        <th>이름</th>
                        <td>
                            <TextOrInputField
                                name="name"
                                defaultValue={nameInput}
                                onChange={changeNameInput}
                                isInput={room.isManager && editModeIsOn}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>설명</th>
                        <td>
                            <TextOrInputField
                                name="description"
                                defaultValue={descInput}
                                onChange={changeDescInput}
                                isInput={room.isManager && editModeIsOn}
                                textarea
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>카테고리</th>
                        <td className={styles.category}>
                            <CategoryField
                                category={room.category}
                                categoryId={room.categoryId}
                                roomId={roomId}
                                isManager={room.isManager}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>매니저</th>
                        <td className={styles.avatar}>
                            <ManagerField manager={room.manager} isManager={room.isManager} roomId={roomId} />
                        </td>
                    </tr>
                    <tr>
                        <th>커버 이미지</th>
                        <td>
                            <CoverImageField
                                coverGroupId={room.coverGroupId}
                                coverImage={makeFileUrl(room.coverImage, "COVER")}
                                isManager={room.isManager}
                                roomName={room.name}
                                roomId={roomId}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>생성일</th>
                        <td>{room.createDate}</td>
                    </tr>
                    <tr>
                        <th>가입 멤버수</th>
                        <td>
                            <span>
                                {`${room.joinCount} `}
                                {room.maxCount !== 0 ? `/ ${room.maxCount} ` : null}
                                Member{room.joinCount > 1 ? "s" : null}
                            </span>

                            {editModeIsOn && (
                                <div className={styles.memberLimit}>
                                    <InputNumber
                                        placeholder="최대 인원수"
                                        min={room.joinCount}
                                        max={999}
                                        disabled={!limitSwitchIsOn}
                                        defaultValue={finiteNumbers}
                                        onChange={setFiniteNumber}
                                    />
                                    <Switch
                                        checkedChildren="제한"
                                        unCheckedChildren="무제한"
                                        onChange={toggleLimitSwitch}
                                        checked={limitSwitchIsOn}
                                    />
                                </div>
                            )}
                        </td>
                    </tr>
                    {room.isManager && (
                        <tr>
                            <th>스터디방 폐쇄</th>
                            <td>
                                <RoomDeleteField roomId={roomId} roomName={room.name} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default RoomInfoEdit;
