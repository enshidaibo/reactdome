import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, message, Popconfirm } from "antd";

import styles from "./List.scss";
import { httpContentListDelete } from "@/services/contentlist";

import getTypeTreeData from "../dispatch/getTypeTreeData";
const contextConsumers = app.globalRedux.localRudexConsumers
@contextConsumers()
export default class List extends Component {
    state = {
        edit: false
    };
    handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleEdit = e => {
        this.setState({
            edit: true
        });
    };
    handleSave = e => {
        this.setState({
            edit: false
        });
    };
    handleDelete = async () => {
        let { id } = this.props.data;
        let res = await httpContentListDelete({ id });
        if (res.success) {
            message.success("删除成功！");
            getTypeTreeData(this.props.dispatch);
            this.setState({
                edit: false
            });
        }
    };
    render() {
        let { data = {} } = this.props;
        let { edit } = this.state;
        let { classify } = data;
        let type;
        switch (classify) {
            case 0:
                type = "fork";
                break;
            case 1:
                type = "rocket";
                break;
            case 2:
                type = "share-alt";
                break;
            default:
                break;
        }
        return (
            <div className={styles.List}>
                <Icon type={type} />
                <div to="/contentlist/1" title={data.name} className={styles.name}>
                    {data.name}
                </div>
                <span className={styles.acts} onClick={this.handleClick}>
                    <Link to={`/contentlist/${data.id}`} title={"编辑"}>
                        <Icon type="edit" className={styles.icon} />
                    </Link>
                    <Popconfirm title="确定删除?" onConfirm={this.handleDelete} okText="确定" cancelText="取消">
                        <Icon type="delete" title={"删除"} className={styles.icon} />
                    </Popconfirm>
                </span>
            </div>
        );
    }
}
