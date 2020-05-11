import React, { useState, useEffect } from "react";
import { message } from "antd";
import ContentLayout, { RightContent } from '@/pages/A_Layout/ContentLayout';
import useData from '@/hooks/useData'

import Menubar from "./ContentIndex/Menubar/Menubar";
import HeaderBar from "./ContentIndex/HeaderBar/HeaderBar";
import TableList from "./ContentIndex/TableList/TableList";
import FooterBar from "./ContentIndex/FooterBar/FooterBar.tsx";
import { fetchList$, creatStates$, mergeState$ } from "./stream";
import localRedux from './localRedux'

import {
    getSiteUser,
    httpRecycle,
    httpCopy,
    httpPublic,
    httpReview,
    httpUnpigeonhole,
    httpPigeonhole,
    httpMove,
    httpCheck,
    httpReject,
    httpStatic,
    httpRecommend,
    httpPriority,
    httpDelete,
    httpCycleDelete,
    httpPush,
} from "@/services/content";

import { getWorkFlowByChannelId, postContentRefer } from "./service";

import { getChannelTree } from "@/services/channel";
import flattenChannels from './hooks/flattenChannels'
import getOpenkey from './hooks/getOpenkey';

const ContentList = ({ match }) => {
    let initValue = {
        list: [],
        totalCount: 0,
        loading: false,
        selectedRows: [],
        siteUser: [],
        workflow: [],
        workflowId: null,
        modelId: [
            { 'mname': '选择模型', 'mid': '' },
            { 'mname': '文章', 'mid': 0 },
            { 'mname': '组图', 'mid': 1 },
            { 'mname': '视频', 'mid': 2 },
            { 'mname': '音频', 'mid': 3 },
            { 'mname': '链接', 'mid': 4 },
            { 'mname': '专栏', 'mid': 5 },
            { 'mname': '政务公开', 'mid': 7 }]
    }
    const globalRedux = app.globalRedux.getContext()
    const { userInfo } = globalRedux.context
    const locale = localRedux.getContext()
    const { channel, flattenChannel, openKeys, query: querys } = locale.context
    initValue = { ...initValue, query: querys, userInfo }
    const [data, setData] = useData(initValue)
    let { list, selectedRows, totalCount, loading, siteUser, modelId, workflow, query } = data;
    const getWorkFlowDetailData = async () => {
        let res = await getWorkFlowByChannelId({ channelId: query.cid })
        if (res.success && res.body.roleList) {
            mergeState$.next({ workflow: res.body.roleList, workflowId: res.body.workFlowId })
        } else {
            mergeState$.next({ workflow: [], workflowId: null })
        }
    }
    const getSiteUsers = async () => {
        let res = await getSiteUser()
        if (res.success) {
            mergeState$.next({ siteUser: res.body })
        }
    }
    const getStorage = (event) => {
        if (event.key == 'reflushContentList') {
            fetchList$.next()
        }
    }
    useEffect(() => {
        getSiteUsers()
        window.addEventListener('storage', getStorage)
        const states$ = creatStates$(initValue)
        const subscription$ = states$.subscribe(state => {
            setData(state)
            locale.dispatch.set({ query: state.query })
        })
        return () => {
            window.removeEventListener('storage', getStorage)
            subscription$.unsubscribe()
        }
    }, [])
    useEffect(() => {
        if (query.cid > 0) {
            getWorkFlowDetailData()
        } else {
            mergeState$.next({ workflow: [], workflowId: null })
        }
    }, [query.cid])
    /**
     * 获取列表数据
     */
    const getListData = async (datas = {}) => {
        fetchList$.next(datas)
    };
    const httpRes = res => {
        if (res.success) {
            message.success("操作成功");
            fetchList$.next()
        }
    };

    const getIds = data => {
        let ids = data.map(d => d.id);
        return ids.join(",");
    };
    /**
     * 获取栏目数据
     */
    const getTree = async () => {
        let res = await getChannelTree({ singleModel: false });
        if (!res.success) {
            return;
        }
        let flattenChannel = flattenChannels(res.body);
        let { cid } = query
        let openKeys = getOpenkey(cid, flattenChannel)
        locale.dispatch.set({
            channel: res.body,
            flattenChannel,
            openKeys
        })
        fetchList$.next()
    };
    useEffect(() => { getTree() }, [])
    /**
     * 栏目展开
     */
    const handleOpenChange = openKeys => {
        locale.dispatch.set({ openKeys })
    };

    /**
     * 还原
     */
    const httpRecycles = async data => {
        let ids = getIds(data);
        let res = await httpRecycle({ ids });
        httpRes(res);
    };

    /**
     * 复制
     */
    const httpCopys = async (data, channels) => {
        let ids = getIds(data);
        let res = await httpCopy({ ids, channelId: channels.join(",") });
        httpRes(res);
    };

    /**
     * 发布
     */
    const httpPublics = async data => {
        let ids = getIds(data);
        let res = await httpPublic({ ids });
        httpRes(res);
    };

    /**
     * 送审
     */
    const httpReviews = async data => {
        let ids = getIds(data);
        let res = await httpReview({ ids });
        httpRes(res);
    };

    /**
     * 出档
     */
    const httpUnpigeonholes = async data => {
        let ids = getIds(data);
        let res = await httpUnpigeonhole({ ids });
        httpRes(res);
    };

    /**
     * 下线
     */
    const httpPigeonholes = async data => {
        let ids = getIds(data);
        let res = await httpPigeonhole({ ids });
        httpRes(res);
    };

    /**
     * 移动
     */
    const httpMoves = async (data, channels) => {
        let ids = getIds(data);
        let res = await httpMove({
            ids,
            channelId: channels.join(",")
        });
        httpRes(res);
    };

    /**
     * 引用
     */
    const httpRefer = async (data, channels) => {
        let ids = getIds(data);
        let res = await postContentRefer({
            ids,
            channelId: channels.join(",")
        });
        httpRes(res);
    };

    /**
     * 通过
     */
    const httpChecks = async data => {
        let ids = getIds(data);
        let res = await httpCheck({ ids });
        httpRes(res);
    };

    /**
     * 退回
     */
    const httpRejects = async (data, rejectOpinion) => {
        let ids = getIds(data);
        let res = await httpReject({
            ids,
            rejectOpinion: rejectOpinion || "无"
        });
        httpRes(res);
    };

    /**
     * 生成静态页面
     */
    const httpStatics = async data => {
        let ids = getIds(data);
        let res = await httpStatic({ ids });
        httpRes(res);
    };

    /**
     * 推荐/取消推荐
     */
    const httpRecommends = async (data, level = 0) => {
        let ids = getIds(data);
        let res = await httpRecommend({
            ids,
            level
        });
        httpRes(res);
    };

    /**
     * 置顶
     */
    const httpPrioritys = async data => {
        let ids = [];
        let topLevel = [];
        data.map(d => {
            ids.push(d.id);
            topLevel.push(d.topLevel);
        });
        let res = await httpPriority({
            ids: ids.join(","),
            topLevel: topLevel.join(",")
        });
        httpRes(res);
    };

    /**
     * 删除
     */
    const httpDeletes = async (data, cycle_delete = false) => {
        let ids = getIds(data);
        if (cycle_delete) {
            let res = await httpCycleDelete({ ids });
            httpRes(res);
        } else {
            let res = await httpDelete({ ids });
            httpRes(res);
        }
    };

    /**
     * 推送
     */
    const httpPushs = async (data, sectionId) => {
        let contentIds = getIds(data);
        let res = await httpPush({
            contentIds,
            sectionId: sectionId.join(",")
        });
        httpRes(res);
    };
    const action = {
        getListData: getListData,
        httpRecycle: httpRecycles, //还原
        httpCopy: httpCopys, //复制
        httpPublic: httpPublics, //发布
        httpUnpigeonhole: httpUnpigeonholes, //出档
        httpPigeonhole: httpPigeonholes, //下线
        httpMove: httpMoves, //移动
        httpCheck: httpChecks, //通过
        httpReject: httpRejects, //退回
        httpStatic: httpStatics, //生成静态页面
        httpRecommend: httpRecommends, //推荐/取消推荐
        httpPriority: httpPrioritys, //置顶
        httpDelete: httpDeletes, //删除
        httpReview: httpReviews, //送审
        httpPush: httpPushs, //推送
        httpRefer, //引用
    };
    return (
        <ContentLayout>
            <Menubar
                onOpenChange={handleOpenChange}
                openKeys={openKeys}
                channel={channel}
                flattenChannel={flattenChannel}
                selectedKeys={[String(query.cid)]}
                query={query}
            />
            <RightContent>
                <HeaderBar
                    query={query}
                    match={match}
                    siteUser={siteUser}
                    modelId={modelId}
                    workflow={workflow}
                />
                <TableList
                    list={list}
                    selectedRows={selectedRows}
                    query={query}
                    channel={channel}
                    totalCount={totalCount}
                    action={action}
                    match={match}
                    loading={loading}
                    workflow={workflow}
                />
                <FooterBar channel={channel} selectedRows={selectedRows} query={query} action={action} />
            </RightContent>
        </ContentLayout>
    );
}

export default ContentList