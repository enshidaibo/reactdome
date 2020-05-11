import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, TreeSelect } from 'antd';
import deviceHeaderStyle from "./deviceHeader.scss";

const { TreeNode } = TreeSelect;

class DeviceHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: "",
            status: "",
        }
    }

    handleTreeChange = (v) => {
        this.setState({
            status: v
        }, () => {
            let { number, name, status } = this.state;
            typeof this.props.onSearch === "function" && this.props.onSearch(number, name, status);
        });
    }

    handleTextChange = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    handleSearch = () => {
        let { number, name, status } = this.state;
        typeof this.props.onSearch === "function" && this.props.onSearch(number, name, status);
    }

    render () {
        let { name, number, status } = this.state;
        return (
            <div className={deviceHeaderStyle.hd + " row"}>
                <div className="row">
                    <div>
                        {/* <Button>删除</Button> */}
                    </div>
                </div>
                <div className="row">
                    <div style={{marginRight: '15px'}}>
                        <TreeSelect
                            style={{ width: 120 }}
                            value={status}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="设备状态"
                            allowClear
                            treeDefaultExpandAll
                            onChange={this.handleTreeChange}
                        >
                            <TreeNode value="" title="设备状态" key="1"/>
                            <TreeNode value="0" title="在线" key="2"/>
                            <TreeNode value="1" title="离线" key="3"/>
                        </TreeSelect>
                    </div>
                    <div style={{marginRight: '15px'}}>
                        <Input placeholder="设备号" 
                            style={{width: '200px'}}
                            value={number}
                            onChange={(e) => this.handleTextChange("number", e)}
                        />
                    </div>
                    <div style={{marginRight: '15px'}}>
                        <Input placeholder="设备名称" 
                            style={{width: '200px'}}
                            value={name}
                            onChange={(e) => this.handleTextChange("name", e)}
                        />
                    </div>
                    <div style={{marginRight: '15px'}}>
                        <Button type="primary" onClick={this.handleSearch}>搜索</Button>
                    </div>
                    <div>
                        <Link to={`/advertise/device/add`}>
                            <Button type="primary">+新增设备</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceHeader;