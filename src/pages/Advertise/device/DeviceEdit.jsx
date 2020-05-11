import React, { Component } from 'react';
import { Form, Button, Input, TreeSelect, Radio, notification } from 'antd';

import PageWrap from '../component/PageWrap';
import PageContent from "../component/PageContent";
import Item from '../component/Item';
import Back from "../component/Back";
import { updateDevice, getPxList, getDevice } from "@/services/advertise";

const { TreeNode } = TreeSelect;

import style from "./device.scss";
import "../base.css";

class DeviceAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device: {
                number: "",
                name: "",
                location: "",
                status: "0",
                resId: ""
            },
            allPx: [],
            deviceNumber: this.props.match.params.id
        }
    }

    componentWillMount = () => {
        this.httpGetDevice();
        this.httpGetAllPx();
    }

    //获取原始信息
    httpGetDevice = async () => {
        let { deviceNumber, device } = this.state;
        let res = await getDevice({ number: deviceNumber });
        if (res.success) {
            device.number = res.data.number;
            device.resId = res.data.resId;
            device.name = res.data.name;
            device.location = res.data.location;
            device.id = res.data.id;
            this.setState({
                device
            });
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    //拉取所有分辨率
    httpGetAllPx = async () => {
        let res = await getPxList({});
        if (res.success) {
            this.setState({
                allPx: res.data.list
            });
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    httpUpdateDevice = async () => {
        let { device } = this.state;
        if (!device.number) {
            notification.warning({
                message: '参数错误',
                description: '请输入设备号',
            });
            return;
        } else if (!device.name) {
            notification.warning({
                message: '参数错误',
                description: '请输入设备名称',
            });
            return;
        } else if (!device.location) {
            notification.warning({
                message: '参数错误',
                description: '请输入设备地址',
            });
            return;
        } else if (device.location.length > 200) {
            notification.warning({
                message: '参数错误',
                description: '设备地址超出长度限制',
            });
            return;
        } else if (!device.status) {
            notification.warning({
                message: '参数错误',
                description: '请选择设备状态',
            });
            return;
        } else if (!device.resId) {
            notification.warning({
                message: '参数错误',
                description: '请选择分辨率',
            });
            return;
        }
        let res = await updateDevice(device);
        if (res.success) {
            this.props.history.push("/advertise/device");
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handleOnChageSelect = (name, v) => {
        let { device } = this.state;
        device[name] = v;
        this.setState({
            device
        });
    }

    handleOnChangeText = (name, v) => {
        let { device } = this.state;
        device[name] = v.target.value;
        this.setState({
            device
        });
    }

    handleOnChangeRadio = (name, e) => {
        let { device } = this.state;
        device[name] = e.target.value;
        this.setState({
            device
        });
    }

    render() {

        let { device, allPx } = this.state;

        return (
            <PageContent>
                <PageWrap>
                    <div className={style.hd + " row"}>
                        <Back history={this.props.history} />
                    </div>
                    <div>
                        <Item label="设备号">
                            <Input
                                placeholder="输入设备号"
                                onChange={(e) => this.handleOnChangeText("number", e)}
                                value={device.number}
                                disabled
                            />
                        </Item>
                        <Item label="设备名称">
                            <Input
                                placeholder="输入设备名称"
                                onChange={(e) => this.handleOnChangeText("name", e)}
                                value={device.name}
                            />
                        </Item>
                        <Item label="设备地址">
                            <Input
                                placeholder="输入设备地址"
                                onChange={(e) => this.handleOnChangeText("location", e)}
                                value={device.location}
                            />
                        </Item>
                        <Item label="是否在线">
                            <Radio.Group buttonStyle="solid"
                                onChange={(e) => this.handleOnChangeRadio("status", e)}
                                value={device.status}
                                disabled
                            >
                                <Radio.Button value="0">在线</Radio.Button>
                                <Radio.Button value="1">离线</Radio.Button>
                            </Radio.Group>
                        </Item>
                        <Item label="分辨率">
                            <TreeSelect
                                style={{ width: "100%" }}
                                value={device.resId}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="请选择分辨率"
                                allowClear
                                onChange={this.onChange}
                                onChange={(v) => this.handleOnChageSelect("resId", v)}
                                disabled
                            >
                                <TreeNode value={""} title={"请选择分辨率"} key={""} />
                                {
                                    allPx.length > 0 &&
                                    allPx.map((d, i) => {
                                        return <TreeNode value={d.id} title={d.name + "(" + d.width + "*" + d.high + ")"} key={i + 1} />;
                                    })
                                }
                            </TreeSelect>
                        </Item>
                        <Item offset>
                            <Button
                                type="primary"
                                style={{ marginRight: "30px", width: "160px" }}
                                onClick={this.httpUpdateDevice}
                            >
                                保存
                            </Button>
                        </Item>
                    </div>
                </PageWrap>
            </PageContent>
        )
    }
}

export default DeviceAdd;