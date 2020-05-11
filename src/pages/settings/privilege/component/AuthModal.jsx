import React, { Component } from 'react';

import { Modal, Button, Form, Input, Select, Alert } from 'antd';
const Option = Select.Option;

class AuthModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            form: {
                id: '',
                type: '',
                flag: '',
                name: '',
                uri: '',
                pid: ''
            },
            visible: false,
            isFetch: false,
            fetchErr: false,
            fetchErrMsg: ''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        let { data, type } = nextProps;
        let { form } = this.state;
        if(type === true){
            form.id = data.id;
            form.type = data.type;
            form.flag = data.flag;
            form.name = data.name;
            form.uri = data.uri;
            form.pid = data.pid;
            this.setState({
                form
            });
        }else{
            form.id = "";
            form.type = "";
            form.flag = "";
            form.name = "";
            form.uri = "";
            form.pid = "";
            this.setState({
                form
            });
        }
    }

    //select 选择事件
    handleSelectOnChange = (name, e) => {
        let { form } = this.state;
        form[name] = e+"";
        this.setState({
            form
        });
    }

    //input 输入事件
    handleOnChangeText = (name, e) => {
        let { form } = this.state;
        form[name] = e.target.value;
        this.setState({
            form
        });
    }

    //新增权限信息
    httpApiSave = async () => {
        if(this.state.isFetch){
            return;
        }
        this.setState({
            isFetch: true,
            fetchErr: false,
            fetchErrMsg: ""
        });
        let { form } = this.state;
        let data = {
            pid: this.props.parentId,
            type: form.type,
            flag: form.flag,
            name: form.name,
            uri: form.uri
        }
        let res = await app.yssjfetch.post("admin/permission/save", data);
        if(res.success){
            this.props.onOk && this.props.onOk();
        }else{
            this.setState({
                fetchErr: true,
                fetchErrMsg: res.message
            });
        }
        this.setState({
            isFetch: false
        });
    }

    //修改权限信息
    httpApiUpdate = async () => {
        if(this.state.isFetch){
            return;
        }
        this.setState({
            isFetch: true,
            fetchErr: false,
            fetchErrMsg: ""
        });
        let { form } = this.state;
        let data = {
            id: form.id,
            pid: form.pid,
            type: form.type,
            flag: form.flag,
            name: form.name,
            uri: form.uri
        };
        let res = await app.yssjfetch.post("admin/permission/update", data);
        if(res.success){
            this.props.onOk && this.props.onOk();
        }else{
            this.setState({
                fetchErr: true,
                fetchErrMsg: res.message
            });
        }
        this.setState({
            isFetch: false
        });
    }

    //modal确认, 点击保存按钮, 保存或更新api信息
    handleOnOk = () => {
        if(this.props.type){
            this.httpApiUpdate();
        }else{
            this.httpApiSave();
        }
    }

    //modal隐藏
    handleOnCancel = () => {
        this.props.onCancel && this.props.onCancel();
        this.setState({
            fetchErr: false,
            fetchErrMsg: ''
        });
    }

    render () {
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

        let { isFetch, fetchErrMsg, fetchErr, form } = this.state;
        let { type, visible, parentId } = this.props;

        return (
            <Modal
                title={type ? "修改权限信息" : "新增权限信息"}
                visible={visible}
                onOk={this.handleOnOk}
                onCancel={this.handleOnCancel}
                footer={null}
                closable={false}
                maskClosable={false}
            >
            {
                type === true &&
                <Form.Item {...formItemLayout} label="权限id">
                    <Input
                        value={form.id} disabled
                        placeholder="请输入名称..." 
                    />
                </Form.Item>
            }
                <Form.Item {...formItemLayout} label="权限名称">
                    <Input
                        value={form.name} 
                        onChange={(e) => this.handleOnChangeText("name", e)} 
                        placeholder="请输入名称..." 
                    />
                </Form.Item>
                <Form.Item {...formItemLayout} label="uri" >
                    <Input 
                        value={form.uri} 
                        onChange={(e) => this.handleOnChangeText("uri", e)} 
                        placeholder="请输入名称..." 
                    />
                </Form.Item>
                <Form.Item {...formItemLayout} label="type" >
                    <Select
                        style={{width: '100%'}}
                        value={form.type}
                        disabled={this.props.type}
                        placeholder="请选择权限信息级别"
                        onChange={(e) => this.handleSelectOnChange("type", e)}
                    >
                        <Option value="1">系统级别</Option>
                        <Option value="2">模块级别</Option>
                        <Option value="3">末级导航</Option>
                        <Option value="4">功能级别</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...formItemLayout} label="flag" >
                    <Select
                        style={{width: '100%'}}
                        value={form.flag+""}
                        disabled={this.props.type}
                        placeholder="请选择权限信息级别"
                        onChange={(e) => this.handleSelectOnChange("flag", e)}
                    >
                        <Option value="1">API权限</Option>
                        <Option value="2">路由权限</Option>
                        <Option value="3">标记权限</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...buttonItemLayout} label="" >
                    <Button type="primary" style={{marginRight: '20px'}}
                        onClick={this.handleOnOk}
                        loading={isFetch}
                    >
                        保存
                    </Button >
                    <Button onClick={this.handleOnCancel}>取消</Button>
                </Form.Item>
                {
                    fetchErr &&
                    <Alert message={fetchErrMsg} type="error" showIcon />
                }
            </Modal>
        )
    }
}

export default AuthModal;