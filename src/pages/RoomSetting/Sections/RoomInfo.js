import React, {useEffect, useCallback, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {SERVER_URI} from "constants/index";
import EmptyThumbnail from "assets/image/empty-thumbnail.png";
import {LOAD_ROOM_DETAIL_REQUEST, DELETE_ROOM_REQUEST, CHANGE_COVER_REQUEST, CHANGE_CATEGORY_REQUEST, EDIT_ROOM_REQUEST} from "store/modules/room";
import {CHANGE_MANAGER_REQUEST} from "store/modules/member";
import styled from "styled-components";
import ChangeManager from "components/ChangeManager";
import useToggle from 'hooks/useToggle';
import CategorySelector from "components/CategorySelector";

import {Button, Descriptions, Modal, Input, InputNumber, Switch} from 'antd';
import {CameraOutlined} from "@ant-design/icons";

const { TextArea } = Input;

const RoomInfo = ({roomId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const inputRef = useRef(null);
    const { roomDetail : {
        coverImage, coverGroupId, isMember, name, description, joinCount, createDate, manager, category, categoryId, maxCount, unlimited, isManager
    }} = useSelector(state => state.room);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [changeManagerModalVisible, setChangeManagerModalVisible] = useState(false);
    const [changeCategoryModalVisible, setChangeCategoryModalVisible] = useState(false);
    const initialFormValues = () => {
        setFormValues({
            name,
            description,
            maxCount,
            unlimited
        })
    }
    const [modifyMode, toggleModifyMode] = useToggle(initialFormValues);
    const [formValues, setFormValues] = useState({});


    useEffect(() => {
        dispatch({
            type : LOAD_ROOM_DETAIL_REQUEST,
            data : roomId
        })
    }, [dispatch, roomId]);


    const handleDeleteRoom = useCallback(() => {
        if(!isManager) {
            return false;
        }

        dispatch({
            type : DELETE_ROOM_REQUEST,
            data : roomId,
            meta : {
                callbackAction : () => {
                    history.push("/");
                }
            }
        })
    }, [dispatch, history, isManager, roomId]);

    
    const handleChangeCover = useCallback(e => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        const fileGroupId = coverGroupId;

        dispatch({
            type : CHANGE_COVER_REQUEST,
            roomId,
            file : data,
            fileGroupId
        })
    }, [coverGroupId, dispatch, roomId])

    
    const handleChangeChangeCategory = useCallback(value => {
        dispatch({
            type : CHANGE_CATEGORY_REQUEST,
            roomId,
            categoryId : value,
            meta : {
                callbackAction : () => {
                    setChangeCategoryModalVisible(false);
                }
            }
        })
    }, [dispatch, roomId]);


    const handleChangeChangeManager = useCallback(value => {
        dispatch({
            type : CHANGE_MANAGER_REQUEST,
            roomId,
            memberId : value,
            meta : {
                callbackAction : () => {
                    setChangeManagerModalVisible(false);
                }
            }
        })
    }, [dispatch, roomId])

    
    const handleEditFormChange = useCallback((name, value) => {
        setFormValues(values => ({
            ...values,
            [name] : value
        }))
    }, []);


    const handleEditFormSubmit = useCallback(() => {
        dispatch({
            type : EDIT_ROOM_REQUEST,
            roomId,
            data : formValues,
            meta : {
                callbackAction : () => {
                    toggleModifyMode();
                }
            }
        })
    }, [dispatch, formValues, roomId, toggleModifyMode])

    
    const actionItems = () => {
        if(modifyMode) {
            return (
                <>
                    <Button type="primary" onClick={handleEditFormSubmit} style={{marginRight : '8px'}}>저장하기</Button>
                    <Button onClick={toggleModifyMode}>취소</Button>
                </>
            )
        }

        return <Button type="primary" onClick={toggleModifyMode}>정보 변경</Button>
    }


    return (
        <Descriptions title="스터디방 정보" bordered
                      extra={isManager && actionItems()}>
            <Descriptions.Item label="제목" span={3}>
                {modifyMode ? <Input name="name"
                                     defaultValue={name}
                                     value={formValues.name}
                                     onChange={e => handleEditFormChange(e.target.name, e.target.value)}/> : name}
            </Descriptions.Item>

            <Descriptions.Item label="내용" span={3}>
                {modifyMode ? <TextArea
                    name="description"
                    value={formValues.description}
                    defaultValue={description}
                    onChange={e => handleEditFormChange(e.target.name, e.target.value)}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                /> : description}
            </Descriptions.Item>

            <Descriptions.Item label="카테고리" span={3}>
                {changeCategoryModalVisible &&
                    <CategorySelector setLayerOpen={setChangeCategoryModalVisible}
                                      initialValue={categoryId}
                                      onSubmit={handleChangeChangeCategory}
                                      submitText="변경하기"
                    />
                }

                {category}
                {isManager &&
                    <Button style={{marginLeft : '10px'}}
                        onClick={() => {setChangeCategoryModalVisible(true)}}
                    >
                        변경
                    </Button>
                }
            </Descriptions.Item>

            <Descriptions.Item label="썸네일 이미지" span={3}>
                <ProfileWrap width={'300px'} height={'130px'}>
                    {isManager &&
                    <div className="file-attachment" onClick={() => {
                        inputRef.current.click()
                    }}>
                        <CameraOutlined style={{color: "#fff", fontSize: "1.2rem"}}/>
                        <input type='file'
                               accept="image/*"
                               onChange={handleChangeCover}
                               style={{display: 'none'}}
                               ref={inputRef}/>
                    </div>
                    }
                    <img src={(coverImage ? `${SERVER_URI + '/api/v1/files/cover/' + coverImage}` : `${EmptyThumbnail}`)}
                        alt="cover_image" className={(coverImage && 'cover')}
                        style={{width : 'inherit', height : 'inherit', objectFit : 'cover'}}
                    />
                </ProfileWrap>
            </Descriptions.Item>

            <Descriptions.Item label="생성일" span={3}>
                {createDate}
            </Descriptions.Item>

            <Descriptions.Item label="멤버수" span={3}>
                {joinCount + (unlimited ? '' : ' / ' + maxCount)}
                {modifyMode &&
                    <MaxMemberCountWrap>
                        <div className="label">인원수 제한</div>
                        <InputNumber min={joinCount}
                                     placeholder="최대 인원수"
                                     style={{marginRight : '10px'}}
                                     onChange={value => handleEditFormChange('maxCount', value)}
                                     disabled={formValues.unlimited}
                        />
                        <Switch checkedChildren="제한"
                                unCheckedChildren="무제한"
                                checked={!formValues.unlimited}
                                onChange={value => handleEditFormChange('unlimited', !value)}
                                defaultChecked={!unlimited}/>
                    </MaxMemberCountWrap>
                }
            </Descriptions.Item>


            {isManager &&
                <Descriptions.Item label="매니저 위임" span={3}>
                    {changeManagerModalVisible &&
                        <ChangeManager roomId={roomId}
                                       setLayerOpen={setChangeManagerModalVisible}
                                       onSubmit={handleChangeChangeManager}
                        />
                    }
                    <Button onClick={() => {setChangeManagerModalVisible(true)}}>매니저 위임</Button>
                </Descriptions.Item>
            }

            {isManager &&
                <Descriptions.Item label="스터디방 폐쇄" span={3}>
                    <Button type="dashed" onClick={() => {setDeleteModalVisible(true)}}>폐쇄하기</Button>
                    <Modal
                        title={name}
                        visible={deleteModalVisible}
                        onOk={handleDeleteRoom}
                        onCancel={() => {setDeleteModalVisible(false)}}
                    >
                        <div>
                            <span>{name} 스터디방에 정말 폐쇄하시겠습니까?</span><br/>
                            <span>폐쇄를 진행할 경우, 데이터는 복원할 수 없습니다.</span>
                        </div>
                    </Modal>
                </Descriptions.Item>
            }
        </Descriptions>
    )
}

export default RoomInfo;


const ProfileWrap = styled.div`
   width : ${props => props.width};
   height : ${props => props.height};
   
   
   &:hover {
        .file-attachment {
            display : block;
        }
   }
   
   .file-attachment {
        display: none;
        cursor : pointer;
        position: absolute;
        width: ${props => props.width};
        height: ${props => props.height};
        background-color: #00000050;
        z-index: 99;
        text-align: center;
        line-height : ${props => props.height};
   }
`

const MaxMemberCountWrap = styled.div`
    margin-top : 10px;
    
    .label {
        margin-bottom : 10px;
        font-weight : bold;
    }
`