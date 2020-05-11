import React, { useState, useEffect } from 'react';
import SubjectAddOrEdit from './SubjectAddOrEdit'
import { getSubjectDetail, upDateSubjectDetail } from './services';
import { message } from 'antd';

const SubjectEdit = ({ history, match }) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const getData = async () => {
            let res = await getSubjectDetail({ subejctId: match.params.id })
            if (res.success) {
                let data = res.body
                data.struct = JSON.parse(data.struct)
                data.platesObject = JSON.parse(data.content)
                setData(data)
            }
        }
        getData()
    }, [])
    const handleSubmit = async (data) => {
        let { name, struct, subejctId, siteId, tplKey, platesObject } = data
        let content = {}
        struct.map(d => {
            content[d.name] = platesObject[d.name]
        })
        let res = await upDateSubjectDetail({ name, struct, subejctId, siteId, tplKey, content: JSON.stringify(content) })
        if (res.success) {
            message.success('保存成功！')
            history.replace('/subject')
        }
    }
    return data ? <SubjectAddOrEdit data={data} onSubmit={handleSubmit}></SubjectAddOrEdit> : null
}

export default SubjectEdit
