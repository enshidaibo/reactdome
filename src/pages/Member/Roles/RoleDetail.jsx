import React, { useState, useEffect, useContext } from 'react'
import { Tabs, message } from 'antd';
const TabPane = Tabs.TabPane;
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import { getRoleDetail, updateRoleDetail } from '@/services/roles';
import useData from '@/hooks/useData'

import styles from './styles.scss';
import RoleDetailDetail from './Components/RoleDetailDetail'
import RoleDetailMenber from './Components/RoleDetailMenber'
import localRedux from './localRedux'

const RoleDetail = ({ match }) => {
    const locale = localRedux.getContext()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useData({ all: true })
    let { id } = match.params
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            let res = await getRoleDetail({ id })
            setLoading(false)
            if (res.success) {
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
        e.stopPropagation();
        let udata = { ...data }
        udata.perms = data.perms.join(',')
        let res = await updateRoleDetail(udata)
        if (res.success) {
            message.success('更新成功！')
            locale.dispatch.set({ version: Date.now() })
        }
    }
    return <RightContent style={{ padding: '0 25px 25px' }}>
        <Tabs defaultActiveKey="1" animated={false} className={styles.tabs}>
            <TabPane tab="角色信息" key="1" style={{ padding: '0 0 25px' }}>
                <RoleDetailDetail data={data} onSubmit={handleSubmit} onChange={handleChange} />
            </TabPane>
            <TabPane tab="角色成员" key="2" style={{ padding: '0 0 25px' }}>
                <RoleDetailMenber id={match.params.id} />
            </TabPane>
        </Tabs>
    </RightContent>
}

export default RoleDetail