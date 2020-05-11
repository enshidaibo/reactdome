/*
* 已回复
* */

import React, { Component } from "react";
import { Button, Popconfirm, message, Modal, Input } from "antd";

import styles from "./Review.scss";
import { withRouter } from "react-router-dom";
@withRouter
export default class Replied extends React.Component {
    /*
   * 返回列表
   * */
    handleBack = () => {
        this.props.history.push("/report");
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
    render() {
        return (
            <div className={styles.div1}>
                <Button icon="table" className={styles.btn} onClick={this.handleBack}>
                    返回列表
                </Button>
                <Popconfirm
                    title="您确定加入回收站吗?"
                    okText="加入"
                    cancelText="取消"
                    okType="primary"
                    onCancel=""
                    onConfirm={this.handleDelete}
                >
                    <Button icon="delete" className={styles.btn}>
                        加入回收站
                    </Button>
                </Popconfirm>
            </div>
        );
    }
}
