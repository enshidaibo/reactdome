import React from 'react';
import { TreeSelect } from 'antd';
import useGetArrayData from "../../hooks/useGetArrayData";

const TreeNode = TreeSelect.TreeNode;

const renderTreeNodes = (data, disabledKeys = []) =>
    data.map(item => {
        return (
            <TreeNode title={item.title} key={item.value} value={item.value} disabled={disabledKeys.includes(item.value)} dataRef={item}>
                {item.children && renderTreeNodes(item.children, disabledKeys)}
            </TreeNode>
        );
    });

const BaseTreeSelect = ({ name, value, onChange, schema, uischem = {}, ...props }) => {
    let data = useGetArrayData(uischem)
    const handleChange = (value) => {
        onChange({ [name]: value });
    };
    props = {
        ...props,
        ...uischem.uiOptions,
        multiple: schema.type === 'array',
        onChange: handleChange
    }
    return <TreeSelect value={value} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}  {...props} >
        {renderTreeNodes(data)}
    </TreeSelect>
}

export default BaseTreeSelect;