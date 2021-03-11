import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHighcharts from "react-highcharts";
import moment from "moment";
import styled from "styled-components";
import { LOAD_MEMBERS_STATISTIC_REQUEST } from "store/modules/attendance";
import { stringToColor } from "utils/ColorGenerator";
import { DatePicker, Typography } from "antd";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const AttendanceCheck = props => {
    const dispatch = useDispatch();
    const roomId = props.match.params.id;
    const { MembersStatistics } = useSelector(state => state.attendance);
    const [startDate, setStartDate] = useState(moment().startOf("month"));
    const [endDate, setEndDate] = useState(moment().endOf("month"));

    useEffect(() => {
        dispatch({
            type: LOAD_MEMBERS_STATISTIC_REQUEST,
            roomId,
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD")
        });
    }, [dispatch, endDate, roomId, startDate]);

    const handleChangeDate = useCallback(mt => {
        if (mt) {
            setStartDate(mt[0]);
            setEndDate(mt[1]);
        }
    }, []);

    const config = {
        chart: {
            type: "column"
        },
        title: {
            text: `${startDate.format("YYYY.MM.DD")} ~ ${endDate.format("YYYY.MM.DD")}`,
            style: {
                fontSize: "20px",
                fontWeight: "bold"
            }
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            // max : 31,
            min: 0,
            title: {
                text: "출석 횟수"
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: "<b>{point.y:1f}회</b>"
        },
        colors: ["var(--primary-color)"],
        series: [
            {
                name: "Count",
                colorByPoint: true,
                data: MembersStatistics.map(v => ({
                    name: v.name,
                    y: v.count,
                    color: stringToColor(v.name)
                })),
                dataLabels: [
                    {
                        enabled: true,
                        inside: true,
                        style: {
                            fontSize: "16px"
                        }
                    }
                ]
            }
        ]
    };

    return (
        <ContentWrap>
            <TitleWrap>
                <Title level={3} className="title">
                    출석 기록
                </Title>
                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        "This Month": [moment().startOf("month"), moment().endOf("month")]
                    }}
                    format={"YYYY.MM.DD"}
                    defaultValue={[startDate, endDate]}
                    onChange={handleChangeDate}
                />
            </TitleWrap>
            <ReactHighcharts config={config} />
        </ContentWrap>
    );
};

export default AttendanceCheck;

const ContentWrap = styled.div`
    margin: 10px 0;
`;

const TitleWrap = styled.div`
    display: flex;
    margin-bottom: 20px;

    .title {
        display: inline-block;
        flex: 1;
        margin: 0;
    }
`;
