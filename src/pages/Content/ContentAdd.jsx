import React, { useState, useEffect } from "react";
import { message } from "antd";
import { httpContentAdd, httpGoverDocAdd } from "@/services/content";
import { contributeView, contributePublish } from "@/services/contribute";
import getHashQuery from '@/utils/getHashQuery';
import useData from '@/hooks/useData';
const asyncComponents = app.asyncComponents
const Edit = asyncComponents(() => import("./Components/Edit"));
const Specialty = asyncComponents(() => import("./Components/Specialty"));

const ContentAdd = ({ history }) => {
    const locale = app.globalRedux.getContext()
    const { userInfo } = locale.context
    let { modelId = 0, cid, contributeid } = getHashQuery();
    cid = cid * 1;
    let channelIds = cid ? [cid] : []
    let initValue = {
        channelIds,
        modelId
    }
    const [loading, setLoading] = useState(true)
    const [state, setState] = useData(initValue)
    useEffect(() => {
        locale.dispatch.set({ menufold: true });
        if (contributeid) {
            contributeView({
                id: contributeid,
                userName: userInfo.username,
                isLockBy: true,
                token: sessionStorage.token,
                siteId: localStorages.getItem("_site_id_param")
            }).then(res => {
                if (res.success) {
                    let data = res.body
                    setState({
                        title: data.title,
                        author: data.createBy,
                        txt: data.content,
                        contributeid: contributeid
                    })
                    setLoading(false)
                }
            })
        } else {
            setLoading(false)
        }
    }, [])
    const httpCms = data => httpContentAdd(data)
        .then(res => {
            if (res.success) {
                message.success("新增成功");
                localStorage.setItem('reflushContentList', Date.now());
                window.close()
                // history.replace('/content');
            }
            return res
        })
    const httpGoverDoc = data => httpGoverDocAdd(data)
        .then(res => {
            if (res.success) {
                message.success("新增成功");
                localStorage.setItem('reflushContentList', Date.now());
                window.close()
                // history.replace('/content');
            }
            return res
        })
    const httpTg = data => {
        data = {
            userName: userInfo.username,
            realName: userInfo.realname,
            token: sessionStorage.token,
            siteId: localStorages.getItem("_site_id_param"),
            reportId: contributeid,
            ...data
        }
        return contributePublish(data).then(res => {
            if (res.success) {
                message.success("发布成功");
                history.replace('/contribute/editing');
            }
            return res
        })
    }
    const handleSubmit = data => {
        if (contributeid) {
            return httpTg(data)
        } else if (data.modelId == 7) {
            return httpGoverDoc(data);
        } else {
            return httpCms(data)
        }
    }
    if (loading) {
        return null
    }
    return modelId == 5 ? <Specialty action="add" channelIds={channelIds} />
        : <Edit form={state} onSubmit={handleSubmit} />
}
export default ContentAdd