import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Icon, Input, message, Popconfirm } from "antd";

import getTypeTreeData from "../dispatch/getTypeTreeData";
import { httpContentListTypeUpdate, httpContentListTypeDelete } from "@/services/contentlist";

import styles from "./Header.scss";

const contextConsumers = app.globalRedux.localRudexConsumers
@contextConsumers()
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            data: { ...props.data },
            oldData: { ...props.data }
        };
    }
    handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleEdit = e => {
        this.setState({
            edit: true
        });
    };
    handleChange = e => {
        let { data } = this.state;
        data.name = e.target.value;
        this.setState({ data });
    };
    handleSave = async () => {
        let { id, name, parentId, sortNum } = this.state.data;
        await httpContentListTypeUpdate({ id, name, parentId, sortNum });
        message.success("分类修改成功！");
        getTypeTreeData(this.props.dispatch);
        this.setState({
            edit: false
        });
    };
    handleCancel = () => {
        let { oldData } = this.state;
        this.setState({
            edit: false,
            data: oldData
        });
    };
    handleDelete = async () => {
        let { id } = this.state.data;
        let res = await httpContentListTypeDelete({ id });
        if (res.success) {
            message.success("分类删除成功！");
            getTypeTreeData(this.props.dispatch);
        }
    };
    render() {
        let { data, edit } = this.state;
        return edit ? (
            <div className={styles.header}>
                <Icon type="folder" />
                <span className={styles.active} onClick={this.handleClick}>
                    <Input type="text" className={styles.editInput} onChange={this.handleChange} value={data.name} />
                    <Icon type="check" title={"保存"} className={styles.icon} onClick={this.handleSave} />
                    <Icon type="close" title={"取消"} className={styles.icon} onClick={this.handleCancel} />
                </span>
            </div>
        ) : (
                <div className={styles.header}>
                    <Icon type="folder" />
                    <span className={styles.name}>{data.name}</span>
                    <span className={styles.acts} onClick={this.handleClick}>
                        <Icon type="edit" title={"编辑"} className={styles.icon} onClick={this.handleEdit} />
                        <Popconfirm title="确定删除?" onConfirm={this.handleDelete} okText="确定" cancelText="取消">
                            <Icon type="delete" title={"删除"} className={styles.icon} />
                        </Popconfirm>
                        <Link to={`/contentlist/add?typeId=${data.id}`}>
                            <Icon type="plus" title={"新增内容列表"} className={styles.icon} />
                        </Link>
                    </span>
                </div>
            );
    }
}
