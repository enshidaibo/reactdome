import React, { useMemo } from 'react'
import { Form } from "antd";
import styles from './styles.scss';

export const FormItem = ({ children, ...props }) => {
    return <Form.Item className={styles.form_item}
        {...props}>
        {children}
    </Form.Item>
}

const areEqual = (prevProps, nextProps) => {
    if (nextProps.isChange || prevProps.value != nextProps.value || prevProps.uischem != nextProps.uischem) {
        return false
    } else {
        return true
    }
}

const events = ['onChange', 'onClick']
const CptArray = ({ schema, uischem = {}, widgets, error, name, value, isValidata, validateAll, isChange, ...props }) => {
    uischem = { ...uischem, uiOptions: uischem.uiOptions || {} }
    let Cpt = null
    if (uischem.uiType && widgets[uischem.uiType]) {
        Cpt = widgets[uischem.uiType]
    } else if (!widgets[schema.type]) {
        return null
    } else {
        let type = uischem.uiType || 'default'
        Cpt = widgets[schema.type][type]
        if (!Cpt) {
            console.log(`组件widgets[${schema.type}][${type}]不存在`);
            return null
        }
    }
    let { errorMessage, default: _default, ...fileProps } = schema
    let inputProps = { ...fileProps, ...props, schema, uischem, name, value, error }
    let inPutEvents = {}
    events.map(d => {
        if (uischem[d]) {
            inPutEvents[d] = function (value) {
                uischem[d](inputProps, arguments)
            }
        }
    })
    let validateStatus = error ? 'error' : ''
    let itemProps = {
        label: schema.title,
        validateStatus,
        key: name,
        help: (validateStatus === 'error' && error) ? (error.errors && error.errors[0] || uischem.uiHelp) : uischem.uiHelp
    }
    let { uiLayout = {} } = uischem.uiOptions
    return <FormItem {...itemProps} {...uiLayout}>
        <Cpt {...inputProps}  {...inPutEvents} />
    </FormItem>
}

export default React.memo(CptArray, areEqual);
