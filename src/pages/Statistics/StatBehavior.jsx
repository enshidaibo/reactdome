import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Spin, DatePicker } from "antd";
import moment from "moment";
import echarts from "echarts";

import MenuBar from "./Components/MenuBar";

import styles from "./StatisticsIndex.scss";

class StatBehavior extends Component {
    constructor(props) {
        super(props);
        let start = new Date();
        let end = new Date();
        end.setDate(end.getDate() - 1);
        start.setDate(start.getDate() - 31);
        this.state = {
            sortedInfo: {
                order: "descend",
                columnKey: "date"
            },
            data: [],
            platform:
                localStorage.platform !== "android" && localStorage.platform !== "ios"
                    ? "android"
                    : localStorage.platform,
            spanning: false,
            offlineError: false,
            params: {
                start_date: start,
                end_date: end
            },
            charts: {
                title: "活跃度",
                xAxis: [],
                series: {
                    DayUv: [],
                    WeekUv: [],
                    MonthUv: []
                }
            }
        };
    }

    componentDidMount = () => {
        this.httpGetAu();
    };

    handleChangeDate = (name, value) => {
        let end = new Date(value);
        let start = new Date(value);
        start.setDate(start.getDate() - 30);
        let { params } = this.state;
        params["start_date"] = start;
        params["end_date"] = end;
        this.setState(
            {
                params
            },
            () => {
                this.httpGetAu();
            }
        );
    };

    handleOnChangeRadio = e => {
        if (e.target.checked === true) {
            localStorage.setItem("platform", e.target.value);
            this.setState(
                {
                    platform: e.target.value
                },
                () => {
                    this.httpGetAu();
                }
            );
        }
    };

    httpGetAu = async () => {
        this.setState({
            spanning: true,
            offlineError: false
        });
        let { params, charts } = this.state;
        let start = params.start_date;
        let end = params.end_date;

        let startStr =
            start.getFullYear() +
            "-" +
            (start.getMonth() + 1 < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1) +
            "-" +
            (start.getDate() < 10 ? "0" + start.getDate() : start.getDate());

        let endStr =
            end.getFullYear() +
            "-" +
            (end.getMonth() + 1 < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1) +
            "-" +
            (end.getDate() < 10 ? "0" + end.getDate() : end.getDate());

        let param = {
            start_date: startStr,
            end_date: endStr,
            idx: "10201,10202,10203"
        };

        let paramsJson = JSON.stringify(param);

        let res = await app.yssjfetch.post("admin/proxy/tx/" + this.state.platform + "/" + localStorages._site_id_param, {
            uri: "/ctr_active_anal/get_offline_data",
            paramStr: paramsJson
        });

        if (res.ret_code === 60000) {
            let curDate = new Date(start);
            let xAxis = [],
                tableData = [],
                DayUv = [],
                WeekUv = [],
                MonthUv = [];
            do {
                let dateStr =
                    curDate.getFullYear() +
                    "-" +
                    (curDate.getMonth() + 1 < 10 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1) +
                    "-" +
                    (curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate());

                let x =
                    (curDate.getMonth() + 1 < 10 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1) +
                    "-" +
                    (curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate());
                let data = res.ret_data[dateStr] ? res.ret_data[dateStr] : "";
                let obj;
                // if (localStorages._site_id_param * 1 === 1) {
                obj = {
                    date: dateStr,
                    DayUv: data ? (data.DayUv ? data.DayUv * 1 * 3 : 0) : 0,
                    WeekUv: data ? (data.WeekUv ? data.WeekUv * 1 * 3 : 0) : 0,
                    MonthUv: data ? (data.MonthUv ? data.MonthUv * 1 * 3 : 0) : 0
                };
                // } else {
                //     obj = {
                //         date: dateStr,
                //         DayUv: data ? (data.DayUv ? data.DayUv : 0) : 0,
                //         WeekUv: data ? (data.WeekUv ? data.WeekUv : 0) : 0,
                //         MonthUv: data ? (data.MonthUv ? data.MonthUv : 0) : 0
                //     };
                // }

                xAxis.push(x);
                // if (localStorages._site_id_param * 1 === 1) {
                DayUv.push(data ? (data.DayUv ? data.DayUv * 1 * 3 : 0) : 0);
                WeekUv.push(data ? (data.WeekUv ? data.WeekUv * 1 * 3 : 0) : 0);
                MonthUv.push(data ? (data.MonthUv ? data.MonthUv * 1 * 3 : 0) : 0);
                // } else {
                //     DayUv.push(data ? (data.DayUv ? data.DayUv : 0) : 0);
                //     WeekUv.push(data ? (data.WeekUv ? data.WeekUv : 0) : 0);
                //     MonthUv.push(data ? (data.MonthUv ? data.MonthUv : 0) : 0);
                // }

                tableData.push(obj);

                curDate.setDate(curDate.getDate() + 1);
            } while (curDate <= end);

            charts.xAxis = xAxis;
            charts.series.DayUv = DayUv;
            charts.series.WeekUv = WeekUv;
            charts.series.MonthUv = MonthUv;

            this.setState(
                {
                    data: tableData,
                    spanning: false,
                    charts,
                    offlineError: false
                },
                () => {
                    this.drawChart();
                }
            );
        } else {
            this.setState({
                spanning: false,
                offlineError: true
            });
        }
    };

    drawChart = () => {
        let { charts } = this.state;
        let el = document.getElementById("echarts_canvas");
        let chart = echarts.init(document.getElementById("echarts_canvas"));
        let option = {
            title: {
                left: "center",
                text: charts.title
            },
            tooltip: {
                trigger: "axis"
            },
            legend: {
                bottom: "0",
                data: ["DAU", "WAU", "MAU"]
            },
            grid: {
                left: "3%",
                right: "4%",
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                },
                right: "20"
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: charts.xAxis
            },
            yAxis: {
                show: true,
                axisLine: {
                    show: false
                },
                type: "value"
            },
            series: [
                {
                    name: "DAU",
                    type: "line",
                    data: charts.series.DayUv
                },
                {
                    name: "WAU",
                    type: "line",
                    data: charts.series.WeekUv
                },
                {
                    name: "MAU",
                    type: "line",
                    data: charts.series.MonthUv
                }
            ]
        };

        chart.setOption(option);
    };

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            sortedInfo: sorter.columnKey ? sorter : { order: "descend", columnKey: "date" }
        });
    };

    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || { order: "descend", columnKey: "date" };
        const columns = [
            {
                title: "时间",
                align: "left",
                dataIndex: "date",
                key: "date",
                sorter: (a, b) => new Date(a.date) - new Date(b.date),
                sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order
            },
            {
                title: "DAU",
                align: "right",
                dataIndex: "DayUv",
                key: "DayUv",
                sorter: (a, b) => a.DayUv - b.DayUv,
                sortOrder: sortedInfo.columnKey === "DayUv" && sortedInfo.order
            },
            {
                title: "WAU",
                align: "right",
                dataIndex: "WeekUv",
                key: "WeekUv",
                sorter: (a, b) => a.WeekUv - b.WeekUv,
                sortOrder: sortedInfo.columnKey === "WeekUv" && sortedInfo.order
            },
            {
                title: "MAU",
                align: "right",
                dataIndex: "MonthUv",
                key: "MonthUv",
                sorter: (a, b) => a.MonthUv - b.MonthUv,
                sortOrder: sortedInfo.columnKey === "MonthUv" && sortedInfo.order
            },
            {
                title: "DAU/WAU",
                align: "right",
                dataIndex: "MonthUv",
                key: "DAU/WAU",
                render: (text, record) => {
                    if (isNaN(parseInt(record.DayUv)) || isNaN(parseInt(record.WeekUv))) {
                        return "--";
                    } else {
                        return parseInt(record.WeekUv) === 0
                            ? 0
                            : (parseInt(record.DayUv) / parseInt(record.WeekUv)).toFixed(2);
                    }
                }
            },
            {
                title: "DAU/MAU",
                align: "right",
                dataIndex: "MonthUv",
                key: "DAU/MAU",
                render: (text, record) => {
                    if (isNaN(parseInt(record.DayUv)) || isNaN(parseInt(record.MonthUv))) {
                        return "--";
                    } else {
                        return parseInt(record.MonthUv) === 0
                            ? 0
                            : (parseInt(record.DayUv) / parseInt(record.MonthUv)).toFixed(2);
                    }
                }
            }
        ];

        return (
            <div className={styles.aticleIndex}>
                <BreadcrumbCmp />
                <div className={styles.aticleList}>
                    <MenuBar
                        selectedKeys={"sb1"}
                        openKeys={"mn3"}
                        radio={this.state.platform}
                        onChange={this.handleOnChangeRadio}
                    />

                    <div className={styles.content}>
                        <Spin tip="loading..." spinning={this.state.spanning}>
                            <div className={styles.statCard}>
                                <div className={styles.statCardHd}>
                                    <h3>统计数据</h3>
                                    <div className={styles.hdIput}>
                                        <DatePicker
                                            value={
                                                this.state.params.end_date
                                                    ? moment(this.state.params.end_date, "YYYY-MM-DD")
                                                    : ""
                                            }
                                            onChange={(moment, dateStr) => this.handleChangeDate("end_date", dateStr)}
                                            format={"YYYY-MM-DD"}
                                            allowClear={false}
                                        />
                                    </div>
                                </div>
                                {this.state.offlineError ? (
                                    <div className={styles.errorMsg}>
                                        获取数据失败, <a onClick={this.httpGetAu}>点击重试</a>
                                    </div>
                                ) : (
                                        <div>
                                            <div className={styles.statChart}>
                                                <div className={styles.statChartHd}>趋势图</div>
                                                <div className={styles.statChartBd}>
                                                    <div style={{ width: "100%" }}>
                                                        <div
                                                            id="echarts_canvas"
                                                            style={{ height: "300px" }}
                                                            className={styles.echartsCanvas}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.statChart + " " + styles.noBorderBtm}>
                                                <div className={styles.statChartHd}>
                                                    <span>统计表格</span>
                                                </div>
                                                <div className={styles.statChartBd}>
                                                    <Table
                                                        pagination={false}
                                                        columns={columns}
                                                        dataSource={this.state.data}
                                                        rowKey={record => record.date}
                                                        onChange={this.handleTableChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </Spin>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatBehavior;
