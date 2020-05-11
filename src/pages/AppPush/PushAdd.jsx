import React, { useState } from "react";
import { message } from "antd";
import { addPushContent } from "./services";
import PushAddOrEdit from './Components/PushAddOrEdit'

const PushAdd = ({ history }) => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = async data => {
        let { title, description, dest, item, timing } = data
        setLoading(true)
        let res = await addPushContent({ title, description, dest, contentId: item.id, timing });
        if (res.success) {
            message.success("保存成功！");
            history.replace(`/apppush/list`)
        }
        setLoading(false)
    };
    return <PushAddOrEdit onSubmit={handleSubmit} loading={loading} />
}
export default PushAdd