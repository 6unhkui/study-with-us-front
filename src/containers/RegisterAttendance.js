import React, {useCallback} from "react";
import LayerPopup from "components/LayerPopup";
import { Form, Input, Button } from 'antd';
import {useDispatch} from "react-redux";
import {REGISTER_ATTENDANCE_REQUEST} from "store/modules/attendance";

const RegisterAttendance = ({roomId, setLayerOpen}) => {
    const dispatch = useDispatch();

    const handleSubmit = useCallback(value => {
        dispatch({
            type : REGISTER_ATTENDANCE_REQUEST,
            roomId,
            data : {
                memo : value.memo ? value.memo : ''
            }
        })
        setLayerOpen(false);
    }, [dispatch, roomId, setLayerOpen])

    return (
        <LayerPopup title="출석 체크" setLayerOpen={setLayerOpen} size="400px">
            <Form name="registerForm"
                  style={{textAlign : 'center'}}
                  onFinish={handleSubmit}
            >
                <Form.Item name="memo">
                    <Input.TextArea style={{minHeight : '100px', maxHeight : '100px'}} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        출석 체크
                    </Button>
                </Form.Item>
            </Form>
        </LayerPopup>
    )
}

export default RegisterAttendance;