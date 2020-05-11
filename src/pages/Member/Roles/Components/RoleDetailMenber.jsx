import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Table, Button, Popconfirm, message } from 'antd';

import { getRoleMember, deleteRoleMember, addRoleMember } from '@/services/roles';

import actionStyles from '@/style/action.scss';

import AddMenberModal from './AddMenberModal'

const RoleDetailMenber = ({ id }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [selectKeys, setSelectKeys] = useState([])
    const [visible, setVisible] = useState(false)

    const getUserList = async () => {
        setLoading(true)
        let res = await getRoleMember({ roleId: id, pageSize: 10000 })
        setLoading(false)
        if (res.success) {
            setData(res.body)
        }
    }
    useEffect(() => {
        getUserList()
    }, [id])
    const handleAddMenber = () => {
        setVisible(true)
    }
    const handleOk = async (data) => {
        let userIds = data.join(',')
        let res = await addRoleMember({
            roleId: id,
            userIds
        })
        if (res.success) {
            message.success('人员添加成功！')
            setVisible(false)
            getUserList()
        }
    }
    const handleCancel = (e) => {
        setVisible(false)
    }
    const handleDelete = async (userIds) => {
        let res = await deleteRoleMember({ roleId: id, userIds })
        if (res.success) {
            message.success('删除成功！')
            getUserList()
        }
    }
    const handleBatchDelete = () => {
        let ids = selectKeys.join(',')
        handleDelete(ids)
    }
    const rowSelection = {
        selectedRowKeys: selectKeys,
        onChange: selectedRowKeys => setSelectKeys(selectedRowKeys)
    };
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    }, {
        title: '真实姓名',
        dataIndex: 'realname',
        key: 'realname',
    }, {
        title: '等级',
        dataIndex: 'rank',
        key: 'rank',
    }, {
        title: '最后登陆时间',
        dataIndex: 'lastLoginTime',
        key: 'lastLoginTime',
    }, {
        title: '是否禁用',
        dataIndex: 'disabled',
        key: 'disabled',
        render: text => text ? '是' : '否'
    }, {
        title: "操作",
        key: "action",
        width: 180,
        align: "center",
        render: (text, record) => (
            <span className={actionStyles.action}>
                {/* <Link
                className={`iconfont icon-bianji ${actionStyles.bianji}`}
                title="编辑"
                to={`${match.url}/${record.id}`}
            /> */}
                <Popconfirm
                    title={"确定删除？"}
                    onConfirm={() => handleDelete(record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <span className={`iconfont icon-x ${actionStyles.delete}`} title="删除" />
                </Popconfirm>
            </span>
        )
    }];
    return <div>
        <div style={{ marginBottom: "15px", padding: "10px 0 0" }}>
            <Button type='primary' style={{ marginRight: '10px' }} onClick={handleAddMenber}>添加人员</Button>
            <Button onClick={handleBatchDelete} disabled={selectKeys.length == 0}>批量删除</Button>
        </div>
        <Table rowKey='id' bordered loading={loading} rowSelection={rowSelection} columns={columns} dataSource={data} />
        <AddMenberModal visible={visible} onOk={handleOk} onCancel={handleCancel} data={data} />
    </div>
}

export default RoleDetailMenber