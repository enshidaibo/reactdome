import React, { Component } from 'react';
import { Button, Input, notification } from 'antd';

import { updateAgency, getAgency } from "@/services/advertise";
import PageWrap from '../component/PageWrap';
import PageContent from "../component/PageContent";
import Item from "../component/Item";
import Back from "../component/Back";
import style from "./agency.scss";
import { verifyEmail, verifyPhone } from "../verify";

class AgencyEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: {
                id: "",
                name: "",
                contact: "",
                address: "",
                email: "",
                phone: ""
            }
        }
    }

    componentWillMount = () => {
        let { id } = this.state;
        this.getAgencyById(id);
    }

    getAgencyById = async (id) => {
        let res = await getAgency(id);
        let { data } = this.state;
        if (res.success) {
            data.id = res.data.id;
            data.name = res.data.name;
            data.phone = res.data.phone;
            data.address = res.data.address;
            data.email = res.data.email;
            data.contact = res.data.contact;
            this.setState({
                data
            });
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    httpSaveAgency = async () => {
        let { data } = this.state;
        if (!data.id) {
            notification.warning({
                message: '输入提示',
                description: '广告商ID不存在, 请重新选择广告商进行修改',
            });
            return;
        } else if (!data.name) {
            notification.warning({
                message: '输入提示',
                description: '请输入广告商名称',
            });
            return;
        } else if (data.name.length > 64) {
            notification.warning({
                message: '输入提示',
                description: '广告商名称长度超出限制',
            });
            return;
        } else if (!data.contact) {
            notification.warning({
                message: '输入提示',
                description: '请输入联系人',
            });
            return;
        } else if (data.contact.length > 64) {
            notification.warning({
                message: '输入提示',
                description: '联系人字符长度超出限制',
            });
            return;
        } else if (!data.address) {
            notification.warning({
                message: '输入提示',
                description: '请输入联系地址',
            });
            return;
        } else if (data.address.length > 64) {
            notification.warning({
                message: '输入提示',
                description: '联系地址字符长度超出限制',
            });
            return;
        } else if (!data.phone || verifyPhone(data.phone) === false) {
            notification.warning({
                message: '输入提示',
                description: '请输入正确的联系电话',
            });
            return;
        } else if (!data.email || verifyEmail(data.email) === false) {
            notification.warning({
                message: '输入提示',
                description: '请输入正确的联系邮箱',
            });
            return;
        }
        let res = await updateAgency(data);
        if (res.success) {
            this.props.history.push("/advertise/agency");
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handleOnChangeText = (name, e) => {
        let { data } = this.state;
        data[name] = e.target.value;
        this.setState({
            data
        });
    }

    cancel = () => {

    }

    render() {

        let { data } = this.state;

        return (
            <PageContent>
                <PageWrap>
                    <div className={style.hd + " row"}>
                        <Back history={this.props.history} />
                    </div>
                    <div>
                        <div>
                            <Item label="广告商名称">
                                <Input
                                    placeholder="请输入广告商名称"
                                    value={data.name}
                                    onChange={(e) => this.handleOnChangeText("name", e)}
                                />
                            </Item>
                            <Item label="联系人">
                                <Input
                                    placeholder="请输入联系人"
                                    value={data.contact}
                                    onChange={(e) => this.handleOnChangeText("contact", e)}
                                />
                            </Item>
                            <Item label="联系地址">
                                <Input
                                    placeholder="请输入联系地址"
                                    value={data.address}
                                    onChange={(e) => this.handleOnChangeText("address", e)}
                                />
                            </Item>
                            <Item label="联系电话">
                                <Input
                                    placeholder="请输入联系电话"
                                    value={data.phone}
                                    onChange={(e) => this.handleOnChangeText("phone", e)}
                                />
                            </Item>
                            <Item label="联系邮箱">
                                <Input
                                    placeholder="请输入联系邮箱"
                                    value={data.email}
                                    onChange={(e) => this.handleOnChangeText("email", e)}
                                />
                            </Item>
                            <Item offset>
                                <Button
                                    type="primary"
                                    style={{ marginRight: "30px", width: "160px" }}
                                    onClick={this.httpSaveAgency}
                                >
                                    保存
                                </Button>
                            </Item>
                        </div>
                    </div>
                </PageWrap>
            </PageContent>
        );
    }
}

export default AgencyEdit;