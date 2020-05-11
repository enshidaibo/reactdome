import React, { useState, useContext } from 'react'
import { message } from "antd";
import { addDepartmentDetail } from "@/services/department";
import DepartmentLayout from './Components/DepartmentLayout'
import DepartmentAddOrEdit from './Components/DepartmentAddOrEdit'
import localRedux from './localRedux'
import useData from '@/hooks/useData'

const DepartmentAdd = ({ history, match }) => {
    const initValue = {
        name: '',
        priority: 1,
        channelIds: [],
        controlChannelIds: [],
        pid: ''
    }
    const locale = localRedux.getContext()
    const [data, setData] = useData(initValue)
    const handleChange = (name, value) => {
        setData({ [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let uData = { ...data }
        uData.channelIds = uData.channelIds.join(',')
        uData.controlChannelIds = uData.channelIds
        let res = await addDepartmentDetail(uData)
        if (res.success) {
            message.success('新增成功！')
            // history.goBack()
            history.push('/member/department')
            locale.dispatch.set({ version: Date.now(), departmentId: 0 })
        }
    }
    return <DepartmentLayout history={history} match={match}>
        <DepartmentAddOrEdit data={data} onSubmit={handleSubmit} onChange={handleChange} title={'新增部门'} />
    </DepartmentLayout>
}

export default DepartmentAdd