import React from "react";
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import { addChannelDetail } from "@/services/channel";
import { modelTag } from '@/config/mark.config';
import getHashQuery from '@/utils/getHashQuery';
import useData from '@/hooks/useData'
import localRedux from './localRedux'
import EditIndex from './Edit'
import { message } from "antd";

let timer = false;

const ChannelAdd = ({ history }) => {
    const locale = localRedux.getContext()
    const query = getHashQuery()
    const { id, modelId } = query
    const [detail, setDetail] = useData({
        parentId: id == "0" ? "" : parseInt(id),
        modelId: modelId || 0,
        display: true,
        priority: 10,
        pageSize: 10,
        staticChannel: false,
        staticContent: false,
        allowShare: false,
        acceptContent: false
    })
    const handleChange = (name, value) => {
        setDetail({ [name]: value })
    }
    const handleSubmit = async () => {
        if (timer) {
            return
        }
        timer = true
        let res = await addChannelDetail(detail)
        setTimeout(() => {
            timer = false
        }, 100);
        if (res.success) {
            message.success('新增栏目成功！')
            locale.dispatch.set({ version: Date.now() })
            setTimeout(() => {
                history.replace('/channel')
            }, 1);
        }
    }
    return <RightContent id={'channelDetail'} style={{ padding: '0 15px' }}>
        <EditIndex detail={detail}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleChangeState={setDetail}
            title={modelTag.singlepage == detail.modelId ? '添加单页' : '添加栏目'} />
    </RightContent>
}

export default ChannelAdd