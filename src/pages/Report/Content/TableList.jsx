import React, { Component } from "react";
import { Table, Icon, message } from "antd";
import { Link } from "react-router-dom";

import styles from "./TableList.scss";

export default class TableList extends Component {
    /*
    * 置顶
    * */
    handleTop = async id => {
        let res = await app.yssjfetch.post("admin/web/bl/setTop", {
            id: id,
            isTop: "0" //置顶
        });
        if (res.code == "200") {
            message.success("置顶成功");
            this.props.Refresh();
        }
    };

    /*
    * 取消置顶
    * */
    handleUnpin = async id => {
        let res = await app.yssjfetch.post("admin/web/bl/setTop", {
            id: id,
            isTop: "1" //取消置顶
        });
        if (res.code == "200") {
            message.success("取消置顶成功");
            this.props.Refresh();
        }
    };

    render() {
        let { menuId, data, count } = this.props;
        let columns = [
            {
                title: "Id",
                dataIndex: "id",
                width: "10%",
            },
            {
                title: "标题",
                dataIndex: "",
                width: "50%",
                render: record => {
                    return (
                        <Link to={"/report/" + record.id}>
                            {record.isTop == "0" ? <span className={styles.top}>[顶]</span> : ""}
                            {record.title}
                        </Link>
                    );
                }
            },
            {
                title: "报料人",
                dataIndex: "userName"
            },
            {
                title: "发布时间",
                dataIndex: "reportDate"
            },
            {
                title: "操作",
                dataIndex: "",
                render: record => {
                    return (
                        <div>
                            {menuId == "回收站" || record.status == "0" || record.status == "3" ? (
                                ""
                            ) : record.isTop == "0" ? (
                                <a
                                    href="javascript:void(0);"
                                    onClick={() => {
                                        this.handleUnpin(record.id);
                                    }}
                                    title="取消置顶"
                                >
                                    <Icon type="download" />
                                </a>
                            ) : (
                                        <a
                                            href="javascript:void(0);"
                                            onClick={() => {
                                                this.handleTop(record.id);
                                            }}
                                            title="置顶"
                                        >
                                            <Icon type="upload" />
                                        </a>
                                    )}
                        </div>
                    );
                }
            }
        ];
        return (
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={data}
                pagination={{
                    total: count,
                    onChange: page => {
                        this.props.changePage(page);
                    }
                }}
                bordered={true}
            />
        );
    }
}
