import React, { useEffect, useState } from "react";
import Avatar from "components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST } from "store/modules/attendance";
import styled from "styled-components";
import RegisterAttendance from "containers/RoomDetail/AttendanceCheck/RegisterAttendance";
import { stringToColor } from "utils/ColorGenerator";
import { Typography, List, Divider, Button, Alert, Tooltip, Avatar as AntAvatar } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";

const { Title } = Typography;

const countdownToTomorrow = () => {
    // 내일 0시 0분의 시간을 가진 Date 객체
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setDate(date.getDate() + 1);

    return Date.now() + (Date.parse(date) - Date.now());
};

const Index = props => {
    const roomId = props.match.params.id;
    const dispatch = useDispatch();
    const { loadingMembersAttendance, membersAttendance, isRegisteredToday } = useSelector(state => state.attendance);
    const [registerLayerOpen, setRegisterLayerOpen] = useState(false);

    useEffect(() => {
        dispatch({
            type: LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST,
            roomId
        });
    }, [dispatch, roomId]);

    return (
        <ContentWrap>
            {registerLayerOpen && <RegisterAttendance setLayerOpen={setRegisterLayerOpen.bind(null, false)} roomId={roomId} />}

            <TitleWrap>
                <Title level={3} className="title">
                    출석 체크
                </Title>
                <Divider type="vertical" />
                <Countdown date={countdownToTomorrow()} daysInHours={true} />
            </TitleWrap>

            {!isRegisteredToday && (
                <Alert
                    message="오늘은 아직 출석체크를 하지 않았습니다."
                    description={
                        <Button type="primary" onClick={setRegisterLayerOpen.bind(null, true)} style={{ marginTop: "10px" }}>
                            출석 체크하기
                        </Button>
                    }
                    type="info"
                    icon={<ClockCircleOutlined />}
                    showIcon
                    style={{ margin: "20px 0" }}
                />
            )}

            <MembersWrap>
                <div className="title">출석 멤버</div>
                <List
                    loading={loadingMembersAttendance}
                    grid={{ gutter: 10, xs: 1, sm: 2, md: 2, lg: 3 }}
                    dataSource={membersAttendance && membersAttendance.filter(v => v.attendance)}
                    renderItem={(item, i) => (
                        <List.Item key={i}>
                            <div className="card-wrap">
                                <AvatarWrap>
                                    <Avatar user={{ ...item }} showName={true} />
                                </AvatarWrap>
                                <Divider style={{ margin: 0 }} />
                                <MemoWrap>
                                    {item.attendance.memo}
                                    <TimeWrap>{item.attendance.time}</TimeWrap>
                                </MemoWrap>
                            </div>
                        </List.Item>
                    )}
                />
            </MembersWrap>

            <MembersWrap>
                <div className="title">미출석 멤버</div>
                <AntAvatar.Group maxCount={10} maxStyle={{ color: "#fff", backgroundColor: "var(--primary-color)" }}>
                    {membersAttendance &&
                        membersAttendance
                            .filter(v => !v.attendance)
                            .map((item, i) => (
                                <Tooltip title={item.name} placement="top" key={i}>
                                    <AntAvatar
                                        src={item.profileImg}
                                        style={{
                                            backgroundColor: !item.profileImg && stringToColor(item.name)
                                        }}
                                    >
                                        {item.name.charAt(0).toLocaleUpperCase()}
                                    </AntAvatar>
                                </Tooltip>
                            ))}
                </AntAvatar.Group>
            </MembersWrap>
        </ContentWrap>
    );
};

export default Index;

const ContentWrap = styled.div`
    margin: 10px 0;
`;

const TitleWrap = styled.div`
    display: flex;
    align-items: center;

    .title {
        display: inline-block;
        margin: 0;
    }

    .count-down {
        display: inline-block;
        .ant-statistic-content {
            font-size: 15px;
        }
    }
`;

const MembersWrap = styled.div`
    margin: 30px 0;
    .title {
        margin-bottom: 10px;
        font-weight: 600;
    }
`;

const AvatarWrap = styled.div`
    padding: 10px 16px;
    font-weight: bold;
`;

const MemoWrap = styled.div`
    padding: 10px 16px;
`;

const TimeWrap = styled.div`
    margin-top: 8px;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
    color: var(--font-color-gray);
    opacity: 0.6;
`;
