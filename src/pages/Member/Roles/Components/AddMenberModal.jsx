import React, { useEffect, useState } from 'react'
import { Modal, Button, Table, Input } from 'antd';
const Search = Input.Search;

import { getUsersLocalList } from "@/services/users";

const TableList = ({ hasData, onOk }) => {
    const [list, setList] = useState([])
    const [initlist, setInitList] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectKeys, setSelectKeys] = useState([])
    useEffect(() => {
        const getUserList = async () => {
            let query = {
                pageSize: 10000
            }
            setLoading(true)
            let res = await getUsersLocalList(query)
            setLoading(false)
            if (res.success) {
                let data = res.body.filter(d => {
                    return !hasData.includes(d.id)
                })
                setList(data)
                setInitList(data)
            }
        }
        getUserList()
    }, [])
    const handleSearch = value => {
        let filterList = initlist.filter(d => {
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
        title: '是否禁用',
        dataIndex: 'disabled',
        key: 'disabled',
        render: text => text ? '是' : '否'
    }];
    const rowSelection = {
        selectedRowKeys: selectKeys,
        onChange: selectedRowKeys => setSelectKeys(selectedRowKeys)
    };
    return <div>
        <div style={{ marginBottom: "15px", display: 'flex' }}>
            <Search
                placeholder="请输入搜索用户名或姓名"
                onSearch={handleSearch}
                onChange={handleChange}
                style={{ width: 220, marginRight: '10px' }}
            />
            <Button type='primary' onClick={() => onOk(selectKeys)} disabled={selectKeys.length == 0}>添加</Button>
        </div>
        <Table rowKey={'id'} size='middle' dataSource={list} bordered columns={columns} loading={loading} rowSelection={rowSelection} onChange={() => setSelectKeys([])} />
    </div>
}

const AddMenberModal = ({ visible, onOk, onCancel, data }) => {
    let hasData = data.map(d => d.id)
    return <Modal
        title="添加人员"
        visible={visible}
        onCancel={onCancel}
        footer={false}
        width={800}
        bodyStyle={{ width: '800px' }}
    >
        {visible && <TableList hasData={hasData} onOk={onOk} />}
    </Modal>
}

export default AddMenberModal