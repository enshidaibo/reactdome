/*
*  待审核
* */

import React, { Component } from "react";
import { Button, Popconfirm, message, Modal, Input } from "antd";

import styles from "./Review.scss";
const { TextArea } = Input;
import { withRouter } from "react-router-dom";
@withRouter
export default class Review extends React.Component {
    state = {
        visible: false,
        value: "抱歉，该条报料不符合要求，未通过审核。"
    };

    /*
   * 返回列表
   * */
    handleBack = () => {
        this.props.history.push("/report");
    };
    /*
   * 审核通过
   * */
    handlePass = async () => {
        let res = await app.yssjfetch.post("admin/web/bl/updateStatus", {
            id: this.props.id,
            status: "1", //审核通过
            reply: ""
        });
        if (res.code == "200") {
            message.success("审核通过");
            this.props.callBack();
        }
    };
    /*
    * 不与处理
    * */
    handleByPassed = () => {
        this.setState({
            visible: true
        });
    };
    /*
    * 关闭弹框
    * */
    handleClose = () => {
        this.setState({
            visible: false
        });
    };

    handleChange = e => {
        this.setState({
            value: e.target.value
        });
    };

    /*
    * 提交
    * */
    handleOk = async () => {
        let res = await app.yssjfetch.post("admin/web/bl/updateStatus", {
            id: this.props.id,
            status: "3", //不予处理
            reply: this.state.value
        });
        if (res.code == "200") {
            message.success("处理成功");
            this.props.callBack();
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
        let { visible, value } = this.state;
        return (
            <div className={styles.div1}>
                <Button icon="table" className={styles.btn} onClick={this.handleBack}>
                    返回列表
                </Button>
                <Popconfirm
                    title="您确定审核通过吗?"
                    okText="通过"
                    cancelText="取消"
                    okType="primary"
                    onCancel=""
                    onConfirm={this.handlePass}
                >
                    <Button icon="file-done" className={styles.btn} type="primary">
                        审核通过
                    </Button>
                </Popconfirm>
                <Button icon="exception" className={styles.btn} onClick={this.handleByPassed}>
                    不予处理
                </Button>
                <Popconfirm
                    title="您确定加入回收站吗?"
                    okText="确定"
                    cancelText="取消"
                    okType="primary"
                    onCancel=""
                    onConfirm={this.handleDelete}
                >
                    <Button icon="delete" className={styles.btn}>
                        加入回收站
                    </Button>
                </Popconfirm>
                <Popconfirm
                    title="您确定加入黑名单吗?"
                    okText="加入"
                    cancelText="取消"
                    okType="primary"
                    onCancel=""
                    onConfirm={this.handleBlackList}
                >
                    <Button icon="user-add" className={styles.btn}>
                        加入黑名单
                    </Button>
                </Popconfirm>
                <Modal
                    visible={visible}
                    maskClosable={false}
                    onCancel={this.handleClose}
                    onOk={this.handleOk}
                    okText="确定"
                    cancelText="取消"
                    title="不与处理"
                >
                    <TextArea rows={7} onChange={this.handleChange} value={value} />
                </Modal>
            </div>
        );
    }
}
