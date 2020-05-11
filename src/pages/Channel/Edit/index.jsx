import React, { useEffect } from 'react'
import { Form, Input, Radio, Button, Tabs, message } from 'antd';
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
import { createChannelPath } from "@/services/channel";
import { modelTag } from '@/config/mark.config';

import FormItem from '@/components/Form/FormItem';
import TreeSelectChannel from './TreeSelectChannel';
import TitleImg from './TitleImg';
import SelectITpl from './SelectITpl'
import SelectlWorkFlow from './SelectlWorkFlow';
const SlateEditer = app.asyncComponent('SlateEditer')
import channelSchems from "@/schema/channelSchems";
const rsvidile = app.jsonschema(channelSchems);

const EditIndex = ({ detail = {}, handleChange, handleChangeState, handleSubmit, title, isEdit = false }) => {
    const handleChangeName = (e) => {
        // if (e.target instanceof HTMLInputElement && !isOnComposition) {
        //     props.onChange(e)
        //   }
        let value = e.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\w]/g, '')
        handleChange('name', e.target.value)
    }
    const onBlur = (e) => {
        if (!e.target.value.length > 0 || isEdit) {
            return
        }
        createChannelPath({ name: e.target.value }).then(res => {
            if (res.success) {
                handleChange('path', res.body)
            }
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        let rs = rsvidile(detail);
        if (!rs.valid) {
            message.error(rs.errors[0].message);
            return false;
        }
        handleSubmit()
    }
    // const handleKeyUp = (e) => {
    //     // console.log(e);
    //     console.log(e.target.value.match(/\d+(\.\d{0,2})?/));
    //     e.target.value = e.target.value.match(/\d+(\.\d{0,2})?/) ? e.target.value.match(/\d+(\.\d{0,2})?/)[0] : 0
    // }
    return (<Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab={title} key="1">
            <Form onSubmit={onSubmit} >
                <FormItem label="模型" style={{ borderTop: 'none' }}>
                    <RadioGroup value={detail.modelId == modelTag.singlepage} disabled>
                        <Radio value={false}>栏目</Radio>
                        <Radio value={true}>单页</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="上级栏目" >
                    <TreeSelectChannel name='parentId' disabledid={detail.id} value={detail.parentId} onChange={handleChange} />
                </FormItem>
                <FormItem label="栏目名称">
                    <Input style={{ maxWidth: '400px' }} maxLength={100} value={detail.name} onChange={handleChangeName}
                        onBlur={onBlur} />
                </FormItem>
                <FormItem label="访问路径">
                    <Input style={{ maxWidth: '400px' }} maxLength={20} value={detail.path} onChange={(e) => handleChange('path', e.target.value)} />
                </FormItem>
                <FormItem label="meta标题">
                    <Input value={detail.title} onChange={(e) => handleChange('title', e.target.value)} />
                </FormItem>
                <FormItem label="meta关键字">
                    <Input value={detail.keywords} onChange={(e) => handleChange('keywords', e.target.value)} />
                </FormItem>
                <FormItem label="meta描述">
                    <TextArea value={detail.description} autosize={{ minRows: 2, maxRows: 6 }} onChange={(e) => handleChange('description', e.target.value)} />
                </FormItem>
                <FormItem label="标题图">
                    <TitleImg value={detail.titleImg} onChange={handleChange} />
                </FormItem>
                <SelectITpl detail={detail} onChange={handleChange} handleChangeState={handleChangeState} />
                <FormItem label="排列顺序">
                    <Input style={{ maxWidth: '400px' }} type='number' min={0} max={999999} value={detail.priority} onChange={(e) => handleChange('priority', parseInt(e.target.value) || 0)} />
                </FormItem>
                <FormItem label="是否显示">
                    <RadioGroup value={detail.display} onChange={(e) => handleChange('display', e.target.value)}>
                        <Radio value={true}>显示</Radio>
                        <Radio value={false}>隐藏</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否共享">
                    <RadioGroup value={detail.allowShare} onChange={(e) => handleChange('allowShare', e.target.value)}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否接收上级站点推送内容">
                    <RadioGroup value={detail.acceptContent} onChange={(e) => handleChange('acceptContent', e.target.value)}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="栏目静态化">
                    <RadioGroup value={detail.staticChannel} onChange={(e) => handleChange('staticChannel', e.target.value)}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="内容静态化">
                    <RadioGroup value={detail.staticContent} onChange={(e) => handleChange('staticContent', e.target.value)}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
                {modelTag.article == detail.modelId && <FormItem label="分页条数">
                    <Input style={{ maxWidth: '400px' }} type='number' min={0} max={999999} value={detail.pageSize} onChange={(e) => handleChange('pageSize', parseInt(e.target.value) || 0)} />
                </FormItem>}
                {modelTag.article == detail.modelId &&
                    <FormItem label="工作流" >
                        <SelectlWorkFlow name='workflowId' disabledid={detail.workflowId} value={detail.workflowId} onChange={handleChange} />
                    </FormItem>
                }
                {modelTag.singlepage == detail.modelId &&
                    <FormItem label="内容">
                        <SlateEditer scroll='channelDetail' value={detail.txt} onChange={html => handleChange('txt', html)} />
                    </FormItem>
                }
                <FormItem>
                    <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        </TabPane>
    </Tabs>
    )
}

export default EditIndex