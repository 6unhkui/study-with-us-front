import { Radio } from "antd";
import React, { useCallback } from "react";
import Modal from "@/components/Modal";
import { RoomSortBy } from "@/api/dto/room.dto";
import useRadio from "@/hooks/useRadio";
import styles from "./RoomSortModal.module.less";

export interface ISortItem {
    key: RoomSortBy;
    name: string;
}

export const sortItems: ISortItem[] = [
    { key: "NAME", name: "이름 순" },
    { key: "CREATED_DATE", name: "생성일 순" },
    { key: "JOIN_COUNT", name: "멤버 순" }
];

interface RoomSortModalProps {
    visible: boolean;
    onClose: () => void;
    selected?: RoomSortBy;
    onSubmit: (s: RoomSortBy) => void;
}

const RoomSortModal: React.FC<RoomSortModalProps> = ({ visible, onClose, selected: initialSelected, onSubmit }) => {
    const { selected, onChange } = useRadio<RoomSortBy>(initialSelected || sortItems[0].key);

    const onSubmitForm = useCallback(() => {
        onSubmit(selected);
        onClose();
    }, [onSubmit, onClose, selected]);

    return (
        <Modal type="confirm" onClose={onClose} header="정렬" visible={visible} onOk={onSubmitForm}>
            <div className={styles.wrapper}>
                <Radio.Group defaultValue={selected} className={styles.container}>
                    {sortItems.map(({ key, name }) => (
                        <Radio key={key} value={key} onChange={onChange} className={styles.item}>
                            {name}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
        </Modal>
    );
};

export default React.memo(RoomSortModal);
