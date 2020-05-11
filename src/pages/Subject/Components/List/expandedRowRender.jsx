import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { dragContext, dragBody } from '@/components/TaberMoveSort'
import update from "immutability-helper";
import EditDetail from './EditDetail'

import styles from './List.scss'

import { getContentList } from '../../services';
const AutoRowRender = (record) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            let res = await getContentList({
                cid: record.channelId,
                pageSize: record.limit,
                queryStatus: 'checked',
                queryOrderBy: 4
            })
            if (res.success) {
                setData(res.body)
            }
        }
        getData()
    }, [record])
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 60,
            align: "center",

        },
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
            render: (text, record) => {
                return <a href={record.url} target="_blank">{text}</a>
            }
        }
    ];
    return <Table
        rowKey={`sort`}
        columns={columns}
        dataSource={data}
        bordered
        size="small"
        pagination={false}
    />
}

const RowRender = ({ data = [], handleEditData, ...record }) => {
    console.log(data);
    let nData = data.map((d, i) => {
        let nd = d.set('_index', i)
        return nd
    })
    const moveRow = (dragIndex, hoverIndex) => {
        const dragRow = nData[dragIndex];
        let state = update(
            nData,
            {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
            }
        );
        handleEditData(record, state)
    };
    const handleDelete = (e) => {
        let newData = data.filter(d => {
            return d.id !== e.id
        })
        handleEditData(record, newData)
    }
    const handleEdit = (data) => {
        let newData = nData.map(d => {
            if (d._index == data._index) {
                return data
            }
            return d
        })
        handleEditData(record, newData)
    }
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 60,
            align: "center",

        },
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
            render: (text, record) => {
                return <a href={record.url} target="_blank">{text}</a>
            }
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "action",
            render: (text, record) => {
                return <span className={styles.actions}>
                    <EditDetail data={record} onChange={handleEdit}>
                        <span className={`iconfont icon-bianji ${styles.bianji}`}>编辑</span>
                    </EditDetail>
                    <span className={`iconfont icon-x ${styles.delete}`} onClick={() => handleDelete(record)}>删除</span>
                </span>
            }
        }
    ];
    return <Table
        rowKey={`sort`}
        columns={columns}
        dataSource={nData}
        bordered
        size="small"
        pagination={false}
        components={dragBody}
        onRow={(record, index) => ({
            index,
            moveRow: moveRow
        })}
    />
}

const RowRenders = dragContext(RowRender);

const expandedRowRender = ({ record, handleEditData }) => {
    if (record.isAuto) {
        return <AutoRowRender {...record}></AutoRowRender>
    }
    return <RowRenders {...record} handleEditData={handleEditData} />
}

export default expandedRowRender