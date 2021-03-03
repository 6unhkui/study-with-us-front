import React, {useEffect, useCallback} from "react";
import {Drawer, Button, Descriptions } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_MEMBER_DETAIL_REQUEST, DELETE_MEMBER_REQUEST} from "store/modules/member";
import ReactHighcharts from 'react-highcharts';
import Loading from "components/Loading";
import Badge from "components/Badge";
import Avatar from "components/Avatar";

const MemberDetailDrawer = ({memberId, visible, onClose}) => {
    const dispatch = useDispatch();
    const { roomDetail : {isManager} } = useSelector(state => state.room);
    const { loadingMemberDetail, memberDetail : {name, email, role, joinDate, profileImg, postCount, attendanceStatistics}} = useSelector(state => state.member);

    useEffect(() => {
        dispatch({
            type : LOAD_MEMBER_DETAIL_REQUEST,
            memberId
        })
    }, [dispatch, memberId, role])

    const handleDeleteMember = useCallback(() => {
        dispatch({
            type : DELETE_MEMBER_REQUEST,
            memberId,
            meta : {
                callbackAction : () => {
                    onClose();
                }
            }
        })

        onClose();
    }, [dispatch, memberId, onClose])


    const config = {
        chart: {
            type: 'column'
        },
        title: {
            text: "Monthly Attendance Check Graph",
            style : {
                "fontSize" : "20px",
                "fontWeight" : "bold"
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            // max : 31,
            min: 0,
            title: {
                text: '출석 횟수'
            }
        },
        legend: {
            enabled : false
        },
        tooltip: {
            pointFormat: '<b>{point.y:1f}회</b>'
        },
        colors: ['var(--primary-color)'],
        series: [{
            name: 'Monthly',
            colorByPoint: true,
            data: attendanceStatistics && attendanceStatistics.map(v => ({
                name : v.name,
                y: v.count,
            })),
            dataLabels: [{
                enabled: true,
                inside: true,
                style: {
                    fontSize: '16px'
                }
            }],
        }]
    };

    return (
        <Drawer
            title="Member Profile"
            placement="right"
            width={640}
            onClose={onClose}
            visible={visible}
        >
            {loadingMemberDetail ? <Loading/> :
                <Descriptions title={
                                    <>
                                        <Avatar user={{name, profileImg}}/>
                                        {name}
                                        <Badge text={role} type={role === 'MANAGER' ? 'primary' : 'default'}/>
                                    </>
                                }
                                extra={isManager && role === "MATE" && <Button onClick={handleDeleteMember}>멤버 삭제</Button>}
                >
                    <Descriptions.Item label="Name" span={3}>{name}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>{email}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={3}>{role}</Descriptions.Item>
                    <Descriptions.Item label="Date of membership" span={3}>{joinDate}</Descriptions.Item>
                    <Descriptions.Item label="Number of posts written" span={3}>{postCount}</Descriptions.Item>
                    <Descriptions.Item span={3}>
                        <ReactHighcharts config={config}/>
                    </Descriptions.Item>
                </Descriptions>
            }
        </Drawer>
    )
}

export default MemberDetailDrawer;