import React, { useState, useEffect } from "react";
import { message } from "antd";
import { getContentDetail, httpContentUpdate, httpGoverDocUpdate } from "@/services/content";
const asyncComponents = app.asyncComponents
const Edit = asyncComponents(() => import("./Components/Edit"));
const Specialty = asyncComponents(() => import("./Components/Specialty"));

const ContentEdit = ({ match, history }) => {
    const locale = app.globalRedux.getContext()
    const [form, setForm] = useState(null)
    const getData = async () => {
        let res = await getContentDetail({
            id: match.params.id
        });
        if (res.success) {
            let form = res.body;
            form.mode = form.mode * 1;
            form.channelIds = form.channelIds.filter(d => d != 0)
            let arr = form.reads ? form.reads.map(d => {
                let t = {
                    id: d.id,
                    title: d.name
                }
                return t;
            }) : [];
            form.reads = arr;
            setForm(form);
        }
    }
    useEffect(() => {
        locale.dispatch.set({ menufold: true });
        getData()
    }, [])
    const handleSubmit = data => {
        let httpUpdate = data.modelId == 7 ? httpGoverDocUpdate : httpContentUpdate
        return httpUpdate(data).then(res => {
            if (res.success) {
                message.info("保存成功");
                localStorage.setItem('reflushContentList', Date.now());
                window.close()
                // history.replace(`/content`);
            }
            return res
        })
    };
    if (!form) {
        return null;
    }
    let { modelId } = form;
    return modelId == 5
        ? <Specialty isProps={true} form={form} action="edit" />
        : <Edit isProps={true} form={form} onSubmit={handleSubmit} />

}

export default ContentEdit