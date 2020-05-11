import React, { useEffect } from 'react'
import { Form, Button } from "antd";
import ajv, { toErrorSchema } from "./ajv";
import useData from './hooks/useData';
import { getDefaultFormState } from "./utils/getDefaultFormState";
import deepEquals from './utils/deepEquals';
import getWidgets from './utils/getWidgets'
import Cpts, { FormItem } from './components';

const index = ({ schema, data: _data, customFields = {}, version, onChange, onSubmit, onError, uiSchems = {}, formLayout = {}, noValidate = true, children }) => {
    let widgets = getWidgets(customFields)
    let initValue = getDefaultFormState(schema, _data)
    const [data, setData] = useData(initValue)
    const [state, setState] = useData({ errors: {}, changeData: {} })
    let { errors, changeData } = state
    const validateData = (data) => {
        let validate = ajv.compile(schema);
        let res = validate(data)
        let errors = {}
        if (!res) {
            errors = toErrorSchema(validate.errors)
        }
        return { res, errors, data }
    }
    useEffect(() => {
        let data = getDefaultFormState(schema, _data)
        if (!deepEquals(data, _data)) {
            onChange && onChange(data)
        }
        let { errors } = validateData(data)
        setState({ errors })
        setData(data)
        onError && onError(errors)
    }, [version])
    useEffect(() => {
        let { errors } = validateData(data)
        onError && onError(errors)
        setState({ errors })
    }, [data])
    const handleChange = (changeData) => {
        setData(changeData)
        setState({ changeData })
        onChange && onChange(changeData)
    }
    const handleSubmit = e => {
        e.preventDefault()
        let res = validateData(data)
        setState({ data, errors: res.errors, changeData: data })
        onSubmit && onSubmit(res)
    }
    let { labelCol = 6, wrapperCol = 16 } = formLayout
    const formItemLayout = {
        labelCol: { span: labelCol },
        wrapperCol: { span: wrapperCol }
    };
    const btnItemLayout = {
        wrapperCol: { offset: labelCol, span: wrapperCol }
    };
    return <Form {...formItemLayout} onSubmit={handleSubmit} noValidate={noValidate}>
        {Object
            .keys(schema.properties)
            .map(key => {
                let isChange = key in changeData
                let inputProps = {
                    key,
                    schema: schema.properties[key],
                    uischem: uiSchems[key],
                    widgets,
                    error: errors[key],
                    name: key,
                    value: data[key],
                    isChange,
                    onChange: handleChange
                }
                return <Cpts {...inputProps} />
            })}
        {children ? children :
            <FormItem {...btnItemLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
        }
    </Form>
}

export default index