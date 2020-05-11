/*
* 待回复
* */
import React, { Component } from "react";
import { Button, Popconfirm, message, Modal, Input } from "antd";
const { TextArea } = Input;
import styles from "./Review.scss";
import { withRouter } from "react-router-dom";
@withRouter
export default class Replys extends Component {
    state = {
        visible: false,
        value: ""
    };
    /*
    * 返回列表
    * */
    handleBack = () => {
        this.props.history.push("/report");
    };
    /*
    * 回复弹框
    * */
    handleReply = () => {
        this.setState({
            visible: true
        });
    };
    /*
    * 关闭弹窗
    * */
    handleClose = () => {
        this.setState({
            visible: false
        });
    };

    /*
    * 回复
    * */
    handleOk = async () => {
        let { value } = this.state;
        if (value.length <= 0) {
            message.error("请输入回复内容")
            return;
        }
        let res = await app.yssjfetch.post("admin/web/bl/reply", {
            id: this.props.id,
            reply: value
        });
        if (res.code == "200") {
            message.success("回复成功");
            this.props.callBack();
            this.setState({
                value: "",
                visible: false
            });
        }
    }
    handleValueChange = e => {
        this.setState({
            value: e.target.value
        });
    };

    /*
    * 撤销通过
    * */
    handleCancelPass = async () => {
        let res = await app.yssjfetch.post("admin/web/bl/updateStatus", {
            id: this.props.id,
            status: "0", //撤销通过
            reply: ""
        });
        if (res.code == "200") {
            message.success("撤销成功");
            this.props.history.goBack();
        }
    };
    /*
    * 加入回收站
    * */
    handleDelete = async () => {
        let res = await app.yssjfetch.post("admin/web/bl/updateStatus", {
            id: this.props.id,
            status: "4", //回收站
            reply: ""
        });
        if (res.code == "200") {
            message.success("操作成功");
            this.props.history.goBack();
        }
    };
    /*
   * 加入黑名单
   * */
    handleBlackList = async () => {
        let res = await app.yssjfetch.post("admin/web/black/save", {
            userId: this.props.userId
        });
        if (res.code == "200") {
            message.info("该报料人已加入黑名单");
            this.props.history.goBack();
        }
    };

    render() {
        let { visible } = this.state;
        return (
            <div className={styles.div1}>
                <Button icon="table" className={styles.btn} onClick={this.handleBack}>返回列表</Button>
                <Button type="primary" icon="file-sync" onClick={this.handleReply} className={styles.btn}>回复</Button>

                <Popconfirm
                    title="您确定撤销通过吗?"
                    okText="撤销"
                    cancelText="取消"
                    okType="primary"
                    onCancel=""
                    onConfirm={() => this.handleCancelPass(1)}
                >
                    <Button icon="exception" className={styles.btn}>撤销通过</Button>
                </Popconfirm>

                <Popconfirm
                    title="您确定加入回收站吗?"
                    okText="确定"
                    cancelText="取消"
                    okType="primary"
                    onCancel=""
                    onConfirm={this.handleDelete}
                >
                    <Button icon="delete" className={styles.btn}>加入回收站</Button>
                </Popconfirm>
                <Popconfirm
                    title="您确定加入黑名单吗?"
                    okText="加入"
                    cancelText="取消"
                    okType="primary"
                    onCancel=""
                    onConfirm={this.handleBlackList}
                >
                    <Button icon="user-add" className={styles.btn}>加入黑名单</Button>
                </Popconfirm>
                <Modal
                    visible={visible}
                    maskClosable={false}
                    onCancel={this.handleClose}
                    onOk={this.handleOk}
                    okText="确定"
                    cancelText="取消"
                    title="回复"
                >
                    <TextArea rows={7} onChange={this.handleValueChange} placeholder="请输入回复内容"></TextArea>
                </Modal>
            </div>
        )
    }
}