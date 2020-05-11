/**
 * 添加表格
 */

import React from "react";
import { Modal, Form, InputNumber, message } from "antd";
const FormItem = Form.Item;
import serializers from "../../serializer/serializer";
const serializer = serializers();

import styles from "../style.scss";
import useData from '@/hooks/useData';

const Table = ({ value, onChange }) => {
    const [data, setData] = useData({ visible: false })
    const { visible, row, col } = data
    const handleOk = e => {
        if (isNaN(row) || row <= 0) {
            return message.warning("请输入正确的行数");
        }
        if (isNaN(col) || col <= 0) {
            return message.warning("请输入正确的列数");
        }
        setData({
            visible: false
        });
        let td = "";
        let tr = "";
        for (let i = 0; i < col; i++) {
            td = td + "<td><p></p></td>";
        }
        for (let j = 0; j < row; j++) {
            tr = tr + `<tr>${td}</tr>`;
        }
        const table = `<table>${tr}</table>`;
        const { document } = serializer.deserialize(table);
        const change = value.change().insertFragment(document);
        onChange(change);
    };
    const formItemLayout = {
        labelCol: {
            sm: { span: 2 }
        },
        wrapperCol: {
            sm: { span: 22 }
        }
    };
    return [
        <div className={styles.btn} key={"btn"}>
            <span className={"iconfont icon-table"} onMouseDown={() => setData({ visible: true })} title={"插入表格"} />
        </div>,
        <Modal
            key="modal"
            title="插入表格"
            okText="确定"
            cancelText="取消"
            visible={visible}
            onOk={handleOk}
            onCancel={() => setData({ visible: false })}
        >
            <FormItem label="行数" {...formItemLayout}>
                <InputNumber
                    min={1}
                    max={10}
                    value={row}
                    style={{ width: "100%" }}
                    placeholder="请输入行数"
                    onChange={row => setData({ row })}
                />
            </FormItem>
            <FormItem label="列数" {...formItemLayout}>
                <InputNumber
                    min={1}
                    max={10}
                    value={col}
                    style={{ width: "100%" }}
                    placeholder="请输入列数"
                    onChange={col => setData({ col })}
                />
            </FormItem>
        </Modal>
    ];
}

export default {
    name: 'table',
    pluginRender: Table
}