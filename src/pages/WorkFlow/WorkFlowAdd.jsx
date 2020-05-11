import React from 'react'
import { message } from 'antd';
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import AddOrEdit from './Components/AddOrEdit';

import useData from '@/hooks/useData';
import { saveWorkFlowDetail } from './services';

const Edit = ({ history, match }) => {
    const [data, setData] = useData({ name: '', nodes: [], priority: 1 })
    const handleChange = data => {
        setData(data)
    }
    const handleSubmit = async ({ data }) => {
        let { nodes, ...rest } = data
        let roleIds = nodes.map(d => {
            return d.roleId
        }).join(',')
        let countersigns = nodes.map(d => {
            return d.countersign
        }).join(',')
        let res = await saveWorkFlowDetail({ ...rest, roleIds, countersigns })
        if (res.success) {
            message.success('新增成功！')
            history.replace('/workflow')
        }
    }
    return <RightContent>
        <AddOrEdit data={data} onChange={handleChange} onSubmit={handleSubmit}></AddOrEdit>
    </RightContent>
}
export default Edit