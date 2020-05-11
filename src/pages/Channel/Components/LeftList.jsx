import React, { useState, useEffect } from "react";
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

import { LeftContent } from '@/pages/A_Layout/ContentLayout';
import { getChannelTree } from "@/services/channel";
import localRedux from '../localRedux'

const flattenData = (data, parentId = 0) => {
    return data.reduce((arr, { child = [], ...rest }) => {
        return arr.concat([{ ...rest, parentId }], flattenData(child, rest.id));
    }, []);
};

const LeftList = ({ history, match }) => {
    const locale = localRedux.getContext()
    const { list, flattenList, channelId, version } = locale.context
    const initHistory = (channelId = channelId) => {
        let channel = flattenList.find(d => {
            return d.id == channelId
        })
        if (channel && !channel.hasChild) {
            history.replace(`${match.url}/${channelId}`)
        } else {
            history.replace(`${match.url}`)
        }
        if (!channel) {
            locale.dispatch.set({ channelId: '0' })
        }
    }
    useEffect(() => {
        const getData = async () => {
            let res = await getChannelTree({ singleModel: true });
            if (res.success) {
                let flattenList = flattenData(res.body)
                locale.dispatch.set({
                    list: res.body,
                    flattenList
                })
            }
        }
        getData()
    }, [version])
    useEffect(() => { initHistory(channelId) }, [])
    const handleSelect = (selectedKeys, info) => {
        const channelId = info.node.props.eventKey
        locale.dispatch.set({ channelId })
        setTimeout(() => {
            initHistory(channelId)
        }, 1);
    }
    const renderTreeNode = (list = []) => {
        return list.map(d => {
            return <TreeNode title={d.name} key={d.id}>
                {d.hasChild && renderTreeNode(d.child)}
            </TreeNode>
        })
    }
    return <LeftContent style={{ padding: '10px 15px' }}>
        <Tree
            showLine
            selectedKeys={[String(channelId)]}
            defaultExpandedKeys={['0']}
            onSelect={handleSelect}
        >
            <TreeNode title="根目录" key={0}>
                {renderTreeNode(list)}
            </TreeNode>
        </Tree>
    </LeftContent>
}

export default LeftList