import React, { useState, useEffect, useContext } from 'react'
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import ContentLayout, { LeftContent, RightContent } from '@/pages/A_Layout/ContentLayout';
import { getDepartmentTree } from "@/services/department";
import localRedux from '../localRedux'

const UsersLayout = ({ children, history, match }) => {
    const locale = useContext(localRedux.context);
    const { context, dispatch } = locale
    useEffect(() => {
        const getData = async () => {
            let res = await getDepartmentTree()
            if (res.success) {
                dispatch.setIn(['list'], res.body)
            }
        }
        getData()
    }, [])
    const handleSelect = (selectedKeys, info) => {
        const eventKey = info.node.props.eventKey
        dispatch.set({ departmentId: eventKey, tableversion: Date.now() })
        if (match.url != '/member/users') {
            setTimeout(() => {
                history.push('/member/users')
            }, 1);
        }
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
                <Tree
                    showLine
                    selectedKeys={[String(context.departmentId)]}
                    // defaultExpandAll
                    defaultExpandedKeys={['0']}
                    onSelect={handleSelect}
                >
                    <TreeNode title="根目录" key={0}>
                        {renderTreeNode(context.list)}
                    </TreeNode>
                </Tree>
            </LeftContent>
            <RightContent style={{ padding: '0 15px' }}>
                {children}
            </RightContent>
        </ContentLayout>
    )
}

export default UsersLayout