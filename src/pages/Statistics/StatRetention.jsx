import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Spin, DatePicker } from "antd";
import moment from "moment";
import echarts from "echarts";

import MenuBar from "./Components/MenuBar";

import styles from "./StatisticsIndex.scss";

class StatRetention extends Component {
    constructor(props) {
        super(props);
        let start = new Date();
        let end = new Date();
        end.setDate(end.getDate() - 1);
        start.setDate(end.getDate() - 31);
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
                title: "留存率",
                xAxis: [],
                series: {
                    retention: []
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
        let { charts, params } = this.state;
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
            idx: "11001,11002,11003,11004,11005,11006,11007,11008,11009"
        };

        let paramsJson = JSON.stringify(param);

        let res = await app.yssjfetch.post("admin/proxy/tx/" + this.state.platform + "/" + localStorages._site_id_param, {
            uri: "/ctr_user_retention/get_offline_data",
            paramStr: paramsJson
        });
        if (res.ret_code === 60000) {
            let series = [],
                retData = res.ret_data;
            let xAxis = [],
                tableData = [];
            let curDate = new Date(start);
            do {
                let curDateStr =
                    curDate.getFullYear() +
                    "-" +
                    (curDate.getMonth() + 1 < 10 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1) +
                    "-" +
                    (curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate());

                let x =
                    (curDate.getMonth() + 1 < 10 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1) +
                    "-" +
                    (curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate());

                xAxis.push(x);
                let obj = {
                    date: curDateStr,
                    D1RepeatUser: retData[curDateStr]
                        ? retData[curDateStr].D1RepeatUser
                            ? retData[curDateStr].D1RepeatUser
                            : 0
                        : 0,
                    D2RepeatUser: retData[curDateStr]
                        ? retData[curDateStr].D2RepeatUser
                            ? retData[curDateStr].D2RepeatUser
                            : 0
                        : 0,
                    D3RepeatUser: retData[curDateStr]
                        ? retData[curDateStr].D3RepeatUser
                            ? retData[curDateStr].D3RepeatUser
                            : 0
                        : 0,
                    D4RepeatUser: retData[curDateStr]
                        ? retData[curDateStr].D4RepeatUser
                            ? retData[curDateStr].D4RepeatUser
                            : 0
                        : 0,
                    D5RepeatUser: retData[curDateStr]
                        ? retData[curDateStr].D5RepeatUser
                            ? retData[curDateStr].D5RepeatUser
                            : 0
                        : 0,
                    D6RepeatUser: retData[curDateStr]
                        ? retData[curDateStr].D6RepeatUser
                            ? retData[curDateStr].D6RepeatUser
                            : 0
                        : 0,
                    D7RepeatUser: retData[curDateStr]
                        ? retData[curDateStr].D7RepeatUser
                            ? retData[curDateStr].D7RepeatUser
                            : 0
                        : 0,
                    D14RepeatUser: retData[curDateStr]
                        ? retData[curDateStr].D14RepeatUser
                            ? retData[curDateStr].D14RepeatUser
                            : 0
                        : 0,
                    D30RepeatUser: retData[curDateStr]
                        ? retData[curDateStr].D30RepeatUser
                            ? retData[curDateStr].D30RepeatUser
                            : 0
                        : 0
                };
                tableData.push(obj);
                curDate.setDate(curDate.getDate() + 1);
            } while (curDate <= end);

            this.setState({
                spanning: false,
                data: tableData,
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
                data: ["留存率"]
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
                    name: "留存率",
                    type: "line",
                    stack: "总量",
                    data: charts.series.retention
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
                title: "首次启动日",
                align: "left",
                dataIndex: "date",
                key: "date",
                sorter: (a, b) => new Date(a.date) - new Date(b.date),
                sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order
            },
            {
                title: "留存率(%)",
                children: [
                    {
                        title: "次日",
                        align: "left",
                        dataIndex: "D1RepeatUser",
                        key: "D1RepeatUser",
                        render: text => {
                            let number = isNaN(parseFloat(text)) ? true : parseFloat(text).toFixed(2);
                            if (number !== true) {
                                return number == 0 ? number : number + "%";
                            } else {
                                return text;
                            }
                        }
                    },
                    {
                        title: "2日后",
                        align: "left",
                        dataIndex: "D2RepeatUser",
                        key: "D2RepeatUser",
                        render: text => {
                            let number = isNaN(parseFloat(text)) ? true : parseFloat(text).toFixed(2);
                            if (number !== true) {
                                return number == 0 ? number : number + "%";
                            } else {
                                return text;
                            }
                        }
                    },
                    {
                        title: "3日后",
                        align: "left",
                        dataIndex: "D3RepeatUser",
                        key: "D3RepeatUser",
                        render: text => {
                            let number = isNaN(parseFloat(text)) ? true : parseFloat(text).toFixed(2);
                            if (number !== true) {
                                return number == 0 ? number : number + "%";
                            } else {
                                return text;
                            }
                        }
                    },
                    {
                        title: "4日后",
                        align: "left",
                        dataIndex: "D4RepeatUser",
                        key: "D4RepeatUser",
                        render: text => {
                            let number = isNaN(parseFloat(text)) ? true : parseFloat(text).toFixed(2);
                            if (number !== true) {
                                return number == 0 ? number : number + "%";
                            } else {
                                return text;
                            }
                        }
                    },
                    {
                        title: "5日后",
                        align: "left",
                        dataIndex: "D5RepeatUser",
                        key: "D5RepeatUser",
                        render: text => {
                            let number = isNaN(parseFloat(text)) ? true : parseFloat(text).toFixed(2);
                            if (number !== true) {
                                return number == 0 ? number : number + "%";
                            } else {
                                return text;
                            }
                        }
                    },
                    {
                        title: "6日后",
                        align: "left",
                        dataIndex: "D6RepeatUser",
                        key: "D6RepeatUser",
                        render: text => {
                            let number = isNaN(parseFloat(text)) ? true : parseFloat(text).toFixed(2);
                            if (number !== true) {
                                return number == 0 ? number : number + "%";
                            } else {
                                return text;
                            }
                        }
                    },
                    {
                        title: "7日后",
                        align: "left",
                        dataIndex: "D7RepeatUser",
                        key: "D7RepeatUser",
                        render: text => {
                            let number = isNaN(parseFloat(text)) ? true : parseFloat(text).toFixed(2);
                            if (number !== true) {
                                return number == 0 ? number : number + "%";
                            } else {
                                return text;
                            }
                        }
                    },
                    {
                        title: "14日后",
                        align: "left",
                        dataIndex: "D14RepeatUser",
                        key: "D14RepeatUser",
                        render: text => {
                            let number = isNaN(parseFloat(text)) ? true : parseFloat(text).toFixed(2);
                            if (number !== true) {
                                return number == 0 ? number : number + "%";
                            } else {
                                return text;
                            }
                        }
                    },
                    {
                        title: "30日后",
                        align: "left",
                        dataIndex: "D30RepeatUser",
                        key: "D30RepeatUser",
                        render: text => {
                            let number = isNaN(parseFloat(text)) ? true : parseFloat(text).toFixed(2);
                            if (number !== true) {
                                return number == 0 ? number : number + "%";
                            } else {
                                return text;
                            }
                        }
                    }
                ]
            }
        ];

        return (
            <div className={styles.aticleIndex}>
                <BreadcrumbCmp />
                <div className={styles.aticleList}>
                    <MenuBar
                        onChange={this.handleOnChangeRadio}
                        selectedKeys="sb4"
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
                                                    bordered
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

export default StatRetention;
