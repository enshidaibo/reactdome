import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Spin, DatePicker } from "antd";
import moment from "moment";
import echarts from "echarts";

import MenuBar from "./Components/MenuBar";

import styles from "./StatisticsIndex.scss";

class StatTerminal extends Component {
    constructor(props) {
        super(props);
        let curDate = new Date();
        curDate.setDate(curDate.getDate() - 1);
        let curDateStr =
            curDate.getFullYear() +
            "-" +
            (curDate.getMonth() + 1 < 10 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1) +
            "-" +
            (curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate());
        this.state = {
            sortedInfo: {},
            offlineError: false,
            platform:
                localStorage.platform !== "android" && localStorage.platform !== "ios"
                    ? "android"
                    : localStorage.platform,
            selected: "os",
            data: [],
            params: {
                start_date: curDateStr,
                end_date: curDateStr,
                ty: "1"
            }
        };
    }

    componentDidMount = () => {
        this.httpGetTerminal();
    };

    httpGetTerminal = async () => {
        this.setState({
            spanning: true,
            offlineError: false
        });
        let { params } = this.state;
        let param = {
            ...params,
            idx: "10303,10302,10301"
        };

        let paramsJson = JSON.stringify(param);

        let res = await app.yssjfetch.post("admin/proxy/tx/" + this.state.platform + "/" + localStorages._site_id_param, {
            uri: "/ctr_terminal_anal/get_offline_data",
            paramStr: paramsJson
        });

        if (res.ret_code === 60000) {
            let dataes = res.ret_data
            // if (localStorages._site_id_param * 1 === 1) {
            for (let i = 0; i < dataes.length; i += 1) {
                dataes[i].ActiveUser = dataes[i].ActiveUser * 1 * 3
                dataes[i].SessionCount = dataes[i].SessionCount * 1 * 3
                dataes[i].NewUser = dataes[i].NewUser * 1 * 3
            }
            // }
            this.setState({
                spanning: false,
                offlineError: false,
                data: dataes
            });
        } else {
            this.setState({
                spanning: false,
                offlineError: true
            });
        }
    };

    handleChangeDate = (name, value) => {
        let { params } = this.state;
        params[name] = value;
        this.setState(
            {
                params
            },
            () => {
                this.httpGetTerminal();
            }
        );
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
                this.httpGetTerminal();
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
                    this.httpGetTerminal();
                }
            );
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
        let type = "";
        switch (this.state.params.ty) {
            case "1":
                type = "操作系统版本";
                break;
            case "2":
                type = "分辨率";
                break;
            case "3":
                type = "网络环境";
                break;
            case "4":
                type = "运营商";
                break;
            case "5":
                type = "设备型号";
                break;
        }
        const columns = [
            {
                title: "时间",
                align: "left",
                dataIndex: "",
                key: "date",
                render: text => {
                    return this.state.params.start_date;
                }
            },
            {
                title: "终端类型(" + type + ")",
                align: "right",
                dataIndex: "Terminal",
                key: "terminal"
            },
            {
                title: "新增用户",
                align: "right",
                dataIndex: "NewUser",
                key: "NewUser",
                sorter: (a, b) => a.NewUser - b.NewUser,
                sortOrder: sortedInfo.columnKey === "NewUser" && sortedInfo.order
            },
            {
                title: "活跃用户",
                align: "right",
                dataIndex: "ActiveUser",
                key: "ActiveUser",
                sorter: (a, b) => a.ActiveUser - b.ActiveUser,
                sortOrder: sortedInfo.columnKey === "ActiveUser" && sortedInfo.order
            },
            {
                title: "活跃账号",
                align: "right",
                dataIndex: "SessionCount",
                key: "SessionCount",
                sorter: (a, b) => a.SessionCount - b.SessionCount,
                sortOrder: sortedInfo.columnKey === "SessionCount" && sortedInfo.order
            }
        ];

        return (
            <div className={styles.aticleIndex}>
                <BreadcrumbCmp />
                <div className={styles.aticleList}>
                    <MenuBar
                        onChange={this.handleOnChangeRadio}
                        selectedKeys="mn2"
                        radio={this.state.platform}
                        openKeys=""
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
                                            操作系统版本
                                        </div>
                                        <div
                                            className={this.state.params.ty === "2" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("2")}
                                        >
                                            分辨率
                                        </div>
                                        <div
                                            className={this.state.params.ty === "3" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("3")}
                                        >
                                            网络环境
                                        </div>
                                        <div
                                            className={this.state.params.ty === "4" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("4")}
                                        >
                                            运营商
                                        </div>
                                        <div
                                            className={this.state.params.ty === "5" ? styles.hdactive : ""}
                                            onClick={() => this.handleSwitch("5")}
                                        >
                                            设备型号
                                        </div>
                                    </div>
                                    <div className={styles.hdIput}>
                                        <DatePicker
                                            value={
                                                this.state.params.start_date
                                                    ? moment(this.state.params.start_date, "YYYY-MM-DD")
                                                    : ""
                                            }
                                            onChange={(moment, dateStr) => this.handleChangeDate("start_date", dateStr)}
                                            format={"YYYY-MM-DD"}
                                            allowClear={false}
                                        />
                                    </div>
                                </div>
                                {this.state.offlineError ? (
                                    <div className={styles.errorMsg}>
                                        获取数据失败, <a onClick={this.httpGetTerminal}>点击重试</a>
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

export default StatTerminal;
