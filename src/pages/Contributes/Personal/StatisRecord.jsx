import React, { Component } from 'react';
import { Table, Button } from 'antd';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { contributeList } from '@/services/contribute';
const contextConsumers = app.globalRedux.localRudexConsumers
import StatListTool from './component/StatListTool';
import style from './styles.scss';
@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class StatisRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                pageNo: 1,
                pageSize: 10,
                title: '',
                startTime: '',
                endTime: '',
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                userId: this.props.match.params.userId,
                token: sessionStorage.token,
                // isLockBy: false
            },
            data: [],
            total: 0,
            loading: false,
        }
    }

    componentWillMount = () => {
        this.httpGetStatList();
    }

    httpGetStatList = async () => {
        if (this.state.loading) return;
        this.setState({ loading: true });
        let { params } = this.state;
        let res = await contributeList(params);
        if (res.success) {
            this.setState({
                data: res.body.list,
                total: res.body.totalCount,
                loading: false
            });
        } else {
            this.setState({ loading: false });
        }
    }

    handleSearch = (start, end, title) => {
        let { params } = this.state;
        params.startTime = start;
        params.endTime = end;
        params.title = title;
        this.setState({
            params
        }, () => this.httpGetStatList());
    }

    render() {
        let { pageNo, pageSize } = this.state.params;
        let { total, params } = this.state;
        const columns = [
            { title: '标题', dataIndex: 'title' },
            { title: '栏目', dataIndex: 'columnName' },
            { title: '投稿时间', dataIndex: 'publishTime' },
            {
                title: '投稿状态', dataIndex: 'status',
                render: (text, record) => {
                    let t = '';
                    switch (text) {
                        case "0":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#e89843' }}>待采用</span>; break;
                        case "1":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#00a2ed' }}>待发表</span>; break;
                        case "2":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#8ec792' }}>已发表</span>; break;
                        case "3":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#b80000' }}>已退稿</span>; break;
                        case "4":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#8ec792' }}>回收站</span>; break;
                        case "5":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#00a3c6' }}>单计稿</span>; break;
                        case "6":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#8ec792' }}>草稿</span>; break;
                        default:
                            t = ''; break;
                    }
                    return t;
                }
            },
            {
                title: '评分等级', dataIndex: 'score',
                render: (text, record) => {
                    let t = '';
                    switch (text) {
                        case "1":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#00a2ed' }}>A</span>; break;
                        case "2":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#8ec792' }}>B</span>; break;
                        case "3":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#b80000' }}>C</span>; break;
                        case "4":
                            t = <span style={{ whiteSpace: 'nowrap', color: '#8ec792' }}>D</span>; break;
                        default:
                            t = '--'; break;
                    }
                    return t;
                }
            }
        ]
        return (
            <div className={style.page}>
                <BreadcrumbCmp />
                <div className={style.pageBody}>
                    <div className={style.pageStatis}>
                        <div className={style.pageHd}>
                            <StatListTool onSearch={this.handleSearch} params={params} />
                        </div>
                        <div className={style.pageMain}>
                            <div className={style.pageScroll}>
                                <Table
                                    rowKey={record => record.id}
                                    columns={columns}
                                    loading={this.state.loading}
                                    dataSource={this.state.data}
                                    pagination={{
                                        current: pageNo,
                                        pageSize: pageSize,
                                        total: total,
                                        onChange: (page, pageSize) => {
                                            let { params } = this.state;
                                            params.pageNo = page;
                                            this.setState({
                                                params
                                            }, () => this.httpGetStatList())
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatisRecord;