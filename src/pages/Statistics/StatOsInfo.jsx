import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Spin, DatePicker, Input } from "antd";
import echarts from "echarts";
import moment from "moment";

import MenuBar from "./Components/MenuBar";

import styles from "./StatisticsIndex.scss";

class StatOsInfo extends Component {
    constructor(props) {
        super(props);
        let start = new Date();
        this.state = {
            data: [],
            spanning: false,
            platform:
                localStorage.platform !== "android" && localStorage.platform !== "ios"
                    ? "android"
                    : localStorage.platform,
            offlineError: false,
            params: {
                start_date: moment().format("YYYY-MM-DD"),
                ty: "1"
            },
            charts: {
                title: "活跃度",
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

        let param = {
            start_date: params.start_date,
            end_date: params.start_date,
            idx: "10504,10503",
            ty: params.ty
        };

        let paramsJson = JSON.stringify(param);

        let res = await app.yssjfetch.post("admin/proxy/tx/" + this.state.platform + "/" + localStorages._site_id_param, {
            uri: "/ctr_crash_anal/get_env_dis",
            paramStr: paramsJson
        });
        if (res.ret_code === 60000) {
            let tableData = [],
                retData = res.ret_data;
            for (let key in retData) {
                let obj = {
                    key: key,
                    errorNum: retData[key] ? (retData[key].ErrorNum ? retData[key].ErrorNum : 0) : 0,
                    errorUser: retData[key] ? (retData[key].ErrorUser ? retData[key].ErrorUser : 0) : 0
                };
                tableData.push(obj);
            }

            this.setState({
                spanning: false,
                data: tableData
            });
        } else {
            this.setState({
                spanning: false,
                offlineError: true
            });
        }
    };

    handleSwitch = name => {
        let { params } = this.state;
        params.ty = name;
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

    handleChangeDate = (name, value) => {
        let { params } = this.state;
        params[name] = value ? value : moment().format("YYYY-MM-DD");
        this.setState(
            {
                params
            },
            () => {
                this.httpGetError();
            }
        );
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
                title: "App版本",
                align: "left",
                dataIndex: "key",
                key: "key"
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
                        selectedKeys="sb6"
                        openKeys="mn4"
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
                                            className={this.state.params.ty === "1" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("1")}
                                        >
                                            App版本
                                        </div>
                                        <div
                                            className={this.state.params.ty === "2" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("2")}
                                        >
                                            操作系统
                                        </div>
                                        <div
                                            className={this.state.params.ty === "3" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("3")}
                                        >
                                            设备型号
                                        </div>
                                    </div>
                                    <div className={styles.hdIput}>
                                        <DatePicker
                                            value={
                                                this.state.params.start_date ? moment(this.state.params.start_date) : ""
                                            }
                                            onChange={(moment, dateStr) => this.handleChangeDate("start_date", dateStr)}
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

export default StatOsInfo;
