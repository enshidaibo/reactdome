import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Select, TreeSelect } from 'antd';
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode;
import { getChannel } from '../../services';

const SelectChannel = ({ value, onChange }) => {
    const [state, setState] = useState([])
    useEffect(() => {
        const getData = async () => {
            let res = await getChannel()
            if (res.success) {
                setState(res.body)
            }
        }
        getData()
    }, [])
    const initContentTree = data => {
        return data.map(d => {
            return (
                <TreeNode value={d.id} title={d.name} key={d.id}>
                    {d.hasChild && initContentTree(d.child)}
                </TreeNode>
            );
        });
    };
    return <TreeSelect
        placeholder="请选择栏目"
        style={{ width: "100%" }}
        value={value}
        showSearch
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        onChange={onChange}
    >
        {initContentTree(state)}
    </TreeSelect>
}

export default SelectChannel