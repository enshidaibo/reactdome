import react, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LeftContent } from '@/pages/A_Layout/ContentLayout';
import { getTemplateTree } from "@/services/template";
import { Tree, Button, Modal } from 'antd';
import TemplateSetting from './TmpSetting';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
import localRedux from '../localRedux'
import styles from './LeftMenu.scss'

const flattenData = (data, parent = 0) => {
    return data.reduce((arr, { child, ...rest }) => {
        return arr.concat([{ ...rest, parent }], flattenData(child || [], rest.path));
    }, []);
};

const getExpandedKeys = (data, eventKey) => {
    let keys = []
    let item = data.find(d => {
        return d.path == eventKey
    })
    if (item) {
        keys = keys.concat([item.path])
        if (item.parent !== 0 && item.parent !== eventKey) {
            keys = keys.concat(getExpandedKeys(data, item.parent))
        }
    }
    return keys
}

const LeftMenu = () => {
    const [visible, setVisible] = useState(false)
    const locale = useContext(localRedux.context);
    const { version, selectInfo, trees, flattenTrees } = locale.context
    const getData = async () => {
        let res = await getTemplateTree()
        if (res.success) {
            let trees = [{ isDirectory: true, name: "根目录", path: res.body.rootPath, child: res.body.resources }]
            let flattenTrees = flattenData(trees, res.body.rootPath)
            if (selectInfo.isinit) {
                let selectInfos = {
                    eventKey: res.body.rootPath,
                    isDirectory: true,
                    name: '根目录',
                    parent: res.body.rootPath,
                    path: res.body.rootPath
                }
                locale.dispatch.set({ trees: trees, flattenTrees, selectInfo: selectInfos })
            } else {
                locale.dispatch.set({ trees: trees, flattenTrees })
            }
        }
    }
    useEffect(() => {
        getData()
    }, [version])
    const handleSelect = (selectedKeys, info) => {
        const { eventKey } = info.node.props
        const selectRow = flattenTrees.find(d => d.path == eventKey)
        locale.dispatch.set({ selectInfo: { eventKey, ...selectRow }, action: 'edit' })
    }
    const renderTreeNode = (trees = []) => {
        return trees.map(d => {
            return <TreeNode title={d.name} key={d.path} isLeaf={!d.isDirectory} >
                {d.isDirectory && d.child !== '' && renderTreeNode(d.child)}
            </TreeNode>
        })
    }
    let expandedKeys = getExpandedKeys(flattenTrees, selectInfo.eventKey)
    return <LeftContent>
        <Button className={styles.reflush} onClick={getData} type='primary'>刷新</Button>
        <Button className={styles.reflush} onClick={() => setVisible(true)} type='primary'>模板设置</Button>
        <Modal
            title="模板设置"
            visible={visible}
            footer={false}
            onCancel={() => setVisible(false)}
        >
            {visible && <TemplateSetting setVisible={setVisible} />}
        </Modal>
        {trees.length > 0 && <DirectoryTree
            onSelect={handleSelect}
            selectedKeys={[selectInfo.eventKey]}
            className={styles.menu}
            expandedKeys={expandedKeys}
        // defaultExpandedKeys={[trees[0].path]}
        >
            {renderTreeNode(trees)}
        </DirectoryTree>}
    </LeftContent>
}


export default LeftMenu