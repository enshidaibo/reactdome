import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Button, TreeSelect, Tree, Tabs } from 'antd';
const TreeNode = TreeSelect.TreeNode;
const TabPane = Tabs.TabPane;

import FormItem from '@/components/Form/FormItem';
import localRedux from '../localRedux'

import { getChannelTree } from "@/services/channel";

const initContentTree = (data, disabledid, parentdisabledid = false) => {
    return data.map(d => {
        let dis = parentdisabledid == true ? true : disabledid == d.id
        return (
            <TreeNode disabled={dis} value={d.id} title={d.name} key={d.id}>
                {d.hasChild && initContentTree(d.child, disabledid, dis)}
            </TreeNode>
        );
    });
};

const handlefilterTreeNode = (value, item) => {
    if (item.props.title.indexOf(value) > -1) {
        return true
    }
    return false
}

const renderTreeNode = (list) => {
    return list.map(d => {
        return <Tree.TreeNode title={d.name} key={d.id}>
            {d.child && renderTreeNode(d.child)}
        </Tree.TreeNode>
    })
}

const DepartmentAddOrEdit = ({ data, onSubmit, onChange, title }) => {
    const locale = localRedux.getContext()
    let { list } = locale.context
    const [channel, setChannel] = useState([])
    useEffect(() => {
        const getData = async () => {
            let res = await getChannelTree()
            if (res.success) {
                setChannel(res.body)
            }
        }
        getData()
    }, [])
    list = [{ id: '', name: '根目录' }].concat(list)
    return <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab={title} key="1">
            <Form onSubmit={onSubmit}>
                <FormItem label="上级部门" style={{ borderTop: 'none' }}>
                    <TreeSelect
                        value={data.pid}
                        style={{ maxWidth: '400px' }}
                        showSearch
                        allowClear
                        placeholder="请选择上级部门"
                        treeDefaultExpandAll
                        filterTreeNode={handlefilterTreeNode}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        onChange={value => onChange('pid', value)}
                    >
                        {initContentTree(list, data.id)}
                    </TreeSelect>
                </FormItem>
                <FormItem label="部门名称">
                    <Input style={{ maxWidth: '400px' }} value={data.name} onChange={(e) => onChange('name', e.target.value)} placeholder='请输入部门名称' />
                </FormItem>
                <FormItem label="排序">
                    <Input style={{ maxWidth: '400px' }} defaultValue={data.priority} onChange={(e) => onChange('priority', e.target.value)} />
                </FormItem>
                <FormItem label="栏目权限">
                    {channel.length > 0 && <Tree
                        checkable
                        showLine
                        checkedKeys={data.channelIds}
                        selectedKeys={[]}
                        onCheck={(checkedKeys) => onChange('channelIds', checkedKeys)}
                    >
                        {renderTreeNode(channel)}
                    </Tree>}
                </FormItem>
                {/* <FormItem label="栏目控制权限">
                    {channel.length > 0 && <Tree
                        checkable
                        showLine
                        checkedKeys={data.controlChannelIds}
                        selectedKeys={[]}
                        onCheck={(checkedKeys) => onChange('controlChannelIds', checkedKeys)}
                    >
                        {renderTreeNode(channel)}
                    </Tree>}
                </FormItem> */}
                <FormItem>
                    <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        </TabPane>
    </Tabs>
}


export default DepartmentAddOrEdit