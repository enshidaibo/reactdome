import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Spin, DatePicker } from "antd";
import moment from "moment";
import echarts from "echarts";

import MenuBar from "./Components/MenuBar";

import styles from "./StatisticsIndex.scss";

class StatFrequency extends Component {
    constructor(props) {
        super(props);
        let curDate = new Date();
        let start = new Date();
        let end = new Date();
        start.setDate(start.getDate() - 30);
        this.state = {
            sortedInfo: {},
            data: [],
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
            idx: "10406,10405"
        };

        let paramsJson = JSON.stringify(param);

        let res = await app.yssjfetch.post("admin/proxy/tx/" + this.state.platform + "/" + localStorages._site_id_param, {
            uri: "/ctr_usage_anal/get_freq_dis",
            paramStr: paramsJson
        });
        if (res.ret_code === 60000) {
            let tableData = [],
                retData = res.ret_data;

            for (let key in retData) {
                let obj = {
                    key: key,
                    activeUser: retData ? (retData[key].ActiveUser ? retData[key].ActiveUser : 0) : "",
                    newUser: retData ? (retData[key].NewUser ? retData[key].NewUser : 0) : "",
                    section: retData ? (retData[key].Section ? retData[key].Section : 0) : ""
                };
                tableData.push(obj);
            }

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

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            sortedInfo: sorter
        });
    };

    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [
            {
                title: "序号",
                align: "left",
                dataIndex: "key",
                key: "key",
                sorter: (a, b) => a.key - b.key,
                sortOrder: sortedInfo.columnKey === "key" && sortedInfo.order
            },
            {
                title: "活跃用户使用频率",
                align: "right",
                dataIndex: "activeUser",
                key: "activeUser",
                sorter: (a, b) => a.activeUser - b.activeUser,
                sortOrder: sortedInfo.columnKey === "activeUser" && sortedInfo.order
            },
            {
                title: "新增用户使用频率",
                align: "right",
                dataIndex: "newUser",
                key: "newUser",
                sorter: (a, b) => a.newUser - b.newUser,
                sortOrder: sortedInfo.columnKey === "newUser" && sortedInfo.order
            },
            {
                title: "备注",
                align: "right",
                dataIndex: "section",
                key: "section"
            }
        ];

        return (
            <div className={styles.aticleIndex}>
                <BreadcrumbCmp />
                <div className={styles.aticleList}>
                    <MenuBar
                        onChange={this.handleOnChangeRadio}
                        radio={this.state.platform}
                        selectedKeys="sb3"
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
                                                        dataSource={this.state.data}
                                                        rowKey={record => record.id}
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

export default StatFrequency;
