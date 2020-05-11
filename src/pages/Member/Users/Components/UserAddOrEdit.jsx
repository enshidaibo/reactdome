import React, { useState, useEffect } from 'react'
import { Form, Input, Radio, Button, TreeSelect, Select, Checkbox, Tabs, message, Icon } from 'antd';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TreeNode = TreeSelect.TreeNode;

const TabPane = Tabs.TabPane;

import { getDepartmentTree } from "@/services/department";
import { getRoleListBySiteId } from "@/services/roles";
import { useIsExitByPhone } from '@/services/uums'

import usersSchems from "@/schema/usersSchems";

import FormItem from '@/components/Form/FormItem';

const Tip = ({ children }) => {
    return <div style={{ color: '#888', fontSize: '12px' }}>{children}</div>
}

const initContentTree = data => {
    return data.map(d => {
        return (
            <TreeNode value={d.id} title={d.name} key={d.id}>
                {d.hasChild && initContentTree(d.child)}
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

const UserAddOrEdit = ({ data, onSubmit, onChange, onChangeData, isEdit = false, title }) => {
    const [departmentList, setDepartmentList] = useState([])
    useEffect(() => {
        const getData = async () => {
            let res = await getDepartmentTree()
            if (res.success) {
                // let list = [{ id: '', name: '无部门' }].concat(res.body)
                let list = res.body
                setDepartmentList(list)
            }
        }
        getData()
    }, [])
    const [roleList, setRoleList] = useState([])
    useEffect(() => {
        const getData = async () => {
            let res = await getRoleListBySiteId()
            if (res.success) {
                setRoleList(res.body)
            }
        }
        getData()
    }, [])
    const handleCheckUse = async () => {
        let res = await useIsExitByPhone(data.username)
        if (!res.success) {
            return
        }
        if (res.data != null) {
            let ndata = { useisexit: true }
            if (res.data.realName && !data.realname) {
                ndata.realname = res.data.realName
            }
            onChangeData(ndata)
        } else {
            message.error('用户手机号不存在！')
        }
    }
    const handleChangeUsername = e => {
        onChangeData({ username: e.target.value, useisexit: false })
    }
    const handleChangeRank = (e) => {
        let rank = e.target.value.replace(/[^0-9]/ig, "")
        onChangeData({ rank })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let rs = app.jsonschema(usersSchems, data);
        if (!rs.valid) {
            message.error(rs.errors[0].message);
            return false;
        }
        onSubmit()
    }
    return <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab={title} key="1">
            <Form onSubmit={handleSubmit}>
                <FormItem label="用户名" style={{ borderTop: 'none' }}>
                    <Input style={{ maxWidth: '400px', marginRight: '5px' }} value={data.username} onChange={handleChangeUsername} disabled={isEdit} />
                    {!isEdit && <Button onClick={handleCheckUse} type={data.useisexit && "primary"}>{data.useisexit ? <span><Icon type="check" /> 检测通过</span> : '检测用户名'}</Button>}
                </FormItem>
                <FormItem label="真实姓名">
                    <Input style={{ maxWidth: '400px' }} value={data.realname} onChange={(e) => onChange('realname', e.target.value)} />
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup value={data.gender} onChange={(e) => onChange('gender', e.target.value)}>
                        <Radio value={true}>男</Radio>
                        <Radio value={false}>女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="电子邮箱">
                    <Input style={{ maxWidth: '400px' }} value={data.email} onChange={(e) => onChange('email', e.target.value)} />
                </FormItem>
                <FormItem label="等级">
                    <Input style={{ maxWidth: '400px' }} value={data.rank} onChange={handleChangeRank} />
                </FormItem>
                <FormItem label="是否禁用">
                    <RadioGroup value={data.disabled} onChange={(e) => onChange('disabled', e.target.value)}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="受限管理员">
                    <RadioGroup value={data.selfAdmin} onChange={(e) => onChange('selfAdmin', e.target.value)}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                    <Tip>只能管理自己的数据</Tip>
                </FormItem>
                <FormItem label="角色">
                    <CheckboxGroup value={data.roleIds} onChange={value => onChange('roleIds', value)}>
                        {roleList.map(d => <Checkbox value={d.id} key={d.id}>{d.name}</Checkbox>)}
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="部门">
                    <TreeSelect
                        value={data.departmentId}
                        style={{ maxWidth: '400px' }}
                        showSearch
                        placeholder="选择部门"
                        treeDefaultExpandAll
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        filterTreeNode={handlefilterTreeNode}
                        onChange={value => onChange('departmentId', value)}
                    >
                        {initContentTree(departmentList)}
                    </TreeSelect>
                </FormItem>
                <FormItem label="数据权限">
                    <Checkbox checked={data.allChannels} onChange={e => onChange('allChannels', e.target.checked)}>所有栏目内容权限</Checkbox>
                    <Checkbox checked={data.allControlChannels} onChange={e => onChange('allControlChannels', e.target.checked)}>所有栏目控制权限</Checkbox>
                </FormItem>
                {isEdit && <FormItem label="注册时间">{data.registerTime}</FormItem>}
                {isEdit && <FormItem label="最后登录时间">{data.lastLoginTime}</FormItem>}
                {isEdit && <FormItem label="登录次数">{data.loginCount}</FormItem>}
                <FormItem>
                    <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        </TabPane>
    </Tabs>
}

export default UserAddOrEdit