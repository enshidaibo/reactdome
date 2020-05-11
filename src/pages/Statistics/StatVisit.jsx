import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Spin, DatePicker } from "antd";
import moment from "moment";
import echarts from "echarts";

import MenuBar from "./Components/MenuBar";

import styles from "./StatisticsIndex.scss";

class StatVisit extends Component {
    constructor(props) {
        super(props);
        let curDate = new Date();
        let start = new Date();
        let end = new Date();
        end.setDate(end.getDate() - 1);
        start.setDate(start.getDate() - 31);
        this.state = {
            data: [],
            sortedInfo: {
                order: "descend",
                columnKey: "date"
            },
            spanning: false,
            platform:
                localStorage.platform !== "android" && localStorage.platform !== "ios"
                    ? "android"
                    : localStorage.platform,
            offlineError: false,
            params: {
                start_date: start,
                end_date: end
            },
            charts: {
                title: "访问统计",
                xAxis: [],
                series: {
                    PageCountPerUv: [],
                    PageCountPerSession: [],
                    OnlineTimePerUv: [],
                    OnlineTimePerSession: []
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
            idx: "10401,10402,10403,10404"
        };

        let paramsJson = JSON.stringify(param);

        let res = await app.yssjfetch.post("admin/proxy/tx/" + this.state.platform + "/" + localStorages._site_id_param, {
            uri: "/ctr_usage_anal/get_offline_data",
            paramStr: paramsJson
        });

        if (res.ret_code === 60000) {
            let curDate = new Date(start);
            let xAxis = [],
                tableData = [],
                PageCountPerUv = [],
                PageCountPerSession = [],
                OnlineTimePerUv = [],
                OnlineTimePerSession = [];
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
                let PageCountPerUvData = data ? (data.PageCountPerUv ? data.PageCountPerUv : 0) : 0;
                let PageCountPerSessionData = data ? (data.PageCountPerSession ? data.PageCountPerSession : 0) : 0;
                let OnlineTimePerUvData = data ? (data.OnlineTimePerUv ? data.OnlineTimePerUv : 0) : 0;
                let OnlineTimePerSessionData = data ? (data.OnlineTimePerSession ? data.OnlineTimePerSession : 0) : 0;

                PageCountPerUvData = PageCountPerUvData.toString().replace(/,/g, "");
                PageCountPerSessionData = PageCountPerSessionData.toString().replace(/,/g, "");
                OnlineTimePerUvData = OnlineTimePerUvData.toString().replace(/,/g, "");
                OnlineTimePerSessionData = OnlineTimePerSessionData.toString().replace(/,/g, "");

                let obj = {
                    date: dateStr,
                    PageCountPerUv: PageCountPerUvData,
                    PageCountPerSession: PageCountPerSessionData,
                    OnlineTimePerUv: OnlineTimePerUvData,
                    OnlineTimePerSession: OnlineTimePerSessionData
                };

                xAxis.push(x);
                PageCountPerUv.push(PageCountPerUvData);
                PageCountPerSession.push(PageCountPerSessionData);
                OnlineTimePerUv.push(OnlineTimePerUvData);
                OnlineTimePerSession.push(OnlineTimePerSessionData);
                tableData.push(obj);

                curDate.setDate(curDate.getDate() + 1);
            } while (curDate <= end);

            charts.xAxis = xAxis;
            charts.series.PageCountPerUv = PageCountPerUv;
            charts.series.PageCountPerSession = PageCountPerSession;
            charts.series.OnlineTimePerUv = OnlineTimePerUv;
            charts.series.OnlineTimePerSession = OnlineTimePerSession;

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
                data: ["人均使用时长", "次均使用时长", "人均访问页面数", "次均访问页面数"]
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
                    name: "人均使用时长",
                    type: "line",
                    data: charts.series.PageCountPerUv
                },
                {
                    name: "次均使用时长",
                    type: "line",
                    data: charts.series.PageCountPerSession
                },
                {
                    name: "人均访问页面数",
                    type: "line",
                    data: charts.series.OnlineTimePerUv
                },
                {
                    name: "次均访问页面数",
                    type: "line",
                    data: charts.series.OnlineTimePerSession
                }
            ]
        };

        chart.setOption(option);
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
                title: "人均使用时长",
                align: "right",
                dataIndex: "PageCountPerUv",
                key: "PageCountPerUv",
                sorter: (a, b) => a.PageCountPerUv - b.PageCountPerUv,
                sortOrder: sortedInfo.columnKey === "PageCountPerUv" && sortedInfo.order
            },
            {
                title: "次均使用时长",
                align: "right",
                dataIndex: "PageCountPerSession",
                key: "PageCountPerSession",
                sorter: (a, b) => a.PageCountPerSession - b.PageCountPerSession,
                sortOrder: sortedInfo.columnKey === "PageCountPerSession" && sortedInfo.order
            },
            {
                title: "人均访问页面数",
                align: "right",
                dataIndex: "OnlineTimePerUv",
                key: "OnlineTimePerUv",
                sorter: (a, b) => a.OnlineTimePerUv - b.OnlineTimePerUv,
                sortOrder: sortedInfo.columnKey === "OnlineTimePerUv" && sortedInfo.order
            },
            {
                title: "次均访问页面数",
                align: "right",
                dataIndex: "OnlineTimePerSession",
                key: "OnlineTimePerSession",
                sorter: (a, b) => a.OnlineTimePerSession - b.OnlineTimePerSession,
                sortOrder: sortedInfo.columnKey === "OnlineTimePerSession" && sortedInfo.order
            }
        ];

        return (
            <div className={styles.aticleIndex}>
                <BreadcrumbCmp />
                <div className={styles.aticleList}>
                    <MenuBar
                        onChange={this.handleOnChangeRadio}
                        selectedKeys="sb2"
                        radio={this.state.platform}
                        openKeys="mn3"
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

export default StatVisit;
