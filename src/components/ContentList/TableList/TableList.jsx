import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Table, message, Icon } from "antd";
import { dragContext, dragBody } from '@/components/TaberMoveSort'
import update from "immutability-helper";
import EditDetail from "../EditDetail/EditDetail";
import styles from "./TableList.scss";

class TableList extends React.Component {
    moveRow = (dragIndex, hoverIndex) => {
        const { list, onChangeSorts } = this.props;
        const dragRow = list[dragIndex];
        const hoverRow = list[hoverIndex];
        if (dragRow.top != hoverRow.top) {
            return;
        }
        let state = update(
            list,
            {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
            }
        );
        onChangeSorts(state);
    };
    handleItemChangeTop = async (data, top = false) => {
        let { list, onChangeList } = this.props;
        list = list.map(d => {
            if (d.sort == data.sort) {
                return {
                    ...data,
                    top,
                    sort: Date.now()
                };
            }
            return d;
        });
        onChangeList(list);
    };
    handleDelete = async data => {
        let { onChangeList, list } = this.props;
        list = list.filter(d => {
            return d.sort !== data.sort;
        });
        onChangeList(list);
    };
    getHttpData = () => {
        this.props.getListData();
        this.props.getHistoryListData();
    };
    render() {
        let { list, loading, onChangeList } = this.props;
        list = list.map((d, i) => {
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
                align: "center",
                render: (text, record) =>
                    record.top ? <span className={styles.top}>{text}</span> : <span>{text}</span>
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
                        {record.top ? (
                            <Icon
                                type="download"
                                className={`${styles.yanjing}`}
                                title="取消置顶"
                                onClick={() => this.handleItemChangeTop(record)}
                            />
                        ) : (
                                <Icon
                                    type="upload"
                                    className={`${styles.yanjing}`}
                                    title="置顶"
                                    onClick={() => this.handleItemChangeTop(record, true)}
                                />
                            )}
                        <a
                            href={record.link}
                            target="_blank"
                            className={`iconfont icon-yanjing ${styles.yanjing}`}
                            title="预览"
                        />
                        <EditDetail
                            data={record}
                            list={list}
                            onChangeList={onChangeList}
                            getHttpData={this.getHttpData}
                        >
                            <span className={`iconfont icon-bianji ${styles.bianji}`} title="编辑" />
                        </EditDetail>
                        <span
                            onClick={() => this.handleDelete(record)}
                            className={`iconfont icon-x ${styles.delete}`}
                            title="删除"
                        />
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
                rowKey={`sort`}
                columns={columns}
                dataSource={list}
                bordered
                size="middle"
                pagination={false}
                loading={loading}
                components={dragBody}
                onRow={(record, index) => ({
                    index,
                    moveRow: this.moveRow
                })}
            />
        );
    }
}
export default dragContext(withRouter(TableList));
