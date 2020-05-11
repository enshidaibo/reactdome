import React, { useEffect, useState } from 'react'
import { Tree } from 'antd'
const { TreeNode } = Tree;

import { getPermissionList } from '@/services/roles'

let initPerms = ["dashboard.home"]

const flat = (data, parentUri = 0) => {
    return data.reduce((arr, d) => {
        arr[d.uri] = { ...d, parentUri }
        return Object.assign(arr, flat(d.child || [], d.uri))
    }, {})
}

const checkedKeysfilter = (data, flatpermission) => {
    return data.filter(d => {
        let flat = flatpermission[d]
        if (!flat) {
            return false
        }
        if (flat.hasChild && flat.child.length > 0) {
            return false
        }
        return true
    })
}

const RoleDetailPermission = ({ value = [], onChange }) => {
    const [permission, setPermission] = useState([])
    const [flatpermission, setFlatPermission] = useState({})
    useEffect(() => {
        const getData = async () => {
            let res = await getPermissionList()
            if (res.success) {
                setPermission(res.body)
                let flatpermission = flat(res.body)
                setFlatPermission(flatpermission)
            }
        }
        getData()
    }, [])
    let checkedKeys = checkedKeysfilter(value, flatpermission)
    checkedKeys = checkedKeys.concat(initPerms)
    const onCheck = (checkedKeys, info) => {
        checkedKeys = checkedKeys.concat(info.halfCheckedKeys)
        onChange(checkedKeys)
    }
    const renderTreeNode = (list) => {
        return list.map(d => {
            return <TreeNode title={d.name} key={d.uri}>
                {d.child && renderTreeNode(d.child)}
            </TreeNode>
        })
    }
    return permission.length > 0 ? <Tree
        checkable
        showLine
        checkedKeys={checkedKeys}
        selectedKeys={[]}
        onCheck={onCheck}
    >
        {renderTreeNode(permission)}
    </Tree> : null
}

export default RoleDetailPermission