import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';
import styled from "styled-components";
import {LOAD_MONTHLY_STATISTIC_REQUEST} from "store/modules/attendance";
import {stringToColor} from "utils/ColorGenerator";
import {DatePicker, Typography} from 'antd';
const { Title } = Typography;

const AttendanceRecord = (props) => {
    const dispatch = useDispatch();
    const roomId = props.match.params.id;
    const { monthlyStatistics } = useSelector(state => state.attendance);
    const [date, setDate] = useState(moment().date(1));

    useEffect(() => {
        dispatch({
            type : LOAD_MONTHLY_STATISTIC_REQUEST,
            roomId,
            date : date.format("YYYY-MM-DD")
        })
    }, [date, dispatch, roomId])

    const handleChangeDate = useCallback((m, s) => {
        if(m) {
            setDate(m);
        }
    }, [])

    const config = {
        chart: {
            type: 'column'
        },
        title: {
            text: date.format('YYYY.MM'),
            style : {
                "fontSize" : "20px",
                "fontWeight" : "bold"
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            max : 31,
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
            data: monthlyStatistics.map(v => ({
                name : v.name,
                y: v.count,
                color : stringToColor(v.name)
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
        <ContentWrap>
            <TitleWrap>
                <Title level={3} className="title">월별 출석 기록</Title>
                <DatePicker defaultValue={moment(date, 'YYYY.MM')}
                            format={'YYYY.MM'}
                            picker="month"
                            onChange={handleChangeDate}
                />
            </TitleWrap>
            <ReactHighcharts config={config}/>
        </ContentWrap>
    )
}

export default AttendanceRecord;

const ContentWrap = styled.div`
    margin : 10px 0;
`

const TitleWrap = styled.div`
    display : flex;
    margin-bottom : 20px;
    
    .title {
        display : inline-block;
        flex : 1;
        margin : 0;
    }
`