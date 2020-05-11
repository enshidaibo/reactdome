import React, { Component } from 'react';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Button, Modal, Input, Radio, Form, Alert, Popconfirm, Tag } from 'antd';

import style from './style.scss';
class DictIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dictData: [],
            params: {
                pageNo: 1,
                pageSize: 10,
            },
            form: {
                id: '',
                name: '',
                value: '',
                isGlobal: '',
                type: '',
                enable: '',
                sortNum: '',
            },
            delDictArr: [],
            total: 0,
            modal: false,
            modalType: true,
            modalFetch: false,
            modalTips: false,
            loading: false
        }
    }

    componentWillMount = () => {
        this.httpGetDict();
    }

    //字典分页数据
    httpGetDict = async () => {
        this.setState({
            loading: true
        });
        let { params } = this.state;
        let res = await app.yssjfetch.post("admin/dictionary/list", params);
        if (res.success) {
            this.setState({
                dictData: res.body,
                total: res.totalCount
            });
        }
        this.setState({
            loading: false
        });
    }

    //新增字典项
    handleAddModalShow = () => {
        let { form } = this.state;
        form.id = "";
        form.name = "";
        form.value = "";
        form.type = "";
        form.sortNum = '';
        form.isGlobal = false;
        form.enable = false;
        this.setState({
            modal: true,
            modalType: true,
            modalFetch: false,
            modalTips: false,
            form
        });
    }

    //保存字典项
    handleDictSave = async () => {
        let { modalType, form } = this.state;

        if (modalType === true) {
            //新增操作
            this.setState({
                modalFetch: true,
                modalTips: false
            });
            if (!form.name || !form.value || !form.type) {
                this.setState({
                    modalTips: "name, value, type 不能为空, 请填写完整",
                    modalFetch: false
                });
                return;
            }
            let res = await this.httpAddDict(form);
            if (res.success) {
                this.setState({
                    modalFetch: false,
                    modal: false,
                    modalTips: false
                }, () => this.httpGetDict());
            } else {
                this.setState({
                    modalFetch: false,
                    modalTips: res.message
                });
            }
        } else {
            //更新操作
            this.setState({
                modalFetch: true,
                modalTips: false
            });
            if (!form.name || !form.value || !form.type || !form.id) {
                this.setState({
                    modalTips: "id,name, value, type 不能为空, 请填写完整",
                    modalFetch: false
                });
                return;
            }
            let res = await this.httpUpdateDict(form);
            if (res.success) {
                this.setState({
                    modalFetch: false,
                    modal: false,
                    modalTips: false
                }, () => this.httpGetDict());
            } else {
                this.setState({
                    modalFetch: false,
                    modalTips: res.message
                });
            }
        }
    }

    //更新操作
    httpUpdateDict = async (form) => {
        let data = {
            id: form.id,
            isGlobal: form.isGlobal,
            name: form.name,
            value: form.value,
            type: form.type,
            sortNum: form.sortNum,
            enable: form.enable
        }
        let res = await app.yssjfetch.post("admin/dictionary/update", data);
        return res;
    }

    //新增操作
    httpAddDict = async (form) => {
        let data = {
            isGlobal: form.isGlobal,
            name: form.name,
            value: form.value,
            type: form.type,
            sortNum: form.sortNum,
            enable: form.enable
        }
        let res = await app.yssjfetch.post("admin/dictionary/save", data);
        return res;
    }

    //删除字典项
    handleDel = async (id) => {
        let form = {
            ids: id
        }
        let res = await app.yssjfetch.post("admin/dictionary/delete", form);
        if (res.success) {
            this.httpGetDict();
        }
    }

    //批量删除
    handleBatchDel = async () => {
        let form = {
            ids: this.state.delDictArr.join(",")
        }
        let res = await app.yssjfetch.post("admin/dictionary/delete", form);
        if (res.success) {
            this.httpGetDict();
        }
    }

    //对话框关闭
    handleModalCancel = () => {
        this.setState({
            modal: false,
            modalFetch: false,
            modalTips: false
        });
    }

    //对话框显示
    handleUpdateModalShow = (record) => {
        let { form } = this.state;
        if (!record) {
            return;
        }
        if (!record.id) {
            return;
        }
        form.id = record.id;
        form.name = record.name;
        form.value = record.value;
        form.isGlobal = record.isGlobal;
        form.type = record.type;
        form.sortNum = record.sortNum;
        form.enable = record.enable;

        this.setState({
            modal: true,
            modalType: false,
            modalTips: false,
            modalFetch: false,
            form
        });
    }

    //input输入项onchange
    handleOnChangeText = (name, e) => {
        let { form } = this.state;
        form[name] = e.target.value;
        this.setState({
            form
        });
    }

    //radio选项组onchange
    handleOnchangeRadio = (name, e) => {
        let { form } = this.state;
        form[name] = e.target.value;
        this.setState({
            form
        });
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: "字典名称",
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    return <span>{text}</span>
                }
            },
            {
                title: '是否全局',
                dataIndex: 'isGlobal',
                key: 'isGlobal',
                render: (text) => {
                    if (text === true) {
                        return <Tag color="#87d068">启用</Tag >
                    } else {
                        return <Tag color="red">禁用</Tag>
                    }
                }
            },
            {
                title: '是否启用',
                dataIndex: 'enable',
                key: 'enable',
                render: (text) => {
                    if (text === true) {
                        return <Tag color="#87d068">启用</Tag >
                    } else {
                        return <Tag color="red">禁用</Tag>
                    }
                }
            },
            {
                title: '排序',
                dataIndex: 'sortNum',
                key: 'sortNum'
            },
            {
                title: '字典类别',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '字典值',
                dataIndex: 'value',
                key: 'value'
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'options',
                render: (text, record) => {
                    return (
                        <div>
                            <span
                                className={`iconfont icon-bianji ${style.bianji}`} title="编辑"
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
        ]
        const rowSelection = {
            selectedRowKeys: this.state.delDictArr,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    delDictArr: selectedRowKeys !== undefined ? selectedRowKeys : []
                })
            },
            getCheckboxProps: record => ({
                name: record.name,
            })
        }

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const buttonItemLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 24 },
                sm: { span: 12, offset: 5 },
            }
        }

        let { params, form, delDictArr } = this.state;

        return (
            <div className={style.page}>
                <BreadcrumbCmp />
                <div className={style.container}>
                    <div className={style.tool}>
                        <Button type="primary" style={{ marginRight: '20px' }}
                            onClick={this.handleAddModalShow}
                        >
                            新增
                        </Button>
                        {
                            delDictArr.length <= 0 ?
                                <Button disabled>删除</Button> :
                                (
                                    <Popconfirm
                                        placement="topRight"
                                        title={"你确定要删除吗?"}
                                        onConfirm={() => this.handleBatchDel()}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button>删除</Button>
                                    </Popconfirm>
                                )
                        }
                    </div>
                    <Table
                        rowKey={record => record.id}
                        dataSource={this.state.dictData}
                        rowSelection={rowSelection}
                        columns={columns}
                        loading={this.state.loading}
                        pagination={{
                            total: this.state.total,
                            current: params.pageNo,
                            pageSize: params.pageSize,
                            onChange: (page, pageSize) => {
                                params.pageNo = page;
                                params.pageSize = pageSize;
                                this.setState({
                                    params,
                                    dictData: []
                                }, () => { this.httpGetDict() })
                            }
                        }}
                    />
                </div>
                <Modal
                    title={this.state.modalType ? '新增字典' : '修改字典'}
                    visible={this.state.modal}
                    closable={false}
                    maskClosable={false}
                    maskClosable={false}
                    onOk={this.handleModalShow}
                    onCancel={this.handleModalCancel}
                    footer={null}
                >
                    {
                        this.state.modalType === false &&
                        <Form.Item {...formItemLayout} label="ID" >
                            <Input disabled={true} value={form.id}
                                onChange={(e) => this.handleOnChangeText("id", e)} placeholder="ID" />
                        </Form.Item>
                    }
                    <Form.Item {...formItemLayout} label="name" >
                        <Input value={form.name}
                            onChange={(e) => this.handleOnChangeText("name", e)} placeholder="请输入名称..." />
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="value" >
                        <Input value={form.value}
                            onChange={(e) => this.handleOnChangeText("value", e)} placeholder="请输入值..." />
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="type" >
                        <Input value={form.type}
                            onChange={(e) => this.handleOnChangeText("type", e)} placeholder="请输入类型..." />
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="sortNum" >
                        <Input value={form.sortNum} type="number"
                            onChange={(e) => this.handleOnChangeText("sortNum", e)} placeholder="请输入排序..." />
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="enable" >
                        <Radio.Group defaultValue="a" value={form.enable}
                            onChange={(e) => this.handleOnchangeRadio("enable", e)}
                            buttonStyle="solid">
                            <Radio.Button value={true}>是</Radio.Button>
                            <Radio.Button value={false}>否</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="isGlobal" >
                        <Radio.Group defaultValue="a" value={form.isGlobal}
                            onChange={(e) => this.handleOnchangeRadio("isGlobal", e)}
                            buttonStyle="solid">
                            <Radio.Button value={true}>是</Radio.Button>
                            <Radio.Button value={false}>否</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item {...buttonItemLayout} label="" >
                        <Button type="primary" style={{ marginRight: '20px' }}
                            onClick={this.handleDictSave}
                            loading={this.state.modalFetch}
                        >
                            保存
                        </Button>
                        <Button onClick={this.handleModalCancel}>取消</Button>
                    </Form.Item>
                    <div>
                        {
                            this.state.modalTips !== false &&
                            <Alert message={"Error : " + this.state.modalTips} type="error" showIcon />
                        }
                    </div>
                </Modal>
            </div>
        );
    }
}

export default DictIndex;