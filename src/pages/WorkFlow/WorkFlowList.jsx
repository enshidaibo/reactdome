import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Table, Popconfirm, Button, message } from 'antd';
import useData from '@/hooks/useData'
import Authorized from '@/components/Authorized'
import { RightContent } from '@/pages/A_Layout/ContentLayout';

import { getWorkflowList, deleteWorkFlow } from './services';
import actionStyles from '@/style/action.scss';
const WorkFlowList = ({ match }) => {
    const [data, setData] = useData({ list: [], selectKeys: [] })
    let { list, selectKeys } = data
    const getData = async () => {
        let res = await getWorkflowList({ pageSize: 1000 })
        if (res.success) {
            setData({ list: res.body, selectKeys: [] })
        }
    }
    useEffect(() => { getData() }, [])
    const handleBatchDelete = async (selectKeys) => {
        let ids = selectKeys.join(',')
        let res = await deleteWorkFlow({ ids })
        if (res.success) {
            message.success('删除成功！')
            getData()
        }
    }
    const rowSelection = {
        selectedRowKeys: selectKeys,
        onChange: (selectKeys, selectedRows) => {
            setData({ selectKeys })
        }
    };
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '排序',
        dataIndex: 'priority',
        key: 'priority',
    }, {
        title: "操作",
        dataIndex: 'id',
        key: "action",
        width: 180,
        align: "center",
        render: (text, record) => (
            <span className={actionStyles.action}>
                <Link
                    className={`iconfont icon-bianji ${actionStyles.bianji}`}
                    title="编辑"
                    to={`${match.url}/${record.id}`}
                />
                <Authorized auth={'member.roles.delete'}>
                    <Popconfirm
                        title={"确定删除？"}
                        onConfirm={() => handleBatchDelete([record.id])}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span className={`iconfont icon-x ${actionStyles.delete}`} title="删除" />
                    </Popconfirm>
                </Authorized>
            </span>
        )
    }];
    return <RightContent>
        <div style={{ marginBottom: "15px" }}>
            <Authorized auth={'member.roles.add'}>
                <Link
                    className={'ant-btn ant-btn-primary'}
                    to={`${match.url}/add`}
                    style={{ marginRight: '10px' }}
                >新增工作流</Link>
            </Authorized>
            <Authorized auth={'member.roles.delete'}>
                <Popconfirm
                    title={"确定删除？"}
                    onConfirm={() => handleBatchDelete(selectKeys)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button
                        disabled={selectKeys.length == 0}>批量删除</Button>
                </Popconfirm>

            </Authorized>
        </div>
        <Table style={{ margin: '15px 0' }}
            rowKey='id'
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list}
            onChange={() => setData({ selectKeys: [] })}
        />
    </RightContent>
}
export default WorkFlowList