import React, { Component } from "react";
import { Table } from "antd";
import ModelView from "./ModelView";
import styles from "./TableList.scss";

export default class TableList extends Component {
    handleChange = (pagination, filters, sorter) => {
        let { current } = pagination;
        this.props.getListData({ pageNo: current });
    };
    renderTitle = (text, record) => {
        return (
            <span className={styles.title}>
                <ModelView modelId={record.modelId} />
                {record.topLevel > 0 && (
                    <span style={{ color: "#ff6c04" }}>
                        [顶
                        {record.topLevel}]
                    </span>
                )}
                {record.recommend && (
                    <span style={{ color: "#4590f5" }}>
                        [推荐
                        {record.recommendLevel}]
                    </span>
                )}
                <span>[{record.channelName}]</span>
                <span>{text}</span>
            </span>
        );
    };
    render() {
        let { list, totalCount, loading, selectedRows, onSelectedRows, query, onRowClick } = this.props;
        let selectedRowKeys = selectedRows.map(d => {
            return d.id;
        });
        const columns = [
            {
                title: "标题",
                dataIndex: "title",
                key: "title",
                render: this.renderTitle
            },
            {
                title: "发布时间",
                dataIndex: "releaseDate",
                key: "releaseDate",
            }
        ];
        const rowSelection = {
            selectedRowKeys,
            // onChange: (selectedRowKeys, selectedRows) => {
            //     console.log(selectedRowKeys);
            //     console.log(selectedRows);
            // },
            onSelect: (record, selected, selectedRows) => {
                onSelectedRows(selectedRows, selected);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(changeRows);
                onSelectedRows(selectedRows, selected);
            }
        };
        return (
            <Table
                className={styles.list}
                rowKey={`id`}
                columns={columns}
                dataSource={list}
                bordered
                size="middle"
                loading={loading}
                onChange={this.handleChange}
                onRow={record => ({
                    onClick: () => onRowClick(record)
                })}
                pagination={{
                    pageSize: query.pageSize,
                    total: totalCount,
                    current: query.pageNo,
                    showTotal: (total, range) => `当前第${range[0]}-${range[1]}条，共${total}条数据`
                }}
            />
        );
    }
}
