import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getDeviceList, saveDevice, updateDevice, delDevice } from "@/services/advertise";

import PageWrap from '../component/PageWrap';
import DeviceHeader from './comp/DeviceHeader';
import PageContent from "../component/PageContent";
import { Table, Button, Divider, Popconfirm, notification, Input, Tag } from 'antd';
import "../base.css";

class DeviceIndex extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            dataSourceTotal: 0,
            param: {
                pageNo: 1,
                pageSize: 10,
                number: "",
                name: "",
                status: ""
            }
        }
    }

    componentWillMount  = () => {
        this.httpGetDevicePage();
    }

    /**
     * get请求设备列表数据
     */
    httpGetDevicePage = async () => {
        let { param } = this.state;
        let res = await getDeviceList(param);
        if(res.success){
            this.setState({
                dataSource: res.data.list,
                dataSourceTotal: res.data.count
            });
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    /**
     * 删除设备
     */
    httpDelDevice = async (id) => {
        let res = await delDevice({ id: id });
        if(res.success){
            this.httpGetDevicePage();
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handleSearch = (number, name, status) => {
        let { param } = this.state;
        param.pageNo = 1;
        param.name = name;
        param.number = number;
        param.status = status;
        this.setState({
            param
        }, () => {
            this.httpGetDevicePage();
        });
    }

    render(){
        let { dataSource, dataSourceTotal, param } = this.state;
        
        const columns = [
            {
                title: "设备号",
                dataIndex: "number",
                key: "number",
                align: "left",
            },
            {
                title: "设备名称",
                dataIndex: "name",
                key: "name",
                align: "center"
            },
            {
                title: "设备地址",
                dataIndex: "location",
                key: "location",
                align: "center"
            },
            {
                title: "设备状态",
                dataIndex: "status",
                key: "key",
                align: "center",
                render: (text) => {
                    return text == "0" ? <Tag color="#87d068">在线</Tag> : <Tag color="#108ee9">离线</Tag>;
                }
            },
            {
                title: "分辨率名称",
                dataIndex: "res",
                key: "resName",
                align: "center",
                render: (text) => {
                    return text.name ? text.name : "未知"
                }
            },
            {
                title: "宽度",
                dataIndex: "res",
                key: "width",
                align: "center",
                render: (text) => {
                    return text.width ? text.width + "px" : "未知"
                }
            },
            {
                title: "高度",
                dataIndex: "res",
                key: "high",
                align: "center",
                render: (text) => {
                    return text.high ? text.high + "px" : "未知"
                }
            },
            {
                title: "操作",
                dataIndex: "options",
                key: "options",
                align: "right",
                render: (text, record) => {
                    return (
                        <div>
                            <Link to={`/advertise/device/edit/${record.number}`}>修改</Link>
                            <Divider type="vertical" />
                            <Link to={`/advertise/device/bind/${record.id}`}>广告列表</Link>
                            <Divider type="vertical" />
                            <Popconfirm title="你确定要删除吗?" onConfirm={() => this.httpDelDevice(record.id)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ];

        return (
            <PageContent>
                <PageWrap>
                    <DeviceHeader onSearch={this.handleSearch}/>
                    <div className="fx white">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{
                                current: param.pageNo,
                                pageSize: param.pageSize,
                                total: dataSourceTotal,
                                onChange: (page, pageSize) => {
                                    param.pageNo = page;
                                    this.setState({
                                        param
                                    }, () => {
                                        this.httpGetDevicePage();
                                    });
                                }
                            }}
                        />
                    </div>
                </PageWrap>
            </PageContent>
        );
    }
}

export default DeviceIndex;