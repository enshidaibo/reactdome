import React, { Component } from "react";
import { Table, message, Icon, Popconfirm } from "antd";

import styles from "./TableList.scss";

import EditDetail from "../EditDetail/EditDetail";
import { withRouter } from "react-router-dom";
import { httpContentListItemDelete } from "@/services/contentlist";

class HistoryTableList extends Component {
    handleChange = (pagination, filters, sorter) => {
        let { current } = pagination;
        this.props.getHistoryListData({ pageNo: current });
    };
    handleItemTop = async data => {
        let { list, onChangeList } = this.props;
        data = {
            ...data,
            sort: Date.now(),
            top: false
        };
        list = list.concat([data]);
        onChangeList(list);
    };
    handleDelete = async id => {
        let res = await httpContentListItemDelete({ id });
        if (res.success) {
            message.success("删除成功！");
            this.props.getHistoryListData();
        }
    };
    render() {
        let { historysList, loading, query, curItem } = this.props;
        historysList = historysList.map((d, i) => {
            return {
                ...d,
                index: i + 1
            };
        });
        const columns = [
            {
                title: "排序",
                dataIndex: "index",
                key: "index",
                width: 60,
                align: "center"
            },
            {
                title: "标题",
                dataIndex: "title",
                key: "title"
            },
            {
                title: "操作",
                key: "action",
                width: 210,
                align: "center",
                render: (text, record) => (
                    <span className={styles.action}>
                        {curItem.classify == 0
                            ? [
                                <Icon
                                    type="to-top"
                                    className={`${styles.yanjing}`}
                                    title="置顶"
                                    onClick={() => this.handleItemTop(record)}
                                />,
                                <a
                                    href={record.link}
                                    target="_blank"
                                    className={`iconfont icon-yanjing ${styles.yanjing}`}
                                    title="预览"
                                />,
                                <EditDetail
                                    ishistory={true}
                                    data={record}
                                    getHttpData={this.props.getHistoryListData}
                                >
                                    <span className={`iconfont icon-bianji ${styles.bianji}`} title="编辑" />
                                </EditDetail>,
                                <Popconfirm
                                    title={"确定删除？"}
                                    onConfirm={() => this.handleDelete(record.id)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <span className={`iconfont icon-x ${styles.delete}`} title="删除" />
                                </Popconfirm>
                            ]
                            : curItem.classify == 1
                                ? "自动"
                                : "共享"}
                    </span>
                )
            },
            {
                title: "推荐人",
                dataIndex: "recommendBy",
                key: "recommendBy",
                width: 100,
                align: "center"
            },
            {
                title: "发布时间",
                dataIndex: "releaseDate",
                key: "releaseDate",
                width: 170,
                align: "center"
            }
        ];
        return (
            <Table
                rowKey={`id`}
                columns={columns}
                dataSource={historysList}
                bordered
                size="middle"
                onChange={this.handleChange}
                pagination={{
                    pageSize: query.pageSize,
                    total: query.totalCount,
                    current: query.pageNo,
                    showTotal: (total, range) => `当前第${range[0]}-${range[1]}条，共${total}条数据`
                }}
                loading={loading}
            />
        );
    }
}

export default withRouter(HistoryTableList);
