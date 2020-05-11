import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button, Table, notification, Popconfirm } from 'antd';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { contributeList, columnList, columnDel, columnAdd, columnEdit } from '@/services/contribute';
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
class EditingIndexs extends Component {
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
                isLockBy: true
            },
            data: [],
            total: 0,
            loading: false
        }
    }

    componentDidMount = () => {
        let { params } = this.state;
        params.columnId = this.props.match.params.id;
        this.setState({
            params
        });
        this.httpGetTg();
    }

    //投稿列表
    httpGetTg = async () => {
        this.setState({
            loading: true
        });
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
        params.pageNo = 1;
        this.setState({
            params
        }, () => this.httpGetTg());
    }

    //导航栏按钮点击事件
    handleNavBtnOnClick = status => {
        let { params } = this.state;
        params.status = params.status === status ? "" : status;
        params.pageNo = 1;
        this.setState({
            params
        }, () => this.httpGetTg());
    }

    handleMenuOnClick = (id) => {
        let { params } = this.state;
        params.columnId = id;
        params.pageNo = 1;
        this.setState({
            params
        }, () => this.httpGetTg());
    }

    handleErrorMsg = (msg = '') => {
        notification.error({
            message: '错误提示',
            description: msg ? msg : ''
        });
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
                    return <Link to={`/contribute/editing/entity/${record.id}`}>{text}</Link>;
                }
            },
            {
                title: '栏目',
                key: 'columnName',
                dataIndex: 'columnName',
                className: `${style.onLine}`
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                className: `${style.onLine}`,
                render: (text) => {
                    let t = '';
                    switch (text) {
                        case "0":
                            t = <span style={{ color: '#e89843' }}>待采用</span>; break;
                        case "1":
                            t = <span style={{ color: '#00a2ed' }}>待发表</span>; break;
                        case "2":
                            t = <span style={{ color: '#8ec792' }}>已发表</span>; break;
                        case "3":
                            t = <span style={{ color: '#b80000' }}>已退稿</span>; break;
                        case "4":
                            t = <span style={{ color: '#8ec792' }}>回收站</span>; break;
                        case "5":
                            t = <span style={{ color: '#00a3c6' }}>单计稿</span>; break;
                        case "6":
                            t = <span style={{ color: '#8ec792' }}>草稿</span>; break;
                        default:
                            t = ''; break;
                    }
                    return t;
                }
            },
            {
                title: '投稿人',
                key: 'updateBy',
                dataIndex: 'updateBy',
                className: `${style.onLine}`
            },
            {
                title: '投稿时间',
                key: 'publishTime',
                dataIndex: 'publishTime',
            }
        ];

        const rowSelection = {
            onChage: (selectedRowKeys, selectedRows) => {
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
                        history={this.props.history}
                        columnId={columnId}
                        onClick={this.handleMenuOnClick}
                    />

                    <div className={style.pageWrap}>

                        <ToolBar
                            status={status}
                            statusClick={this.handleNavBtnOnClick}
                            onSearch={this.handleSearch}
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

export default EditingIndexs;