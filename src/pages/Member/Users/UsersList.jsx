import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { Table, Popconfirm, Button, message, Input } from 'antd';
const Search = Input.Search;
import localRedux from './localRedux'
import UsersLayout from './Components/UsersLayout'
import { getUsersLocalList, deleteUser } from "@/services/users";

import actionStyles from '@/style/action.scss';
import useAsync from '@/hooks/useAsync';

const UsersList = ({ history, match }) => {
    const locale = useContext(localRedux.context);
    const { departmentId, tableversion } = locale.context
    const [selectKeys, setSelectKeys] = useState([])
    const [list, setList] = useState([])
    const fetchUser = () => {
        let query = {
            pageSize: 10000
        }
        if (departmentId != 0) {
            query.queryDepartId = departmentId
        }
        return getUsersLocalList(query).then(res => {
            if (res.success) {
                setList(res.body)
            }
            return res
        })
    }
    let data = useAsync(fetchUser, [departmentId, tableversion])
    const handleSearch = value => {
        let filterList = data.data.filter(d => {
            return d.username.includes(value) || d.realname.includes(value)
        })
        setList(filterList)
        setSelectKeys([])
    }
    let timer
    const handleChange = e => {
        clearTimeout(timer);
        let value = e.target.value
        timer = setTimeout(() => {
            handleSearch(value)
        }, 300);
    }
    const handleDeleteUser = async (ids) => {
        let res = await deleteUser({ ids })
        if (res.success) {
            message.success('删除成功！')
            data.fetch()
            getUserList()
        }
    }
    const handleBatchDelete = () => {
        let ids = selectKeys.join(',')
        handleDeleteUser(ids)
    }
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
                <Link
                    className={`iconfont icon-bianji ${actionStyles.bianji}`}
                    title="编辑"
                    to={`${match.url}/${record.id}`}
                />
                <Popconfirm
                    title={"确定删除？"}
                    onConfirm={() => handleDeleteUser(record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <span className={`iconfont icon-x ${actionStyles.delete}`} title="删除" />
                </Popconfirm>
            </span>
        )
    }];
    const rowSelection = {
        selectedRowKeys: selectKeys,
        onChange: selectedRowKeys => setSelectKeys(selectedRowKeys)
    };
    return (
        <UsersLayout history={history} match={match}>
            <div style={{ marginBottom: "15px", padding: "15px 0 0", display: 'flex' }}>
                <Link
                    className={'ant-btn ant-btn-primary'}
                    to={`${match.url}/add`}
                    style={{ marginRight: '10px' }}
                >添加人员</Link>
                <Button onClick={handleBatchDelete} disabled={selectKeys.length == 0} style={{ marginRight: '10px' }}>批量删除</Button>
                <Search
                    placeholder="请输入搜索用户名或姓名"
                    onSearch={handleSearch}
                    onChange={handleChange}
                    style={{ width: 220 }}
                />
            </div>
            <Table rowKey={'id'} dataSource={list} bordered columns={columns} loading={data.loading} rowSelection={rowSelection} onChange={() => setSelectKeys([])} />
        </UsersLayout>
    )
}

export default UsersList
