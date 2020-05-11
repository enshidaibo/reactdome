import React, { Component, useEffect } from 'react';
import { Button, Input, DatePicker, Table, Modal, Popconfirm, Form, notification, message  } from 'antd';
import useData from '@/hooks/useData'
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import moment from 'moment';
import 'moment/locale/zh-cn';
import style from './styles.scss';
import { getDepartmentList, departCreateOrUpdate, departDelById, getDepartmentDelete, getDepartmentSave } from '@/services/contribute';
const { RangePicker } = DatePicker;
moment.locale('zh-cn');
const contextConsumers = app.globalRedux.localRudexConsumers
@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))

class Department extends Component {
    constructor(props) {
        super(props);
        console.log(props.userInfo);
        this.state = {
            modalVisiable: false,
            form: {
                name: '',
                id: '',
                siteId: this.props.userInfo.siteId,
            },
            obj:{
                orgId:'',
            userName:'',
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
    handleUpdateModalShow = async (objects) => {
        if (!objects) {
            return;
        }
        if (!objects.id) {
            return;
        }
        let { obj } = this.state;
        obj.orgId = objects.id;
        obj.userName =this.props.userInfo.username;
       let res = await getDepartmentSave(obj)
       if(res.success){
           message.success('操作成功！')
           this.getDepartment();
       }
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

    //移除常用单位
    handleDel = async (id,name) => {
        let form = {
            orgId:id,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username
        }
        let res = await getDepartmentDelete(form);
        if (res.success) {
            message.success('操作成功！')
            this.getDepartment()
            // let { params } = this.state;
            // params.pageSize = 10;
            // params.pageNo = 1;
            // params.startTime = '';
            // params.endTime = '';
            // params.name = '';
            // this.setState({
            //     params,
            //     total: 0,
            //     data: [],
            //     delBatchArr: []
            // }, () => this.getDepartment());
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
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '操作栏',
                align: 'center',
                dataIndex: 'age',
                render: (text, record) => {
                    return (
                        <div>
                            {record.isCommon==0 ?<Button type='primary'   onClick={() => this.handleUpdateModalShow(record)}>设为常用单位</Button>
                            : <Popconfirm
                                placement="topRight"
                                title={"你确定移除常用单位吗?"}
                                onConfirm={() => this.handleDel(record.id,record.name)}
                                okText="确定"
                                cancelText="取消"
                            >
                            <Button type='primary' >移除常用单位</Button>
                            </Popconfirm>}
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
                <BreadcrumbCmp  />
                <div className={style.fullBody}>
                    <div className={style.fullBdNav}>
                     
                        <div className={style.navInline}>
                            <label>单位名称:</label>
                            <Input
                                onChange={this.handleSearchOnChange}
                                value={name}
                                placeholder="单位名称"
                            />
                        </div>
                        {/*<div className={style.navInline}>
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
                            </div>*/}
                        <Button style={{ marginBottom: '10px' }} onClick={this.handleSearch} type="primary">搜索</Button>
                    </div>
                    <Table
                        rowKey={record => record.id}
                        rowSelection={null}
                        columns={columns}
                        dataSource={this.state.data}
                        loading={this.state.loading}
                        bordered={true}
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
              
            </div>
        );
    }
}

export default Department;