import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { Table, Button, message, Popconfirm } from 'antd';
import localRedux from './localRedux'

import RolesLayout from './Components/DepartmentLayout'
import { getDepartmentList, deleteDepartment } from "@/services/department";
import actionStyles from '@/style/action.scss';

const RolesList = ({ history, match }) => {
    const locale = localRedux.getContext()
    const { context, dispatch } = locale
    const { departmentId, version } = context
    const [selectKeys, setSelectKeys] = useState([])
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getData = async () => {
            let data = departmentId == 0 ? {} : {
                root: departmentId
            }
            setLoading(true)
            let res = await getDepartmentList(data);
            setLoading(false)
            if (res.success) {
                if (res.body.length == 0 && departmentId != 0) {
                    return history.replace(`${match.url}/${departmentId}`)
                }
                setList(res.body)
            }
        }
        getData()
    }, [departmentId, version])
    const handleDelete = async (ids) => {
        let res = await deleteDepartment({ ids })
        if (res.success) {
            message.success('删除成功！')
            setSelectKeys([])
            dispatch.set({ version: Date.now(), departmentId: 0 })
        }
    }
    const handleBatchDelete = () => {
        handleDelete(selectKeys.join(','))
    }
    const columns = [{
        title: 'Id',
        dataIndex: 'id',
    }, {
        title: '部门名称',
        dataIndex: 'name',
    }, {
        title: '排序',
        dataIndex: 'priority',
    }, {
        title: '操作',
        dataIndex: 'address',
        render: (text, record) => (
            <span className={actionStyles.action}>
                <Link
                    className={`iconfont icon-bianji ${actionStyles.bianji}`}
                    title="编辑"
                    to={`${match.url}/${record.id}`}
                />
                <Popconfirm
                    title={'删除'}
                    onConfirm={() => handleDelete(record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <span className={`iconfont icon-x ${actionStyles.delete}`} title="删除" />
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
    return (
        <RolesLayout history={history} match={match}>
            <div>
                <div style={{ marginBottom: "15px", padding: "15px 0 0" }}>
                    <Link
                        className={'ant-btn ant-btn-primary'}
                        to={'/member/department/add?id=' + departmentId}
                        style={{ marginRight: '10px' }}
                    >添加部门</Link>
                    {/* <Button type='primary' style={{ marginRight: '10px' }}>
                        <Link to={'/channel/add?id=' + departmentId + '&modelId=' + modelTag.singlepage} >添加单页</Link>
                    </Button> */}
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
            </div>
        </RolesLayout>
    )
}

export default RolesList
