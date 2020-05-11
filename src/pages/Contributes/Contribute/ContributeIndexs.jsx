import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button, Table, notification, Popconfirm } from 'antd';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { contributeList, columnList, columnDel, columnAdd, columnEdit, contributeDel, contributeStatus } from '@/services/contribute';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import style from './styles.scss';
const contextConsumers = app.globalRedux.localRudexConsumers

import AsideBar from './component/AsideBar';
import ToolBar from './component/ToolBar';
@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class ContributeIndexs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                pageNo: 1,
                pageSize: 10,
                status: '',
                columnId: this.props.match.params.id,
                title: '',
                startTime: '',
                endTime: '',
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                isLockBy: false
            },
            data: [],
            total: 0,
            loading: false,
        }
    }

    componentWillMount = () => {
        this.httpGetTg();
    }

    //投稿列表
    httpGetTg = async () => {
        this.setState({
            loading: true
        })
        let { params } = this.state;
        let res = await contributeList(params);
        if (res.success) {
            this.setState({
                data: res.body.list,
                total: res.body.totalCount,
                loading: false
            });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    handleSearch = (startTime, endTime, title) => {
        let { params } = this.state;
        params.startTime = startTime;
        params.endTime = endTime;
        params.title = title;
        this.setState({
            params
        }, () => this.httpGetTg());
    }

    //导航栏按钮点击事件
    handleToolOnClick = status => {
        let { params } = this.state;
        params.status = params.status === status ? "" : status;
        params.pageNo = 1;
        this.setState({
            params
        }, () => this.httpGetTg());
    }

    handleOnSearch = (startTime, endTime, title) => {
        let { params } = this.state;
        params.startTime = startTime;
        params.endTime = endTime;
        params.title = title;
        params.pageNo = 1;
        this.setState({
            params
        }, () => this.httpGetTg());
    }

    handleMenuOnClick = id => {
        let { params } = this.state;
        params.columnId = id;
        params.pageNo = 1;
        this.setState({
            params
        }, () => this.httpGetTg());
    }

    handleDel = async (id, status) => {
        if (status === '4') {
            let form = {
                ids: id,
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                realName: this.props.userInfo.realname
            }
            let { params } = this.state;
            params.pageNo = 1;
            params.pageSize = 10;
            params.status = '';
            params.columnId = '';
            params.title = '';
            params.startTime = '';
            params.endTime = '';
            let res = await contributeDel(form);
            if (res.success) {
                this.setState({
                    params
                }, () => this.httpGetTg());
            }
        } else {
            let form = {
                id: id,
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                statusIndex: '4',
                realName: this.props.userInfo.realname
            }
            let res = await contributeStatus(form);
            let { params } = this.state;
            params.pageNo = 1;
            params.pageSize = 10;
            params.status = '';
            params.columnId = '';
            params.title = '';
            params.startTime = '';
            params.endTime = '';
            if (res.success) {
                this.setState({
                    params
                }, () => this.httpGetTg());
            }
        }
    }

    handleTgEdit = id => {
        this.props.history.push(`/contribute/index/edit/${id}`);
    }

    handleErrorMsg = (msg = '') => {
        notification.error({
            message: '错误提示',
            description: msg ? msg : ''
        });
    }

    handleReBack = async (id) => {
        let form = {
            id: id,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            statusIndex: '0',
            realName: this.props.userInfo.realname
        }
        let res = await contributeStatus(form);
        let { params } = this.state;
        params.pageNo = 1;
        params.pageSize = 10;
        params.status = '';
        params.columnId = '';
        params.title = '';
        params.startTime = '';
        params.endTime = '';
        if (res.success) {
            this.setState({
                params
            }, () => this.httpGetTg());
        }
    }

    render() {
        let { pageNo, pageSize, status, columnId } = this.state.params;
        let { total } = this.state;
        const columns = [
            {
                title: '标题',
                key: 'title',
                dataIndex: 'title',
                render: (text, record) => {
                    return <Link to={`/contribute/index/entity/${record.id}`}>{text}</Link>;
                }
            },
            {
                title: '栏目',
                key: 'columnName',
                dataIndex: 'columnName',
                className: `${style.onLine}`,
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render: (text) => {
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
                title: '投稿人',
                key: 'updateBy',
                className: `${style.onLine}`,
                dataIndex: 'updateBy',
            },
            {
                title: '投稿时间',
                key: 'publishTime',
                dataIndex: 'publishTime',
            },
            {
                title: '操作栏',
                align: 'right',
                dataIndex: 'age',
                render: (text, record) => {
                    return (
                        <div>
                            {
                                record.status == '4' &&
                                <span
                                    className={`iconfont icon-chehui ${style.bianji}`}
                                    title="还原"
                                    onClick={() => this.handleReBack(record.id)}
                                />
                            }
                            {
                                record.status !== '4' ?
                                    (
                                        record.status == '2'
                                            ?
                                            <span
                                                className={`iconfont icon-bianji ${style.bianji}`}
                                                title="编辑"
                                                style={{ cursor: 'not-allowed' }}
                                            />
                                            :
                                            <span
                                                className={`iconfont icon-bianji ${style.bianji}`}
                                                title="编辑"
                                                onClick={() => this.handleTgEdit(record.id)}
                                            />
                                    )
                                    : null
                            }
                            {
                                (record.status == "1" || record.status == "2" || record.status == "5")
                                    ?
                                    <span
                                        className={`iconfont icon-x ${style.delete}`} title="删除"
                                        style={{ cursor: 'not-allowed' }}
                                    />
                                    :
                                    <Popconfirm
                                        placement="topRight"
                                        title={record.status === "4" ? "你确定要删除吗?" : "你确定要放入回收站吗?"}
                                        onConfirm={() => this.handleDel(record.id, record.status)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <span className={`iconfont icon-x ${style.delete}`} title={record.status === "4" ? "删除" : "回收站"} />
                                    </Popconfirm>
                            }
                        </div>
                    )
                }
            }
        ];

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                name: record.name,
            })
        }

        return (
            <div className={style.page}>
                <BreadcrumbCmp />
                <div className={style.pageBody}>

                    <AsideBar
                        onMenuClick={this.handleMenuOnClick}
                        history={this.props.history}
                        columnId={columnId}
                    />

                    <div className={style.pageWrap}>

                        <ToolBar
                            status={status}
                            statusClick={this.handleToolOnClick}
                            onSearch={this.handleOnSearch}
                        />

                        <div className={style.pageMain}>
                            <div className={style.pageScroll}>
                                <div>
                                    <Table
                                        rowKey={record => record.id}
                                        rowSelection={rowSelection}
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
                                                }, () => this.httpGetTg())
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContributeIndexs;