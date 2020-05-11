import React, { useEffect } from 'react'
import { getUserLocalDetail, updateUserDetail } from "@/services/users";
import useData from '@/hooks/useData'

import UsersLayout from './Components/UsersLayout'
import UserAddOrEdit from './Components/UserAddOrEdit'
import { message } from "antd";

const UsersDetail = ({ history, match }) => {
    const [data, setData] = useData({})
    const { id } = match.params
    useEffect(() => {
        const getData = async () => {
            let res = await getUserLocalDetail({ id })
            if (res.success) {
                let userDetail = res.body
                userDetail.allChannels = userDetail.allChannels[0]
                userDetail.allControlChannels = userDetail.allControlChannels[0]
                userDetail.steps = userDetail.steps[0]
                userDetail.departmentId = userDetail.departmentIds[userDetail.departmentIds.length - 1]
                setData(userDetail)
            }
        }
        getData()
    }, [id])
    const handleChange = (name, value) => {
        setData({ [name]: value })
    }
    const handleSubmit = async () => {
        let uData = {
            ...data,
            groupId: 1,
        }
        uData.roleIds = uData.roleIds.join(',')
        let res = await updateUserDetail(uData)
        if (res.success) {
            message.success('保存成功！')
            history.goBack()
        }
    }
    return <UsersLayout history={history} match={match}>
        <UserAddOrEdit data={data} id={id} isEdit={true} onSubmit={handleSubmit} onChange={handleChange} title={'人员详情'} />
    </UsersLayout>
}

export default UsersDetail