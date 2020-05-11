import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { Table, Popconfirm, Button, message } from 'antd';
import { RightContent } from '@/pages/A_Layout/ContentLayout';

import localRedux from './localRedux'
import actionStyles from '@/style/action.scss';
import { deleteRole } from "@/services/roles";
import Authorized from '@/components/Authorized'

const RolesList = ({ history, match }) => {
    const locale = localRedux.getContext()
    let { dispatch, context } = locale
    let { list, selectKeys } = context
    const handleDelete = async (ids) => {
        let res = await deleteRole({ ids })
        if (res.success) {
            message.success('删除成功！')
            dispatch.set({ version: Date.now(), selectKeys: [] })
        }
    }
    const handleBatchDelete = () => {
        let ids = selectKeys.join(',')
        handleDelete(ids)
    }
    selectKeys = JSON.parse(JSON.stringify(selectKeys))
    const rowSelection = {
        selectedRowKeys: selectKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            let selectKeys = selectedRows.map(d => {
                return d.id
            })
            dispatch.set({ selectKeys })
        }
    };
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '等级',
        dataIndex: 'level',
        key: 'level',
    }, {
        title: '排序',
        dataIndex: 'priority',
        key: 'priority',
    }, {
        title: "操作",
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
                        onConfirm={() => handleDelete(record.id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span className={`iconfont icon-x ${actionStyles.delete}`} title="删除" />
                    </Popconfirm>
                </Authorized>
            </span>
        )
    }];

    return (
        <RightContent>
            <div style={{ marginBottom: "15px" }}>
                <Authorized auth={'member.roles.add'}>
                    <Link
                        className={'ant-btn ant-btn-primary'}
                        to={`${match.url}/add`}
                        style={{ marginRight: '10px' }}
                    >新增角色</Link>
                </Authorized>
                <Authorized auth={'member.roles.delete'}>
                    <Button onClick={handleBatchDelete} disabled={selectKeys.length == 0}>批量删除</Button>
                </Authorized>
            </div>
            <Table style={{ margin: '15px 0' }} rowKey='id' bordered rowSelection={rowSelection} columns={columns} dataSource={list} />
        </RightContent>
    )
}

export default RolesList
