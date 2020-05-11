import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Spin, DatePicker } from "antd";
import moment from "moment";
import echarts from "echarts";

import MenuBar from "./Components/MenuBar";

import styles from "./StatisticsIndex.scss";

class StatCrash extends Component {
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
                columnKey: "LastTime"
            },
            platform:
                localStorage.platform !== "android" && localStorage.platform !== "ios"
                    ? "android"
                    : localStorage.platform,
            spanning: false,
            offlineError: false,
            params: {
                start_date: start,
                end_date: end,
                err_ty: "1"
            },
            charts: {
                title: "Crash列表",
                xAxis: [],
                series: {
                    ErrorNum: [],
                    ErrorUser: []
                }
            }
        };
    }

    componentDidMount = () => {
        this.httpGetError();
    };

    httpGetError = async () => {
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
            err_ty: params.err_ty,
            idx: "10502,10501"
        };
        let paramsJson = JSON.stringify(param);
        let res = await app.yssjfetch.post("admin/proxy/tx/" + this.state.platform + "/" + localStorages._site_id_param, {
            uri: "/ctr_crash_anal/get_offline_data",
            paramStr: paramsJson
        });

        if (res.ret_code === 60000) {
            let crash = [];
            let count = new Date(end);
            while (count >= start) {
                let key = count.getFullYear() +
                    "-" +
                    (count.getMonth() + 1 < 10 ? "0" + (count.getMonth() + 1) : count.getMonth() + 1) +
                    "-" +
                    (count.getDate() < 10 ? "0" + count.getDate() : count.getDate());

                if (res.ret_data && res.ret_data[key]) {
                    let d = {
                        date: key,
                        ErrorNum: res.ret_data[key]['ErrorNum'] ? res.ret_data[key]['ErrorNum'] : "0",
                        ErrorUser: res.ret_data[key]['ErrorUser'] ? res.ret_data[key]['ErrorUser'] : "0"
                    }
                    crash.push(d);
                }
                count.setDate(count.getDate() - 1);
            }

            this.setState({
                data: crash,
                spanning: false,
                charts,
                offlineError: false
            });
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
                data: ["错误次数", "错误覆盖人数"]
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
                    name: "错误次数",
                    type: "line",
                    data: charts.series.ErrorNum
                },
                {
                    name: "错误覆盖人数",
                    type: "line",
                    data: charts.series.ErrorUser
                }
            ]
        };

        chart.setOption(option);
    };

    handleSwitch = name => {
        let { params } = this.state;
        params.err_ty = name;
        this.setState(
            {
                offlineError: false,
                params
            },
            () => {
                this.httpGetError();
            }
        );
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
                this.httpGetError();
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
                    this.httpGetError();
                }
            );
        }
    };

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            sortedInfo: sorter.columnKey ? sorter : { order: "descend", columnKey: "LastTime" }
        });
    };

    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || { order: "descend", columnKey: "LastTime" };
        const columns = [
            {
                title: "时间",
                align: "right",
                dataIndex: "date",
                key: "date",
                sorter: (a, b) => new Date(a.date) - new Date(b.date),
                sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order
            },
            {
                title: "错误次数",
                align: "right",
                dataIndex: "ErrorNum",
                key: "ErrorNum",
                sorter: (a, b) => a.ErrorNum - b.ErrorNum,
                sortOrder: sortedInfo.columnKey === "ErrorNum" && sortedInfo.order
            },
            {
                title: "错误覆盖人数",
                align: "right",
                dataIndex: "ErrorUser",
                key: "ErrorUser",
                sorter: (a, b) => a.ErrorUser - b.ErrorUser,
                sortOrder: sortedInfo.columnKey === "ErrorUser" && sortedInfo.order
            }
        ];

        return (
            <div className={styles.aticleIndex}>
                <BreadcrumbCmp />
                <div className={styles.aticleList}>
                    <MenuBar
                        selectedKeys={"sb7"}
                        openKeys={"mn4"}
                        radio={this.state.platform}
                        onChange={this.handleOnChangeRadio}
                    />

                    <div className={styles.content}>
                        <Spin tip="loading..." spinning={this.state.spanning}>
                            <div className={styles.statCard}>
                                <div className={styles.statCardHd}>
                                    <h3>统计数据</h3>
                                    <div className={styles.hditem}>
                                        <div
                                            className={this.state.params.err_ty === "1" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("1")}
                                        >
                                            输出错误
                                        </div>
                                        <div
                                            className={this.state.params.err_ty === "2" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("2")}
                                        >
                                            捕获异常
                                        </div>
                                        <div
                                            className={this.state.params.err_ty === "3" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("3")}
                                        >
                                            AppCrash
                                        </div>
                                        <div
                                            className={this.state.params.err_ty === "4" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("4")}
                                        >
                                            NativeCrash
                                        </div>
                                        <div
                                            className={this.state.params.err_ty === "5" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("5")}
                                        >
                                            SDK异常
                                        </div>
                                    </div>
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
                                        获取数据失败, <a onClick={this.httpGetError}>点击重试</a>
                                    </div>
                                ) : (
                                        <div>
                                            {/* <div className={styles.statChart}>
                                            <div className={styles.statChartHd}>趋势图</div>
                                            <div className={styles.statChartBd}>
                                                <div style={{width: '100%'}}>
                                                    <div id="echarts_canvas" style={{height: '300px'}} className={styles.echartsCanvas}></div>
                                                </div>
                                            </div>
                                        </div> */}
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

export default StatCrash;
