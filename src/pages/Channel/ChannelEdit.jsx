import React, { useEffect } from "react";
import { Spin, message } from 'antd';
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import { getChannelDetail, updateChannelDetail } from "@/services/channel";
// import { getContentModel } from './services';
import { modelTag } from '@/config/mark.config';
import useData from '@/hooks/useData'
import localRedux from './localRedux'
import EditIndex from './Edit'
let timer = false;

const ChannelEdit = ({ match }) => {
    const locale = localRedux.getContext()
    const { id } = match.params
    const [detail, setDetail] = useData(null)
    useEffect(() => {
        const getData = async () => {
            setDetail(null)
            // let res2 = await getContentModel({ channelId: id })
            locale.dispatch.set({ channelId: id })
            let res = await getChannelDetail({ id });
            if (res.success) {
                let data = res.body
                data.models = data.models.map(d => {
                    if (d.id || d.id == 0) {
                        return d.id
                    }
                    return d
                })
                setDetail(data)
            }
        }
        getData()
    }, [id])
    const handleChange = (name, value) => {
        setDetail({ [name]: value })
    }
    const handleSubmit = async () => {
        if (timer) {
            return
        }
        timer = true
        delete detail.model
        let details = { ...detail }
        details.modelIds = details.models.join(",")
        details.tpls = details.tpls.join(",")
        details.mtpls = details.mtpls.join(",")
        let res = await updateChannelDetail(details)
        setTimeout(() => {
            timer = false
        }, 100);
        if (res.success) {
            message.success('更新成功！')
            locale.dispatch.set({ version: Date.now(), channelId: detail.parentId || 0 })
        }
    }
    return <RightContent id={'channelDetail'} style={{ padding: '0 15px' }}>
        {detail ? <EditIndex
            detail={detail}
            isEdit
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleChangeState={setDetail}
            title={modelTag.singlepage == detail.modelId ? '编辑单页' : '编辑栏目'} /> : <Spin />}
    </RightContent>
}

export default ChannelEdit