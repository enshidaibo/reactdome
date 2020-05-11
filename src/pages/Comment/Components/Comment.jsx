import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, message, Input, Popconfirm, Modal } from 'antd';
const { TextArea } = Input;
import {
    httpCommentCheck,
    httpCommentUpdate,
    httpCommentReply,
    httpCommentRecommend,
    httpCommentDelete
} from "@/services/comment";
import useData from '@/hooks/useData';

const checkeds = {
    waiting: 0,//等待审核
    past: 1,//通过
    nopast: 2,//不通过
}
const Comment = ({ record, getData, id }) => {
    const [state, setState] = useData({
        edit: false,
        text: record.text,
        reply: false,
        replyContent: record.replyContent
    })
    const handleCheck = async (isCheck) => {
        let res = await httpCommentCheck({ ids: record.id, isCheck })
        if (res.success) {
            message.success('操作成功！')
            getData()
        }
    }
    const handleRecommend = async isRecommend => {
        let res = await httpCommentRecommend({ id: record.id, isRecommend })
        if (res.success) {
            message.success('操作成功！')
            getData()
        }
    }
    const handleDetele = async () => {
        let res = await httpCommentDelete({ ids: record.id })
        if (res.success) {
            message.success('删除成功！')
            getData()
        }
    }
    const handleUpdate = async () => {
        let data = {
            ...record,
            text: state.text
        }
        if (state.text == '') {
            return message.error('评论内容不能为空！')
        }
        setState({ edit: false })
        let res = await httpCommentUpdate(data)
        if (res.success) {
            message.success('修改成功！')
            getData()
        }
    }
    const handleReply = async () => {
        if (state.replyContent == '') {
            return message.error('回复内容不能为空！')
        }
        setState({ reply: false })
        let res = await httpCommentReply({
            id: record.id,
            reply: state.replyContent
        })
        if (res.success) {
            message.success('回复成功！')
            getData()
        }
    }
    return <div>
        <div>文章ID：{record.contentId} {!id && <Link to={`/comment/${record.contentId}`}>查看本文全部评论</Link>}</div>
        <div>文章标题：<a href={record.contentURL} target='_blank'>{record.contentTitle}</a></div>
        <div>评论内容：{record.text}</div>
        <div>评论者：{record.realUsername}</div>
        <div>评论时间：{record.createTime}</div>
        <div>IP：{record.ip}</div>
        {record.replyContent && <div>回复内容：{record.replyContent}</div>}
        <div style={{ marginTop: '5px' }}>
            {record.checked !== checkeds.past && <Button size="small" style={{ marginRight: '5px' }} onClick={e => handleCheck(1)}>审核通过</Button>}
            {record.checked !== checkeds.nopast && <Button size="small" style={{ marginRight: '5px' }} onClick={e => handleCheck(2)}>审核不通过</Button>}
            <Button size="small" style={{ marginRight: '5px' }} onClick={e => setState({ edit: true })}>修改评论</Button>
            <Button size="small" style={{ marginRight: '5px' }} onClick={e => setState({ reply: true })} >回复</Button>
            {record.recommend ?
                <Button size="small" style={{ marginRight: '5px' }} onClick={e => handleRecommend(false)}>取消推荐</Button> :
                <Button size="small" style={{ marginRight: '5px' }} onClick={e => handleRecommend(true)}>推荐</Button>
            }
            <Popconfirm title="确定删除?" onConfirm={handleDetele} okText="确定" cancelText="取消">
                <Button size="small">删除</Button>
            </Popconfirm>
        </div>
        <Modal
            title="修改评论"
            visible={state.edit}
            onOk={handleUpdate}
            onCancel={e => setState({ edit: false })}
            okText='确定'
            cancelText='取消'
            bodyStyle={{ padding: '5px' }}
        >
            <TextArea value={state.text} onChange={e => setState({ text: e.target.value })} />
        </Modal>
        <Modal
            title="回复评论"
            visible={state.reply}
            onOk={handleReply}
            onCancel={e => setState({ reply: false })}
            okText='确定'
            cancelText='取消'
            bodyStyle={{ padding: '5px' }}
        >
            <TextArea value={state.replyContent} onChange={e => setState({ replyContent: e.target.value })} />
        </Modal>
    </div>
}

export default Comment