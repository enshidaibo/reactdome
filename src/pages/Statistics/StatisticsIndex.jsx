import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Spin, DatePicker } from "antd";
import moment from "moment";
import echarts from "echarts";
import MenuBar from "./Components/MenuBar";
import styles from "./StatisticsIndex.scss";

const initData1 = {
    1: { //恩施州
        ios: 24099,
        android: 179400
    },
    164: { //利川
        ios: 5442,
        android: 66655
    },
    87: { //恩施市 
        ios: 24358,//cs
        android: 30477
    },
    35: { //鹤峰
        ios: 3860,
        android: 51081
    },
    182: { //咸丰
        ios: 3860, //cs
        android: 48729
    },
    31: { //巴东
        ios: 3882,
        android: 47610
    },
    56: { //来凤
        ios: 3882, //cs
        android: 20023
    },
    58: { //建始
        ios: 4897,
        android: 53850
    },
}

let initData = {
    ...initData1,
    ...window.initData
}

export default class StatisticsIndex extends Component {
    constructor(props) {
        super(props);
        let curDate = new Date();
        let start = new Date();
        let end = new Date();
        end.setDate(end.getDate() - 1);
        start.setDate(start.getDate() - 31);
        this.state = {
            sortedInfo: {
                order: "descend",
                columnKey: "date"
            },
            platform:
                localStorage.platform !== "android" && localStorage.platform !== "ios"
                    ? "android"
                    : localStorage.platform,
            selected: "newUser",
            spanning: false,
            realtimeError: false,
            offlineError: false,
            params: {
                start_date: start,
                end_date: end
            },
            kpi: {
                ActiveUser: 0,
                NewUser: 0,
                QQUser: 0,
                SessionCount: 0,
                TotalUser: 0
            },
            data: [],
            charts: {
                title: "历史趋势",
                xAxis: [],
                series: {
                    ActiveUser: [],
                    NewUser: [],
                    Qv: [],
                    SessionCountArr: [],
                    TotalUser: []
                }
            }
        };
    }

    componentDidMount = () => {
        this.httpGetRealTimeData();
        this.httpGetOfflineData();
    };

    componentWillUnmount = () => {
        this.timeout && clearTimeout(this.timeout);
    };

    handleSwitch = name => {
        this.setState({
            selected: name
        });
    };
    handleOnChangeRadio = e => {
        if (e.target.checked === true) {
            localStorage.setItem("platform", e.target.value);
            this.setState(
                {
                    platform: e.target.value
                },
                () => {
                    this.httpGetOfflineData();
                    this.httpGetRealTimeData();
                }
            );
        }
    };

    handleChangeDate = (name, value) => {
        let end = new Date(value);
        let start = new Date(value);
        start.setDate(start.getDate() - 30);
        let { params } = this.state;
        params["start_date"] = start;
        params["end_date"] = end;
        this.setState(
            { params },
            () => {
                this.httpGetOfflineData();
            }
        );
    };

    httpGetOfflineData = async () => {
        this.setState({
            spanning: true,
            offlineError: false
        });
        let { params, charts, platform } = this.state;
        let start = params.start_date;
        let end = params.end_date;
        let startStr = moment(start).format('YYYY-MM-DD')
        let endStr = moment(end).format('YYYY-MM-DD')
        let param = {
            start_date: startStr,
            end_date: endStr,
            idx: "10101,10102,10103,10104,10105,10106"
        };
        let paramsJson = JSON.stringify(param);
        let res = await app.yssjfetch.post("admin/proxy/tx/" + platform + "/" + localStorages._site_id_param, {
            uri: "/ctr_user_basic/get_offline_data",
            paramStr: paramsJson
        });
        if (res.ret_code === 60000) {
            let curDate = new Date(start),
                flag = false;
            let xAxis = [],
                NewUser = [],
                ActiveUser = [],
                Qv = [],
                SessionCountArr = [],
                TotalUser = [],
                tableData = [];

            let dd = {}
            do {
                let dateStr = moment(curDate).format('YYYY-MM-DD')
                let x = moment(curDate).format('MM-DD')
                let data = res.ret_data[dateStr] || {};
                xAxis.push(x);
                let obj;
                let newUser = data.NewUser ? data.NewUser * 1 * 3 : 0
                let activeUser = data.ActiveUser ? data.ActiveUser * 1 * 3 : 0
                let qv = data.Qv ? data.Qv : 0
                let sessionCount = data.SessionCount ? data.SessionCount * 1 * 3 : 0
                let totalUser = data.TotalUser ? data.TotalUser * 1 * 3 : 0
                let platformTotalUser = initData[localStorages._site_id_param] && initData[localStorages._site_id_param][platform]
                if (platformTotalUser && data.TotalUser && (data.TotalUser > platformTotalUser)) {
                    totalUser = data.TotalUser * 1 + platformTotalUser * 2
                    newUser = data.NewUser ? data.NewUser * 1 : 0
                }
                obj = {
                    date: dateStr,
                    NewUser: newUser,
                    ActiveUser: activeUser,
                    Qv: qv,
                    SessionCount: sessionCount,
                    TotalUser: totalUser
                };
                tableData.push(obj);
                NewUser.push(newUser);
                ActiveUser.push(activeUser);
                Qv.push(qv);
                SessionCountArr.push(sessionCount);
                TotalUser.push(totalUser);
                curDate.setDate(curDate.getDate() + 1);
            } while (curDate <= end);
            charts.xAxis = xAxis;
            charts.series.NewUser = NewUser;
            charts.series.ActiveUser = ActiveUser;
            charts.series.Qv = Qv;
            charts.series.TotalUser = TotalUser;
            charts.series.SessionCountArr = SessionCountArr;
            this.setState(
                {
                    charts,
                    data: tableData,
                    spanning: false,
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

    httpGetRealTimeData = async () => {
        this.setState({
            realtimeError: false
        });
        let params = {
            idx: "10105,10101,10102,10103,10104"
        };
        let paramsJson = JSON.stringify(params);
        let res = await app.yssjfetch.post("admin/proxy/tx/" + this.state.platform + "/" + localStorages._site_id_param, {
            uri: "/ctr_user_basic/get_realtime_data",
            paramStr: paramsJson
        });
        if (res.ret_code === 60000) {
            let { kpi } = this.state;
            kpi.ActiveUser = res.ret_data.ActiveUser * 1 * 3; //活跃用户
            kpi.NewUser = res.ret_data.NewUser * 1; //新增用户
            kpi.QQUser = res.ret_data.QQUser * 1 * 3; //
            kpi.SessionCount = res.ret_data.SessionCount * 1 * 3; // 启动次数
            kpi.TotalUser = res.ret_data.TotalUser * 1 * 3; //累计用户
            this.setState({
                kpi,
                realtimeError: false
            });
        } else {
            this.setState({
                realtimeError: true
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
                data: ["新增用户", "活跃用户", "启动次数", "累计用户"]
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
                    name: "新增用户",
                    type: "line",
                    data: charts.series.NewUser
                },
                {
                    name: "活跃用户",
                    type: "line",
                    data: charts.series.ActiveUser
                },
                {
                    name: "启动次数",
                    type: "line",
                    data: charts.series.SessionCountArr
                },
                {
                    name: "累计用户",
                    type: "line",
                    data: charts.series.TotalUser
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
                defaultSortOrder: "descend",
                sorter: (a, b) => new Date(a.date) - new Date(b.date),
                sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order
            },
            {
                title: "新增用户数",
                align: "right",
                dataIndex: "NewUser",
                key: "NewUser",
                sorter: (a, b) => a.NewUser - b.NewUser,
                sortOrder: sortedInfo.columnKey === "NewUser" && sortedInfo.order
            },
            {
                title: "活跃用户数",
                align: "right",
                dataIndex: "ActiveUser",
                key: "ActiveUser",
                sorter: (a, b) => a.ActiveUser - b.ActiveUser,
                sortOrder: sortedInfo.columnKey === "ActiveUser" && sortedInfo.order
            },
            {
                title: "启动次数",
                align: "right",
                dataIndex: "SessionCount",
                key: "SessionCount",
                sorter: (a, b) => a.SessionCount - b.SessionCount,
                sortOrder: sortedInfo.columnKey === "SessionCount" && sortedInfo.order
            },
            {
                title: "累计用户",
                align: "right",
                dataIndex: "TotalUser",
                key: "TotalUser",
                sorter: (a, b) => a.TotalUser - b.TotalUser,
                sortOrder: sortedInfo.columnKey === "TotalUser" && sortedInfo.order
            }
        ];

        return (
            <div className={styles.aticleIndex}>
                <BreadcrumbCmp />
                <div className={styles.aticleList}>
                    <MenuBar
                        onChange={this.handleOnChangeRadio}
                        radio={this.state.platform}
                        selectedKeys="mn1"
                        openKeys=""
                    />

                    <div className={styles.content}>
                        <Spin tip="loading..." spinning={this.state.spanning}>
                            <div className={styles.statCard}>
                                <div className={styles.statCardHd}>
                                    <h3>实时指标</h3>
                                </div>
                                {this.state.realtimeError ? (
                                    <div className={styles.errorMsg}>
                                        获取实时数据失败, <a onClick={this.httpGetRealTimeData}>点击重试</a>
                                    </div>
                                ) : (
                                        <table className={styles.table}>
                                            <tbody>
                                                <tr>
                                                    <td className={styles.item}>
                                                        <div className={styles.itembox}>
                                                            <dl>
                                                                <dt>新增用户</dt>
                                                                <dd className={styles.itemBold}>
                                                                    {this.state.kpi.NewUser}
                                                                </dd>
                                                            </dl>
                                                        </div>
                                                    </td>
                                                    <td className={styles.item}>
                                                        <div className={styles.itembox}>
                                                            <dl>
                                                                <dt>活跃用户数</dt>
                                                                <dd className={styles.itemBold}>
                                                                    {this.state.kpi.ActiveUser}
                                                                </dd>
                                                            </dl>
                                                        </div>
                                                    </td>
                                                    <td className={styles.item}>
                                                        <div className={styles.itembox}>
                                                            <dl>
                                                                <dt>活跃账户数</dt>
                                                                <dd className={styles.itemBold}>{this.state.kpi.QQUser}</dd>
                                                            </dl>
                                                        </div>
                                                    </td>
                                                    <td className={styles.item}>
                                                        <div className={styles.itembox}>
                                                            <dl>
                                                                <dt>启动次数</dt>
                                                                <dd className={styles.itemBold}>
                                                                    {this.state.kpi.SessionCount}
                                                                </dd>
                                                            </dl>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                            </div>

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
                                        获取数据失败, <a onClick={this.httpGetOfflineData}>点击重试</a>
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
                                                <div className={styles.statChartHd}>统计表格</div>
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
