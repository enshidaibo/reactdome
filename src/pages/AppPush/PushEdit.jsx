import React, { useState, useEffect } from "react";
import { message } from "antd";
import { getPushDetail, getPushItemDetail, updatePushContent } from "./services";
import PushAddOrEdit from './Components/PushAddOrEdit'

const PushEdit = ({ history, match }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const getDetail = async () => {
        let res = await getPushDetail({ id: match.params.id })
        return res
    }
    const getItemDetail = async (id) => {
        let res = await getPushItemDetail({ id })
        return res
    }
    useEffect(() => {
        const getData = async () => {
            let res = await getDetail()
            if (!res.success) {
                return
            }
            let resd = await getItemDetail(res.body.contentId)
            // let resd = await getItemDetail(dat.id)
            if (resd.success) {
                setData({ ...res.body, item: resd.body })
            }
        }
        getData()
    }, [])
    const handleSubmit = async data => {
        let { title, description, dest, item, timing, id } = data
        setLoading(true)
        let res = await updatePushContent({ id, title, description, dest, contentId: item.id, timing });
        if (res.success) {
            message.success("保存成功！");
            history.replace(`/apppush/timing`)
        }
        setLoading(false)
    };
    return data ? <PushAddOrEdit onSubmit={handleSubmit} loading={loading} btnTitle={"保存"} initValue={data} /> : null
}
export default PushEdit