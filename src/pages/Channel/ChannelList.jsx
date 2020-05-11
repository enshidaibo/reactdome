import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, message, Popconfirm } from 'antd';
import { RightContent } from '@/pages/A_Layout/ContentLayout';

import { getChannelList, deleteChannelDetail } from "@/services/channel";
import { modelTag } from '@/config/mark.config';
import localRedux from './localRedux'
import styles from './ChannelList.scss';

const ChannelList = ({ history, match }) => {
    const locale = localRedux.getContext()
    const { channelId, version } = locale.context
    const [selectKeys, setSelectKeys] = useState([])
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getData = async () => {
            const data = channelId == 0 ? {} : {
                parentId: channelId
            }
            setLoading(true)
            let res = await getChannelList(data);
            setLoading(false)
            if (res.success) {
                if (res.body.length == 0 && channelId != 0) {
                    return history.replace(`${match.url}/${channelId}`)
                }
                setList(res.body)
            }
        }
        getData()
    }, [channelId, version])
    const handleDelete = async (ids) => {
        let res = await deleteChannelDetail({ ids })
        if (res.success) {
            message.success('删除成功！')
            setSelectKeys([])
            locale.dispatch.set({ version: Date.now() })
        }
    }
    const handleBatchDelete = () => {
        handleDelete(selectKeys.join(','))
    }
    const columns = [{
        title: 'Id',
        dataIndex: 'id',
    }, {
        title: '栏目名称',
        dataIndex: 'name',
    }, {
        title: '栏目路径',
        dataIndex: 'path',
    }, {
        title: '排序',
        dataIndex: 'priority',
    }, {
        title: '操作',
        dataIndex: 'address',
        render: (text, record) => (
            <span className={styles.action}>
                <Link
                    className={`iconfont icon-bianji ${styles.bianji}`}
                    title="编辑"
                    to={`${match.url}/${record.id}`}
                />
                <Popconfirm
                    title={'删除'}
                    onConfirm={() => handleDelete(record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <span className={`iconfont icon-x ${styles.delete}`} title="删除" />
                </Popconfirm>
            </span>
        ),
    }];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let selectKeys = selectedRows.map(d => {
                return d.id
            })
            setSelectKeys(selectKeys)
        }
    };
    return <RightContent>
        <div style={{ marginBottom: "15px" }}>
            <Link
                className={'ant-btn ant-btn-primary'}
                to={'/channel/add?id=' + channelId}
                style={{ marginRight: '10px' }}
            >添加栏目</Link>
            <Link
                className={'ant-btn ant-btn-primary'}
                to={'/channel/add?id=' + channelId + '&modelId=' + modelTag.singlepage}
                style={{ marginRight: '10px' }}
            >添加单页</Link>
            <Button onClick={handleBatchDelete} disabled={selectKeys.length == 0}>批量删除</Button>
        </div>
        <Table bordered
            selectedRowKeys={selectKeys}
            rowKey={'id'}
            pagination={false}
            loading={loading}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list}
        />
    </RightContent>
}

export default ChannelList