import { TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;
import localRedux from '../localRedux'

const handlefilterTreeNode = (value, item) => {
    if (item.props.title.indexOf(value) > -1) {
        return true
    }
    return false
}

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

const TreeSelectChannel = ({ name, value, onChange, disabledid }) => {
    const locale = localRedux.getContext()
    let list = [{ id: "", name: '无上级栏目' }].concat(locale.context.list)
    return <TreeSelect
        style={{ maxWidth: '400px' }}
        showSearch
        value={value}
        placeholder="请选择栏目"
        filterTreeNode={handlefilterTreeNode}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        onChange={value => {
            onChange(name, value)
        }}
    >
        {initContentTree(list, disabledid)}
    </TreeSelect>
}

export default TreeSelectChannel