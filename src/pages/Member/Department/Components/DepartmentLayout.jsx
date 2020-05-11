import React, { useState, useEffect, useContext } from 'react'
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import ContentLayout, { LeftContent, RightContent } from '@/pages/A_Layout/ContentLayout';
import { getDepartmentTree } from "@/services/department";
import localRedux from '../localRedux'


const flattenData = (data, parentId = 0) => {
    return data.reduce((arr, { id, child = [], ...rest }) => {
        return arr.concat([{ ...rest, id, child, parentId }], flattenData(child, id));
    }, []);
};
const RolesLayout = ({ children, history, match }) => {
    const locale = localRedux.getContext()
    const { context, dispatch, toJSON } = locale
    let { departmentId, list, version } = context
    useEffect(() => {
        const getData = async () => {
            let res = await getDepartmentTree()
            if (res.success) {
                let flattenList = flattenData(res.body)
                dispatch.set({ list: res.body, flattenList })
            }
        }
        getData()
    }, [version])
    const handleSelect = (selectedKeys, info) => {
        const departmentId = info.node.props.eventKey
        dispatch.set({ departmentId })
        setTimeout(() => {
            history.replace(`/member/department`)
        }, 1);
    }
    const renderTreeNode = (list = []) => {
        return list.map(d => {
            return <TreeNode title={d.name} key={d.id}>
                {d.hasChild && renderTreeNode(d.child)}
            </TreeNode>
        })
    }
    return (
        <ContentLayout>
            <LeftContent style={{ padding: '10px 15px' }}>
                {list.length > 0 && <Tree
                    showLine
                    selectedKeys={[String(departmentId)]}
                    defaultExpandAll
                    onSelect={handleSelect}
                >
                    <TreeNode title="根目录" key={0}>
                        {renderTreeNode(list)}
                    </TreeNode>
                </Tree>}
            </LeftContent>
            <RightContent style={{ padding: '0 15px' }}>
                {children}
            </RightContent>
        </ContentLayout>
    )
}

export default RolesLayout