import React, { Component } from 'react';

import PageWrap from '../component/PageWrap';
import PageContent from "../component/PageContent";
import { Table, Divider, Popconfirm, Button, Modal, Form, Input, notification } from 'antd';

import { getPxList, updatePx, savePx, delPx, getPx } from "@/services/advertise";

import pxStyle from './px.scss';
import "../base.css";

class PxIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            dataSourceTotal: 0,
            param: {
                pageNo: 1,
                pageSize: 10,
                name: ""
            },
            px: {
                id: "",
                name: "",
                width: "",
                high: ""
            },
            pxModal: false,
            pxType: true
        }
    }

    componentWillMount = () => {
        this.getPxList();
    }

    getPxList = async () => {
        let { param } = this.state;
        let res = await getPxList(param);
        if (res.success) {
            this.setState({
                dataSource: res.data.list,
                dataSourceTotal: res.data.count
            });
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    getPxById = async (id) => {
        let res = await getPx(id);
        if (res.success) {
            let { px } = this.state;
            px.id = res.data.id;
            px.name = res.data.name;
            px.width = res.data.width;
            px.high = res.data.high;
            this.setState({
                px,
                type: false
            });
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    delPxById = async (id) => {
        let res = await delPx({ id: id });
        if (res.success) {
            this.getPxList();
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    createPx = async () => {
        let { px } = this.state;
        if (px.name === undefined || px.name === "" || px.name === null) {
            notification.warning({
                message: '参数错误',
                description: '请输入名称',
            });
            return;
        } else if (px.name.length > 64) {
            notification.warning({
                message: '参数错误',
                description: '名称过长',
            });
            return;
        } else if (px.width === undefined || px.width === "" || px.width === null) {
            notification.warning({
                message: '参数错误',
                description: '请输入宽度',
            });
            return;
        } else if (px.width.length > 8) {
            notification.warning({
                message: '参数错误',
                description: '宽度为数字且长度小于8',
            });
            return;
        } else if (px.high === undefined || px.high === "" || px.high === "") {
            notification.warning({
                message: '参数错误',
                description: '请输入高度',
            });
            return;
        } else if (px.high.length > 8) {
            notification.warning({
                message: '参数错误',
                description: '高度为数字且长度小于8',
            });
            return;
        } else if ((parseInt(px.width) != px.width) || (parseInt(px.high) != px.high) || parseInt(px.width) <= 0 || parseInt(px.high) <= 0) {
            notification.warning({
                message: '输入错误',
                description: '分辨率高度或宽度必须为大于0的整数值, 请重新填写',
            });
            return;
        }
        let res = await savePx(px);
        if (res.success) {
            let { px } = this.state;
            px.name = "";
            px.id = "";
            px.width = "";
            px.high = "";
            this.setState({
                pxModal: false
            }, () => {
                this.getPxList();
            });
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    editPx = async () => {
        let { px } = this.state;
        if (px.id === undefined || px.id === null || px.id === "") {
            notification.warning({
                message: '参数错误',
                description: '当前未识别到要修改的分辨率, 请重新选择分辨率进行修改',
            });
            return;
        } else if (px.name === undefined || px.name === "" || px.name === null) {
            notification.warning({
                message: '参数错误',
                description: '请输入名称',
            });
            return;
        } else if (px.name.length > 64) {
            notification.warning({
                message: '参数错误',
                description: '名称过长',
            });
            return;
        } else if (px.width === undefined || px.width === "" || px.width === null) {
            notification.warning({
                message: '参数错误',
                description: '请输入宽度',
            });
            return;
        } else if (px.width.length > 8) {
            notification.warning({
                message: '参数错误',
                description: '宽度为数字且长度小于8',
            });
            return;
        } else if (px.high === undefined || px.high === "" || px.high === "") {
            notification.warning({
                message: '参数错误',
                description: '请输入高度',
            });
            return;
        } else if (px.high.length > 8) {
            notification.warning({
                message: '参数错误',
                description: '高度为数字且长度小于8',
            });
            return;
        } else if ((parseInt(px.width, 10) != px.width) || (parseInt(px.high, 10) != px.high)) {
            notification.warning({
                message: '输入错误',
                description: '分辨率高度或宽度必须为整数值, 请重新填写',
            });
            return;
        }
        let res = await updatePx(px);
        if (res.success) {
            this.setState({
                pxModal: false
            }, () => {
                this.getPxList()
            });
        } else {
            notification.error({
                message: '请求错误',
                description: res.msg,
            });
        }
    }

    createPxModalShow = () => {
        let { px } = this.state;
        px.id = "";
        this.setState({
            pxModal: true,
            px,
            pxType: true
        });
    }

    editPxModalShow = (id) => {
        this.getPxById(id);
        this.setState({
            pxModal: true,
            pxType: false
        });
    }

    pxModalClose = () => {
        let { px } = this.state;
        px.id = "";
        px.name = "";
        px.width = "";
        px.high = "";
        this.setState({
            pxModal: false,
            px
        });
    }

    handleOnChangeText = (name, v) => {
        let { px } = this.state;
        px[name] = v.target.value;
        this.setState({
            px
        });
    }

    handleSearch = (v) => {
        let { param } = this.state;
        param.name = v;
        param.pageNo = 1;
        this.setState({
            param
        }, () => {
            this.getPxList();
        })
    }

    searchOnChange = (e) => {
        let { param } = this.state;
        param.name = e.target.value;
        this.setState({
            param
        });
    }

    render() {

        const columns = [
            {
                title: "名称",
                dataIndex: "name",
                align: "left"
            },
            {
                title: "宽度",
                dataIndex: "width",
                align: "center"
            },
            {
                title: "高度",
                dataIndex: "high",
                align: "center"
            },
            {
                title: "操作",
                dataIndex: "",
                align: "right",
                render: (text, record) => {
                    return (
                        <div>
                            <a href="javascript:;" onClick={() => this.editPxModalShow(record.id)}>编辑</a>
                            <Divider type="vertical" />
                            <Popconfirm title="你确定要删除吗?" onConfirm={() => this.delPxById(record.id)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ];

        let { dataSource, pxModal, pxType, px, param, dataSourceTotal } = this.state;
        return (
            <PageContent>
                <PageWrap>
                    <div className={pxStyle.hd + " row"}>
                        <div></div>
                        <div className={"row"}>
                            <Input.Search
                                placeholder="搜索名称"
                                value={param.name}
                                onChange={this.searchOnChange}
                                onSearch={this.handleSearch}
                                enterButton
                                style={{ marginRight: '15px' }}
                            />
                            <Button onClick={this.createPxModalShow} type="primary">+新增分辨率</Button>
                        </div>
                    </div>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{
                                current: param.pageNo,
                                pageSize: param.pageSize,
                                total: dataSourceTotal,
                                onChange: (page, pageSize) => {
                                    param.pageNo = page;
                                    this.setState({
                                        param
                                    }, () => {
                                        this.getPxList();
                                    });
                                }
                            }}
                        />
                        <Modal
                            title={pxType ? "新增" : "修改"}
                            visible={pxModal}
                            footer={null}
                            onOk={this.modalShow}
                            onCancel={this.pxModalClose}
                            maskClosable={false}
                            maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.20)" }}
                        >
                            <div className="form-wrap">
                                <ModalItem label="名称">
                                    <Input placeholder="请输入名称"
                                        onChange={(v) => this.handleOnChangeText("name", v)}
                                        value={px.name}
                                    />
                                </ModalItem>
                                <ModalItem label="宽度">
                                    <Input placeholder="请输入宽度"
                                        onChange={(v) => this.handleOnChangeText("width", v)}
                                        value={px.width}
                                    />
                                </ModalItem>
                                <ModalItem label="高度">
                                    <Input placeholder="请输入高度"
                                        onChange={(v) => this.handleOnChangeText("high", v)}
                                        value={px.high}
                                    />
                                </ModalItem>
                                <ModalItem offset>
                                    <div className="row">
                                        <div className={pxStyle.ltBtnWrap}>
                                            {
                                                pxType
                                                    ?
                                                    <Button onClick={this.createPx} className={pxStyle.btn} type="primary">新增</Button>
                                                    :
                                                    <Button onClick={this.editPx} className={pxStyle.btn} type="primary">修改</Button>
                                            }
                                        </div>
                                        <div className={pxStyle.rtBtnWrap}>
                                            <Button onClick={this.pxModalClose} className={pxStyle.btn}>取消</Button>
                                        </div>
                                    </div>
                                </ModalItem>
                            </div>
                        </Modal>
                    </div>
                </PageWrap>
            </PageContent>
        );
    }
}

export default PxIndex;

class ModalItem extends Component {

    render() {
        let { offset } = this.props;
        const labelCol = {
            xs: { span: 4 },
            sm: { span: 5 },
        }
        const wrapperCol = offset ? {
            xs: { span: 16, offset: 4 },
            sm: { span: 16, offset: 5 },
        } : {
                xs: { span: 16 },
                sm: { span: 16 },
            };
        return (
            <Form.Item
                label={this.props.label}
                labelCol={labelCol}
                wrapperCol={wrapperCol}
            >
                {this.props.children}
            </Form.Item>
        );
    }
}