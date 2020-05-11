
import React, { Component } from "react";
import { Table, message } from "antd";
import styles from "./TableList.scss";
import { draftCopy } from "@/services/cloud";
import { withRouter } from "react-router-dom";
@withRouter
class TableList extends Component {
    /*
    * 转载
    * */
    handleReprint = async (id) => {
        let result = await draftCopy({
            contentId: id,
            type: true
        });
        if (result.code == "200") {
            // this.props.history.push("/content/" + result.body.id)
            window.open("#/content/" + result.body.id);
        }
        else {
            message.error(result.message)
        }
    };
    /*
    * 引用
    * */
    handleQuote = async id => {
        let result = await draftCopy({
            contentId: id,
            type: false
        });
        if (result.code == "200") {
            // this.props.history.push("/content/" + result.body.id)
            window.open("#/content/" + result.body.id);
        }
        else {
            message.error(result.message)
        }
    }
    render() {
        let { data, totalCount, loading } = this.props;
        let columns = [{
            dataIndex: "id",
            title: "id",
            width: "10%",
        },
        {
            title: "标题",
            width: "40%",
            render: record => {
                return <div>
                    <span className={record.siteName == undefined ? styles.hide : styles.siteName}>[{record.siteName}]</span>
                    {record.title}
                </div>
            }
        },
        {
            dataIndex: "releaseDate",
            title: "日期",
            width: "15%",
        },
        {
            dataIndex: "views",
            title: "点击量",
            width: "10%",
        },
        {
            title: "编辑",
            width: "15%",
            render: record => {
                return <span>{record.realname || record.recommendBy}</span>
            }
        },
        {
            title: "操作",
            width: "25%",
            render: record => {
                return (
                    <span className={styles.action}>
                        <a
                            href={record.url}
                            target="_blank"
                            className={`iconfont icon-yanjing ${styles.yanjing}`}
                            title="预览"
                        />
                        <span
                            className={`iconfont icon-zhuanzai-copy ${styles.zhuanzai}`}
                            title="转载"
                            onClick={() => this.handleReprint(record.id)}
                        />
                        <span
                            className={`iconfont icon-icon_yinyong ${styles.yinyong}`}
                            title="引用"
                            onClick={() => this.handleQuote(record.id)}
                        />
                    </span>
                )
            }
        },
        ];
        return (
            <Table
                rowKey='id'
                columns={columns}
                bordered={true}
                loading={loading}
                dataSource={data}
                pagination={{
                    total: totalCount,
                    onChange: page => {
                        this.props.changePage(page);
                    }
                }}
            />
        )
    }
}

export default TableList;