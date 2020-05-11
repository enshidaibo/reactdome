import React, { useEffect, useState } from 'react'
import { Input, Radio, Button } from 'antd'
const RadioGroup = Radio.Group;

import FormItem from '@/components/Form/FormItem';
import RoleDetailPermission from './RoleDetailPermission';

const RoleDetailDetail = ({ data, onChange, onSubmit }) => {
    return <form onSubmit={onSubmit}>
        <FormItem label='角色名' style={{ borderTop: 'none' }}>
            <Input style={{ maxWidth: '400px' }} value={data.name} onChange={(e) => onChange('name', e.target.value)} placeholder='请输入角色名' />
        </FormItem>
        <FormItem label='等级'>
            <Input style={{ maxWidth: '400px' }} value={data.level} onChange={(e) => onChange('level', e.target.value)} />
        </FormItem>
        <FormItem label='排序'>
            <Input style={{ maxWidth: '400px' }} value={data.priority} onChange={(e) => onChange('priority', e.target.value)} />
        </FormItem>
        <FormItem label="拥有所有权限">
            <RadioGroup value={data.all} disabled={true} onChange={(e) => onChange('all', e.target.value)}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
            </RadioGroup>
        </FormItem>
        {!data.all && <FormItem label='权限列表'>
            <RoleDetailPermission value={data.perms} onChange={(value) => onChange('perms', value)} />
        </FormItem>}
        <FormItem>
            <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
    </form>
}

export default RoleDetailDetail