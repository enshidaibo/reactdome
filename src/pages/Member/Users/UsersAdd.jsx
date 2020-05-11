import React, { useState, useEffect } from 'react'
import { message } from "antd";
import { addUserDetail } from "@/services/users";
import UsersLayout from './Components/UsersLayout'
import UserAddOrEdit from './Components/UserAddOrEdit'
import useData from '@/hooks/useData'

const UsersAdd = ({ history, match }) => {
    const initValue = {
        birthday: '',
        passwordMinLen: 3,
        gender: true,
        thirdAccount: false,
        groupId: 1,
        // rank: 1,
        disabled: false,
        username: '',
        realname: '',
        steps: 1,
        selfAdmin: false,
        roleIds: [],
        useisexit: false,
        allChannels: true,
        allControlChannels: true,
    }
    const [data, setData] = useData(initValue, [])
    const handleChange = (name, value) => {
        setData({ [name]: value })
    }
    const handleChangeData = (newData) => {
        let ndata = { ...data, ...newData }
        setData(ndata)
    }
    const handleSubmit = async () => {
        if (!data.useisexit) {
            return message.error('请先检测用户手机号是否存在！')
        }
        let uData = {
            ...data
        }
        uData.roleIds = uData.roleIds.join(',')
        let res = await addUserDetail(uData)
        if (res.success) {
            message.success('新增成功！')
            history.goBack()
        }
    }
    return <UsersLayout history={history} match={match}>
        <UserAddOrEdit data={data} onSubmit={handleSubmit} onChange={handleChange} onChangeData={handleChangeData} title={'新增人员'} />
    </UsersLayout>
}

export default UsersAdd