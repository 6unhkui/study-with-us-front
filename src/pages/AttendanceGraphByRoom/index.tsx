import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import { useTypedSelector } from "@/store";
import { getAttendedMemberListByDateAsync } from "@/store/attendance";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment, { Moment } from "moment";
import { DatePicker } from "antd";
import { Bar, Doughnut } from "react-chartjs-2";
import { palette } from "@/styles/chartColorPalette";
import Divider from "@/components/Divider";
import { RangeValue } from "rc-picker/lib/interface";
import SEO from "@/components/SEO";
import styles from "./AttendanceGraphByRoom.module.less";

const datePickerPresetRanges: Record<string, Exclude<RangeValue<Moment>, null>> = {
    Today: [moment(), moment()],
    "This Week": [moment().startOf("week"), moment().endOf("week")],
    "This Month": [moment().startOf("month"), moment().endOf("month")]
};

const defaultChartData = {
    labels: [] as string[],
    datasets: [
        {
            label: "출석 일수",
            data: [] as number[],
            backgroundColor: palette.map(([bg]) => bg),
            borderColor: palette.map(([_, border]) => border),
            borderWidth: 1
        }
    ]
};
const barOptions = { plugins: { title: { display: true, text: "출석 일수" } } } as const;
const doughnutOptions = { plugins: { title: { display: true, text: "출석 비율" } } } as const;

interface AttendanceGraphByRoomProps {}

const AttendanceGraphByRoom: React.FC<AttendanceGraphByRoomProps> = () => {
    const intId = useGetIntIdFromUrl();
    const [chartData, setChatrData] = useState(defaultChartData);
    const [dates, setDates] = useState<{ startDate: Moment; endDate: Moment }>({
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    });
    const { data, loading } = useTypedSelector(state => state.attendance.attendanceHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getAttendedMemberListByDateAsync.request({
                roomId: intId,
                ...{
                    startDate: dates.startDate.format("YYYY-MM-DD"),
                    endDate: dates.endDate.format("YYYY-MM-DD")
                }
            })
        );
    }, [dispatch, intId, dates]);

    useEffect(() => {
        if (!loading && data) {
            setChatrData(state => ({
                ...state,
                labels: data.map(({ name }) => name),
                datasets: [
                    {
                        ...state.datasets[0],
                        data: data.map(({ count }) => count)
                    }
                ]
            }));
        }
    }, [data, loading]);

    const onDatePickerChange = useCallback((newDates: RangeValue<Moment>) => {
        if (newDates) {
            setDates({
                startDate: newDates[0] as Moment,
                endDate: newDates[1] as Moment
            });
        }
    }, []);

    return (
        <section>
            <SEO title="출석 그래프" />
            <div className={styles.datePicker}>
                <span className={styles.text}>날짜 선택</span>
                <DatePicker.RangePicker
                    ranges={datePickerPresetRanges}
                    format="YYYY.MM.DD"
                    defaultValue={[dates.startDate, dates.endDate]}
                    size="large"
                    onChange={onDatePickerChange}
                />
            </div>
            <Divider />
            <div className={styles.graphWrapper}>
                <div>
                    <Doughnut type="doughnut" data={chartData} options={doughnutOptions} />
                </div>
                <div>
                    <Bar type="bar" data={chartData} options={barOptions} />
                </div>
            </div>
        </section>
    );
};

export default AttendanceGraphByRoom;
