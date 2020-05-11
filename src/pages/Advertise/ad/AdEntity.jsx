import React, { Component } from 'react';
import { Table, Modal, notification } from "antd";
import { Link } from "react-router-dom";

import { getAdver } from "@/services/advertise";
import PageContent from "../component/PageContent";
import PageWrap from '../component/PageWrap';
import Back from "../component/Back";

import style from './ad.scss';
import '../base.css';

class AdEntity extends Component{

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: {},
            view: {
                width: 0,
                height: 0,
                url: ""
            },
            viewModal: false
        }
    }

    componentWillMount = () => {
        this.httpGetAdver();
    }

    httpGetAdver = async () => {
        let { id } = this.state;
        let res = await getAdver(id);
        if(res.success) {
            this.setState({
                data: res.data
            });
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handleView = (width, height, url) => {
        let { view } = this.state;
        view.width = width <= 760 ? width : 760;
        view.height = width <= 760 ? height : height*(760/width);
        view.url = url;
        this.setState({
            view,
            viewModal: true
        });
    }

    handleModalHide = () => {
        let { view } = this.state;
        view.width = 0;
        view.height = 0;
        view.url = "";
        this.setState({
            view,
            viewModal: false
        });
    }

    render(){
        let { data, viewModal, view } = this.state;
        let dataSource = data.adsResList ? data.adsResList : [];

        const columns = [
            {
                title: "分辨率名称",
                dataIndex: "res",
                key: "name",
                align: "left",
                render: (text) => {
                    return text.name ? text.name : "未知";
                }
            },
            {
                title: "宽度",
                dataIndex: "res",
                key: "width",
                align: "center",
                render: (text) => {
                    return text.width ? text.width : "未知";
                }
            },
            {
                title: "高度",
                dataIndex: "res",
                key: "high",
                align: "center",
                render: (text) => {
                    return text.high ? text.high : "未知";
                }
            },
            {
                title: "广告地址",
                dataIndex: "adsUrl",
                key: "adsUrl",
                align: "center"
            },
            {
                title: "操作",
                dataIndex: "res",
                key: "opt",
                align: "right",
                render: (text, record) => {
                    return <a href="javascript:;" onClick={() => this.handleView(text.width, text.high, record.adsUrl)}>查看</a>;
                }
            }
        ]
        return (
            <PageContent>
                <PageWrap>
                    <div className={style.hd + " row"}>
                        <div className="row">
                            <Back history={this.props.history}/>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3 className={style.h3}><span>基本信息</span></h3>
                            <ul className={style.ul}>
                                <li className={style.li}>广告名称: {data.adsName}</li>
                                <li className={style.li}>广告商: {data.merName}</li>
                                <li className={style.li}>播放时长: {data.adsTime}</li>
                                <li className={style.li}>使用状态: {data.status === "Y" ? "使用中" : "未使用"}</li>
                            </ul>
                        </div>
                        <div>
                            <Table
                                columns={columns}
                                dataSource={dataSource}
                                size={"small"}
                                showHeader={true}
                                pagination={false}
                            />
                            <Modal
                                visible={viewModal}
                                title="广告预览"
                                onOk={this.handleModalHide}
                                onCancel={this.handleModalHide}
                                footer={null}
                                width={800}
                            >
                                <div style={{textAlign: 'center'}}>
                                    <iframe src={view.url} width={view.width} height={view.height}>
                                    </iframe>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </PageWrap>
            </PageContent>
        );
    }
}

export default AdEntity;