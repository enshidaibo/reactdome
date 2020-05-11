import React, { useContext } from 'react'
import { Tabs, message } from 'antd';
const TabPane = Tabs.TabPane;
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import RoleDetailDetail from './Components/RoleDetailDetail'
import { addRoleDetail } from '@/services/roles';
import useData from '@/hooks/useData'

import localRedux from './localRedux'

let initPerms = ["dashboard.home"]
const RolesAdd = ({ history, match }) => {
    const locale = localRedux.getContext()
    const [data, setData] = useData({ all: false, perms: initPerms, priority: 10, level: 10 })
    const handleChange = (name, value) => {
        setData({ [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let udata = { ...data }
        udata.perms = data.perms.join(',')
        let res = await addRoleDetail(udata)
        if (res.success) {
            message.success('新增成功！')
            history.replace('/member/roles/' + res.body.id)
            locale.dispatch.set({ version: Date.now() })
        }
    }
    return <RightContent style={{ padding: '0 25px 25px' }}>
        <Tabs defaultActiveKey="1" animated={false}>
            <TabPane tab="新增角色" key="1" style={{ padding: '0 0 25px' }}>
                <RoleDetailDetail data={data} onSubmit={handleSubmit} onChange={handleChange} />
            </TabPane>
        </Tabs>
    </RightContent>
}

export default RolesAdd