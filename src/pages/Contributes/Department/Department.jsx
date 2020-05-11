import React, { Component } from 'react';
import { Button, Input, DatePicker, Table, Modal, Popconfirm, Form, notification } from 'antd';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";

import moment from 'moment';
import 'moment/locale/zh-cn';
import style from './styles.scss';
import { getDepartmentList, departCreateOrUpdate, departDelById } from '@/services/contribute';
const { RangePicker } = DatePicker;
moment.locale('zh-cn');
const contextConsumers = app.globalRedux.localRudexConsumers

@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisiable: false,
            form: {
                name: '',
                id: '',
                siteId: this.props.userInfo.siteId,
            },
            params: {
                pageNo: 1,
                pageSize: 10,
                total: 0,
                name: "",
                startTime: '',
                endTime: '',
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
            },
            total: 0,
            data: [],
            delBatchArr: [],
            loading: false,
            saveLoading: false
        }
    }

    componentDidMount = () => {
        this.getDepartment();
    }

    getDepartment = async () => {
        this.setState({
            loading: true
        });
        let { params } = this.state;
        let res = await getDepartmentList(params);
        if (res.success) {
            this.setState({
                total: res.body.totalCount,
                data: res.body.list,
                loading: false
            });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    //显示修改单位modal
    handleUpdateModalShow = (obj) => {
        if (!obj) {
            return;
        }
        if (!obj.id || !obj.name) {
            return;
        }
        let { form } = this.state;
        form.id = obj.id;
        form.name = obj.name;
        this.setState({
            form,
            modalVisiable: true
        });
    }

    handleCreateModalShow = () => {
        let { form } = this.state;
        form.id = '';
        form.name = '';
        this.setState({
            form,
            modalVisiable: true
        });
    }

    //保存新增单位
    handlDepartSave = async () => {
        this.setState({
            saveLoading: true
        });
        let { form, params } = this.state;
        form = {
            ...form,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            realName: this.props.userInfo.realname
        }
        let res = await departCreateOrUpdate(form);
        if (res.success) {
            params.pageNo = 1;
            params.pageSize = 10;
            params.startTime = '';
            params.endTime = '';
            params.name = '';
            this.setState({
                total: 0,
                data: [],
                params,
                saveLoading: false
            }, () => this.getDepartment());
        } else {
            this.setState({
                saveLoading: false
            });
        }
        this.setState({
            modalVisiable: false
        });
    }

    //隐藏新增单位modal
    handleModalCancel = () => {
        this.setState({
            modalVisiable: false
        });
    }

    //搜索
    handleSearch = () => {
        let { params } = this.state;
        params.pageNo = 1;
        params.pageSize = 10;

        this.setState({
            params,
            total: 0,
            data: []
        }, () => this.getDepartment());
    }

    handleOnChangeText = (e) => {
        let { form } = this.state;
        if (e.target.value.length < 20) {
            form.name = e.target.value;
        } else {
            form.name = e.target.value.substring(0, 20);
        }
        this.setState({
            form
        });
    }

    handleSearchOnChange = (e) => {
        let { params } = this.state;
        params.name = e.target.value;
        this.setState({
            params
        });
    }

    handleOnChangeDate = (moments, dateStrs) => {
        let { params } = this.state;
        params.startTime = dateStrs[0];
        params.endTime = dateStrs[1];
        this.setState({
            params
        });
    }

    //删除单位
    handleDel = async (id) => {
        let form = {
            ids: id,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token
        }
        let res = await departDelById(form);
        if (res.success) {
            let { params } = this.state;
            params.pageSize = 10;
            params.pageNo = 1;
            params.startTime = '';
            params.endTime = '';
            params.name = '';
            this.setState({
                params,
                total: 0,
                data: [],
                delBatchArr: []
            }, () => this.getDepartment());
        }
    }

    handleDelBatch = async () => {
        let str = this.state.delBatchArr.join(",");
        let form = {
            ids: str,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token
        }
        let res = await departDelById(form);
        if (res.success) {
            let { params } = this.state;
            params.pageNo = 1;
            params.pageSize = 10;
            params.startTime = '';
            params.endTime = '';
            params.name = '';
            this.setState({
                params,
                total: 0,
                data: [],
                delBatchArr: []
            }, () => this.getDepartment());
        }
    }

    errorMsg = (msg = '出错了') => {
        notification.error({
            message: '错误提示',
            description: msg ? msg : ''
        });
    }

    render() {
        const columns = [
            {
                title: '单位名称',
                dataIndex: 'name'
            },
            {
                title: '操作栏',
                align: 'right',
                dataIndex: 'age',
                render: (text, record) => {
                    return (
                        <div>
                            <span
                                className={`iconfont icon-bianji ${style.bianji}`}
                                title="编辑"
                                onClick={() => this.handleUpdateModalShow(record)}
                            />
                            <Popconfirm
                                placement="topRight"
                                title={"你确定要删除吗?"}
                                onConfirm={() => this.handleDel(record.id)}
                                okText="确定"
                                cancelText="取消"
                            >
                                <span className={`iconfont icon-x ${style.delete}`} title="删除" />
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];

        const rowSelection = {
            selectedRowKeys: this.state.delBatchArr,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    delBatchArr: selectedRowKeys !== undefined ? selectedRowKeys : []
                })
            },
            getCheckboxProps: record => ({
                name: record.name,
            })
        }

        let { pageNo, pageSize, startTime, endTime, name } = this.state.params;
        let { total } = this.state;
        return (
            <div className={style.fullWrap}>
                <BreadcrumbCmp />
                <div className={style.fullBody}>
                    <div className={style.fullBdNav}>
                        <Button
                            style={{ marginRight: '10px', marginBottom: '10px' }}
                            onClick={() => this.handleCreateModalShow()}
                        >
                            添加单位
                        </Button>
                        {
                            this.state.delBatchArr.length > 0 ?
                                (
                                    <Popconfirm
                                        disabled={true}
                                        placement="right"
                                        title={"你确定要批量删除已经选中的吗?"}
                                        onConfirm={this.handleDelBatch}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button style={{ marginRight: '10px', marginBottom: '10px' }}>删除</Button>
                                    </Popconfirm>
                                )
                                :
                                <Button disabled={true} style={{ marginRight: '10px', marginBottom: '10px' }}>删除</Button>
                        }
                        <div className={style.navInline}>
                            <label>单位名称:</label>
                            <Input
                                onChange={this.handleSearchOnChange}
                                value={name}
                                placeholder="单位名称"
                            />
                        </div>
                        <div className={style.navInline}>
                            <label>创建时间:</label>
                            <RangePicker
                                value={[
                                    startTime ? moment(startTime, 'YYYY-MM-DD') : null,
                                    endTime ? moment(endTime, 'YYYY-MM-DD') : null
                                ]}
                                onChange={this.handleOnChangeDate}
                                format='YYYY-MM-DD'
                                placeholder={['开始时间', '结束时间']}

                            />
                        </div>
                        <Button style={{ marginBottom: '10px' }} onClick={this.handleSearch} type="primary">搜索</Button>
                    </div>
                    <Table
                        rowKey={record => record.id}
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.data}
                        loading={this.state.loading}
                        pagination={{
                            current: pageNo,
                            pageSize: pageSize,
                            total: total,
                            onChange: (page, pageSize) => {
                                let { params } = this.state
                                params.pageNo = page
                                this.setState({
                                    params
                                }, () => this.getDepartment())
                            }
                        }}
                    />
                </div>
                <Modal
                    visible={this.state.modalVisiable}
                    title={<div style={{ textAlign: 'center' }}>创建单位</div>}
                    onOk={this.handlDepartSave}
                    onCancel={this.handleModalCancel}
                    centered
                    bodyStyle={{ background: '#f0f2f5', borderRadius: '0 0 4px 4px' }}
                    footer={null}
                >
                    <div className={style.formItem}>
                        <label>单位名称</label>
                        <input onChange={(e) => this.handleOnChangeText(e)} value={this.state.form.name} placeholder="请输入单位名称,保持在10字以内" />
                    </div>
                    <div className={style.btnGroup}>
                        <Button type="primary" loading={this.state.saveLoading} onClick={this.handlDepartSave}>保存</Button>
                        <Button onClick={this.handleModalCancel}>取消</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Department;