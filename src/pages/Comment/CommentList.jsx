import React, { useState } from "react";
import { Table, message, Button, Select, Input, Modal } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import { getCommentList, httpCommentCheck, httpCommentDelete } from "@/services/comment";

import useAsync from '@/hooks/useAsync';
import useData from '@/hooks/useData';
const checkeds = {
    0: '等待审核',
    1: '通过',
    2: '不通过'
}
import Comment from './Components/Comment'
const CommentList = ({ match }) => {
    const queryContentId = match.params.id
    const [state, setState] = useData({
        pageSize: 10,
        pageNo: 1,
        total: 0,
        queryRecommend: '', //是否推荐
        queryChecked: '', //是否通过
        queryContentId: queryContentId, //搜索文章Id
        selectedRowKeys: []
    })
    const fetchData = () => {
        let { selectedRowKeys, total, ...query } = state
        return getCommentList(query).then(res => {
            if (res.success) {
                setState({ total: res.totalCount, selectedRowKeys: [] })
            }
            return res
        })
    }
    let data = useAsync(fetchData, [state.queryRecommend, state.queryChecked, state.pageNo, state.pageSize])
    const handleChangePage = page => {
        setState({
            pageNo: page.current,
            selectedRowKeys: []
        })
    }
    const onShowSizeChange = (current, pageSize) => {
        setState({
            pageSize: pageSize,
            pageNo: 1,
            selectedRowKeys: []
        })
    }
    const handleCheck = async (isCheck) => {
        let res = await httpCommentCheck({ ids: state.selectedRowKeys.join(','), isCheck })
        if (res.success) {
            message.success('操作成功！')
            data.fetch()
        }
    }
    const handleDetele = async () => {
        let res = await httpCommentDelete({ ids: state.selectedRowKeys.join(',') })
        if (res.success) {
            message.success('删除成功！')
            data.fetch()
        }
    }
    const showDeleteConfirm = () => {
        confirm({
            title: `确定删除这${state.selectedRowKeys.length}条数据？`,
            onOk() {
                handleDetele()
            },
            onCancel() {
                console.log('Cancel');
            },
            okText: '确定',
            cancelText: '取消'
        });
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: '评论信息', dataIndex: 'contentTitle', key: 'contentTitle',
            render: (text, record) => <Comment record={record} getData={data.fetch} id={queryContentId} />
        },
        { title: '审核状态', dataIndex: 'checked', key: 'checked', render: text => checkeds[text] },
    ];
    const rowSelection = {
        selectedRowKeys: state.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setState({
                selectedRowKeys: selectedRowKeys
            })
        }
    };
    const handleChangeSearch = (e) => {
        let queryContentId = e.target.value.replace(/[^0-9]/ig, "").replace(/\b(0+)/gi, "")
        setState({ queryContentId })
    }
    return <RightContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '490px', marginBottom: '10px' }}>
                <Select value={state.queryChecked} style={{ width: 120, marginRight: '10px' }} onChange={queryChecked => setState({ queryChecked })}>
                    <Option value={''}>审核状态</Option>
                    <Option value={0}>等待审核</Option>
                    <Option value={1}>审核通过</Option>
                    <Option value={2}>审核不通过</Option>
                </Select>
                <Select value={state.queryRecommend} style={{ width: 120, marginRight: '10px' }} onChange={queryRecommend => setState({ queryRecommend })}>
                    <Option value={''}>是否推荐</Option>
                    <Option value={true}>推荐</Option>
                    <Option value={false}>不推荐</Option>
                </Select>
                {!queryContentId && <Search
                    placeholder="请输入搜索的文章id"
                    value={state.queryContentId}
                    onSearch={e => data.fetch()}
                    onChange={handleChangeSearch}
                    style={{ width: 220, marginRight: '10px' }}
                />}
            </div>
            <div style={{ minWidth: '300px', marginBottom: '15px' }}>
                <Button type='primary' disabled={state.selectedRowKeys.length == 0} style={{ marginRight: '10px' }} onClick={e => handleCheck(1)}>审核通过</Button>
                <Button type='primary' disabled={state.selectedRowKeys.length == 0} style={{ marginRight: '10px' }} onClick={e => handleCheck(2)}>审核不通过</Button>
                <Button disabled={state.selectedRowKeys.length == 0} onClick={showDeleteConfirm}>批量删除</Button>
            </div>
        </div>
        <Table
            bordered
            rowKey='id'
            columns={columns}
            rowSelection={rowSelection}
            loading={data.loading}
            dataSource={data.data}
            onChange={handleChangePage}
            pagination={{
                total: state.total,
                current: state.pageNo,
                pageSize: state.pageSize,
                showTotal: (total, range) => `当前第${range[0]}-${range[1]}条，共${total}条数据`,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                pageSizeOptions: ['5', '10', '20', '40']
            }}
        />
    </RightContent>
}

export default CommentList