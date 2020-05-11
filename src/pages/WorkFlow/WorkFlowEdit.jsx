import React, { useEffect } from 'react'
import { message } from 'antd';
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import useData from '@/hooks/useData';
import AddOrEdit from './Components/AddOrEdit';
import { getWorkFlowDetail, updateWorkFlowDetail } from './services';

const Edit = ({ history, match }) => {
    const [data, setData] = useData(null)
    useEffect(() => {
        const getDataDetail = async () => {
            let res = await getWorkFlowDetail({ id: match.params.id })
            if (res.success) {
                setData(res.body)
            }
        }
        getDataDetail()
    }, [])
    const handleChange = data => {
        setData(data)
    }
    const handleSubmit = async ({ data }) => {
        let { nodes, id, name, description, priority, disabled, cross } = data
        let roleIds = nodes.map(d => {
            return d.roleId
        }).join(',')
        let countersigns = nodes.map(d => {
            return d.countersign
        }).join(',')
        let res = await updateWorkFlowDetail({ id, name, description, priority, disabled, cross, roleIds, countersigns })
        if (res.success) {
            message.success('保存成功！')
            history.replace('/workflow')
        }
    }
    return <RightContent>
        {data && <AddOrEdit data={data} onChange={handleChange} onSubmit={handleSubmit}></AddOrEdit>}
    </RightContent>
}
export default Edit