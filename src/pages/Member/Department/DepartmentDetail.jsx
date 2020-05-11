import React, { useState, useEffect, useContext } from 'react'
import { message } from "antd";
import { getDepartmentDetail, updatetDepartmentDetail } from "@/services/department";
import DepartmentLayout from './Components/DepartmentLayout'
import DepartmentAddOrEdit from './Components/DepartmentAddOrEdit'
import useData from '@/hooks/useData'

import localRedux from './localRedux'
const DepartmentDetail = ({ history, match }) => {
    const locale = localRedux.getContext()
    const [data, setData] = useData({})
    let { id } = match.params
    useEffect(() => {
        locale.dispatch.set({ departmentId: id })
    }, [id])
    useEffect(() => {
        const getData = async () => {
            let res = await getDepartmentDetail({ id })
            if (res.success) {
                let data = res.body
                data.channelIds = data.channels.map(d => d.channelId)
                data.controlChannelIds = data.controlChannels.map(d => d.channelId)
                setData(res.body)
            }
        }
        getData()
    }, [id])
    const handleChange = (name, value) => {
        setData({ [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let uData = {
            id: data.id,
            name: data.name,
            priority: data.priority,
            pid: data.pid,
        }
        uData.channelIds = data.channelIds.join(',')
        uData.controlChannelIds = uData.channelIds
        let res = await updatetDepartmentDetail(uData)
        if (res.success) {
            message.success('保存成功！')
            history.push('/member/department')
            locale.dispatch.set({ version: Date.now(), departmentId: 0 })
        }
    }
    return <DepartmentLayout history={history} match={match}>
        <DepartmentAddOrEdit data={data} onSubmit={handleSubmit} onChange={handleChange} title={'部门详情'} />
    </DepartmentLayout>
}

export default DepartmentDetail