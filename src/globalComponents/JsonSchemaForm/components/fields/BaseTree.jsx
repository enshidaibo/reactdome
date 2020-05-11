import React, { Component } from 'react'
import { Tree } from 'antd';
const { TreeNode } = Tree;
import useGetArrayData from "../../hooks/useGetArrayData";

const renderTreeNodes = (data, disabledKeys) =>
    data.map(item => {
        return (
            <TreeNode title={item.title} key={item.value} disabled={disabledKeys.includes(item.value)} dataRef={item}>
                {item.children && renderTreeNodes(item.children, disabledKeys)}
            </TreeNode>
        );
    });

const BaseTree = (props) => {
    let { name, value, title, type, error, onChange, schema, disabledKeys = [], uischem = {}, ...rest } = props
    let data = useGetArrayData(uischem)
    return data.length > 0 ? <Tree
        checkedKeys={value}
        onCheck={onChange}
        {...uischem.uiOptions}
        {...rest}
        multiple
    >
        {renderTreeNodes(data, disabledKeys)}
    </Tree> : null
}

export default BaseTree