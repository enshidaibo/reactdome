/*
* 回复内容列表
* */

import React, { Component } from "react";
import styles from "./ReplyList.scss";
import { message, Icon, Popconfirm, Modal, Input } from "antd";
const { TextArea } = Input;
export default class ReplyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: this.props.reply
        };
    }

    /*
    * 关闭弹窗
    * */
    handleClose = () => {
        this.setState({
            visible: false
        });
    };
    /*
    * 显示弹窗
    * */
    handleOpen = () => {
        this.setState({
            visible: true
        });
    };
    handleValueChange = e => {
        this.setState({
            value: e.target.value
        });
    };
    /*
   * 修改
   * */
    handleOk = async () => {
        let res = await app.yssjfetch.post("admin/web/bl/reply", {
            id: this.props.id,
            reply: this.state.value
        });
        if (res.code == "200") {
            message.success("修改成功");
            this.props.callBack();
            this.setState({
                visible: false
            });
        }
    };
    /*
   * 删除
   * */
    handleDetele = async () => {
        let res = await app.yssjfetch.post("admin/web/bl/reply", {
            id: this.props.id,
            reply: "",
            isDel: "1"
        });
        if (res.code == "200") {
            message.success("删除成功");
            this.setState({ value: "" });
            this.props.callBack();
        }
    };

    render() {
        let { visible, value } = this.state;
        let { status } = this.props;
        return (
            <div>
                <div className={styles.list}>
                    <div className={styles.reply}>{status == "2" ? "回复" : "不予处理"}</div>
                    <div className={styles.time}>{this.props.replyTime}</div>
                    <div className={styles.content}>
                        {value.length <= 0 ? <span className={styles.delete}>回复内容已删除</span> : value}
                    </div>
                    {status == "2" &&
                        value.length > 0 && (
                            <div className={styles.btn}>
                                <a
                                    title="修改回复"
                                    href="javascript:void(0);"
                                    onClick={this.handleOpen}
                                    className={styles.icon}
                                >
                                    <Icon type="edit" />
                                </a>
                                <Popconfirm
                                    title="您确定删除吗?"
                                    okText="删除"
                                    cancelText="取消"
                                    okType="primary"
                                    onCancel=""
                                    onConfirm={this.handleDetele}
                                >
                                    <a title="删除回复" href="javascript:void(0);">
                                        <Icon type="delete" />
                                    </a>
                                </Popconfirm>
                            </div>
                        )}
                </div>
                <Modal
                    visible={visible}
                    maskClosable={false}
                    onCancel={this.handleClose}
                    onOk={this.handleOk}
                    okText="确定"
                    cancelText="取消"
                    title="修改回复"
                >
                    <TextArea rows={7} onChange={this.handleValueChange} value={value} />
                </Modal>
            </div>
        );
    }
}
