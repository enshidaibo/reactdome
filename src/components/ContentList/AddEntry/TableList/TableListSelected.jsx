import React, { Component } from "react";
import { Table, Button } from "antd";
import ModelView from "./ModelView";
import styles from "./TableListSelected.scss";

export default class TableListSelected extends Component {
    handleOk = () => {
        let { list, onOk } = this.props;
        onOk(list);
    };
    render() {
        let { list, onClose, onDelete } = this.props;
        const columns = [
            {
                title: "标题",
                dataIndex: "title",
                key: "title",
                render: (text, record) => (
                    <span className={styles.td}>
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
                        <span className={styles.delete} onClick={() => onDelete(record.id)}>
                            删除
                        </span>
                    </span>
                )
            }
        ];

        return (
            <div className={styles.content}>
                <div className={styles.title}>
                    <span>
                        已选择
                        {list.length}条
                    </span>
                    <span>
                        <Button type="primary" className={styles.btn} onClick={this.handleOk}>
                            确定
                        </Button>
                        <Button className={styles.btn} onClick={() => onClose()}>
                            取消
                        </Button>
                    </span>
                </div>
                <Table
                    className={styles.selected}
                    rowKey={`id`}
                    columns={columns}
                    dataSource={list}
                    bordered
                    size="middle"
                    // scroll={{ y: 240 }}
                    pagination={false}
                />
            </div>
        );
    }
}
