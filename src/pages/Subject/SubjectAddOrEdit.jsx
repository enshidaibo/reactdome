import React, { useState, useEffect } from 'react';
import immutable from 'seamless-immutable';
import { Form, Input, Button, Select, message } from 'antd';
import { ContentInline, LeftContent, RightContent } from '@/pages/A_Layout/ContentLayout';
import FormItem from '@/components/Form/FormItem';
import Cpts from './Components';
import templates from './Templates';
const Option = Select.Option;
import Preview from './Preview'

const SubjectAdd = ({ data, onSubmit }) => {
    const [state, setState] = useState(immutable(data))
    let { tplKey, platesObject } = state
    const handleChangeTemp = (tplKey) => {
        let template = templates.find(d => {
            return d.key == tplKey
        })
        let templateKd = {}
        template.struct.map(d => {
            templateKd[d.name] = d.defaultValue
        })
        platesObject = { ...templateKd, ...platesObject }
        let states = state.merge({ tplKey, platesObject, struct: template.struct })
        setState(states)
    }
    useEffect(() => {
        handleChangeTemp(tplKey)
    }, [])
    const handleChangeName = e => {
        let newState = state.set('name', e.target.value)
        setState(newState)
    }
    const handleChange = (data) => {
        let platesObject = state.platesObject.merge(data)
        let states = state.set('platesObject', platesObject)
        setState(states)
    }
    const handleSubmit = () => {
        onSubmit(state)
    }
    let template = templates.find(d => {
        return d.key == tplKey
    })
    return <ContentInline>
        <RightContent>
            <Form >
                <FormItem label="专题名称" style={{ borderTop: 'none' }}>
                    <Input value={state.name} onChange={handleChangeName} />
                </FormItem>
                <FormItem label="专题模板">
                    <Select
                        placeholder="请选择"
                        showArrow={true}
                        showSearch
                        value={state.tplKey}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: "100%" }}
                        onChange={handleChangeTemp}
                    >
                        {templates.map(d => <Option key={d.key} value={d.key}>{d.name}</Option>)}
                    </Select>
                </FormItem>
                {template.struct.map(d => {
                    let Cpt = Cpts[d.type]
                    if (!Cpt) {
                        return null
                    }
                    return <FormItem label={d.title} key={d.name}>
                        <Cpt {...d} value={platesObject[d.name]} onChange={handleChange} />
                    </FormItem>
                })}
                <FormItem>
                    <Button type="primary" onClick={handleSubmit}>保存</Button>
                </FormItem>
            </Form>
        </RightContent>
        <LeftContent style={{ width: '400px' }}>
            <Preview template={template} platesObject={platesObject}></Preview>
        </LeftContent>
    </ContentInline>
}

export default SubjectAdd