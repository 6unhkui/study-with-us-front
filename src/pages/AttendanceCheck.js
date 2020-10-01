import React from 'react';
import CategorySlide from 'containers/CategorySlide';

import {Typography, Divider, Alert, Calendar, Button, Form} from 'antd';
import Avatar from "../components/Avatar";
import {useSelector} from "react-redux";

const { Title } = Typography;

const AttendanceCheck = () => {
    const { name, profileImg, accountId } = useSelector(state => state.account.me);
    function getListData(value) {
        let listData;
        console.log("value.date()" + value.date());
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                    { type: 'error', content: 'This is error event.' },
                ];
                break;
            case 15:
                listData = [
                    { type: 'warning', content: 'This is warning event' },
                    { type: 'success', content: 'This is very long usual event。。....' },
                    { type: 'error', content: 'This is error event 1.' },
                    { type: 'error', content: 'This is error event 2.' },
                    { type: 'error', content: 'This is error event 3.' },
                    { type: 'error', content: 'This is error event 4.' },
                ];
                break;
            default:
        }
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
                    listData.map(item => (
                        <div>
                            <Avatar user={{name, profileImg}}/>
                            <span>{name}</span>
                        </div>
                ))
        );
    }

    return (
        <>
            <div style={{margin : '1.6rem', textAlign : 'center'}}>
                <div>아직 출석체크를 안하셨습니다.</div>
                <Button type="primary" className='shadow' style={{marginTop : '1rem'}}
                >
                    출석체크
                </Button>
            </div>
            <Divider/>
            <Calendar mode={'month'} dateCellRender={dateCellRender}/>
        </>
    )
}

export default AttendanceCheck;