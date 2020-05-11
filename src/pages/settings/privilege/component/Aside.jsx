import React, { Component } from 'react';

import {Tree} from 'antd';
const TreeNode = Tree.TreeNode;

class Aside extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedKeys: this.props.selectedKeys,
            routerTree: this.props.routerTree
        }
    }

    componentWillMount = () => {
        this.setState({
            selectedKeys: this.props.selectedKeys,
            routerTree: this.props.routerTree
        });
    }

    handlTreeSelect = (value, e) => {
        this.props.onSelect && this.props.onSelect(value);
    }

    render(){
        const renderTreeNode = (list = []) => {
            return list.map(d => {
                return (
                    <TreeNode title={d.name} key={d.id}>
                        {d.hasChild && renderTreeNode(d.child)}
                    </TreeNode>
                )
            })
        }

        let { selectedKeys, routerTree, sysId } = this.props;

        return (
            <Tree
                showLine
                selectedKeys={[selectedKeys]}
                defaultExpandedKeys={[sysId]}
                onSelect={this.handlTreeSelect}
            >
                <TreeNode title="根目录" key={sysId}>
                    {renderTreeNode(routerTree)}
                </TreeNode>
            </Tree>
        );
    }
}

export default Aside;