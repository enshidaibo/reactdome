import React, { Component } from 'react';
import { Avatar, Tabs, Table, notification } from 'antd';

import { deviceSum, playSum, adverSum } from "@/services/advertise";
import PageWrap from '../component/PageWrap';
import PageContent from "../component/PageContent";
import PanelSt from "./PanelSt";

import statisStyle from './statis.scss';
import '../base.css';

const { TabPane } = Tabs;

class StatisIndex extends Component{

    constructor (props) {
        super(props);
        this.state = {
            playSource: [],
            playSourceTotal: 0,
            adverSource: [],
            adverSourceTotal: 0,
            deviceData: {
                totalDevice: 0,
                totalOnLine: 0
            },
            playParam: {
                pageNo: 1,
                pageSize: 10
            },
            adverParam: {
                pageNo: 1,
                pageSize: 10
            }
        }
    }

    componentWillMount = () => {
        this.httpGetAdverSum();
        this.httpGetDeviceSum();
        this.httpGetPlaySum();
    }
    
    httpGetPlaySum = async () => {
        let { playParam } = this.state;
        let res = await playSum(playParam);
        if(res.success){
            this.setState({
                playSource: res.data.list,
                playSourceTotal: res.data.count
            });
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    httpGetAdverSum = async () => {
        let { adverParam } = this.state;
        let res = await adverSum(adverParam);
        if(res.success){
            this.setState({
                adverSource: res.data.list,
                adverSourceTotal: res.data.count
            });
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    httpGetDeviceSum = async () => {
        let res = await deviceSum();
        if(res.success){
            this.setState({
                totalDevice: res.data.totalDevice,
                totalOnLine: res.data.onlineSize
            });
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    render(){
        let { totalDevice, totalOnLine, playSource, adverSource, adverSourceTotal, playSourceTotal, playParam, adverParam } = this.state;

        const playCol = [
            {
                title: "设备号",
                dataIndex: "deviceNumber",
                align: "left",
                key: "deviceNumber"
            },
            {
                title: "设备名称",
                dataIndex: "name",
                align: "center",
                key: "name"
            },
            {
                title: "设备地址",
                dataIndex: "location",
                align: "center",
                key: "location"
            },
            {
                title: "播放次数",
                dataIndex: "count",
                align: "right",
                key: "count"
            }
        ];

        const adverCol = [
            {
                title: "广告名称",
                dataIndex: "adsName",
                align: "left",
                key: "adsName"
            },
            {
                title: "播放次数",
                dataIndex: "totalSize",
                align: "right",
                key: "totalSize"
            },
        ]

        return (
            <PageContent>
                <PageWrap>
                    <div className={statisStyle.hd + " row"}>
                        <div>统计分析</div>
                    </div>
                    <div>
                        <PanelSt totalDevice={totalDevice} totalOnLine={totalOnLine}/>
                        <Tabs>
                            <TabPane tab="播放统计" key="1">
                                <Table 
                                    columns={playCol}
                                    dataSource={playSource}
                                    pagination={{
                                        current: playParam.pageNo,
                                        pageSize: playParam.pageSize,
                                        total: playSourceTotal,
                                        onChange: (page, pageSize) => {
                                            playParam.pageNo = page;
                                            this.setState({
                                                playParam
                                            }, () => {
                                                this.httpGetPlaySum();
                                            });
                                        }
                                    }}
                                />
                            </TabPane>
                            <TabPane tab="广告次数" key="2">
                                <Table 
                                    columns={adverCol}
                                    dataSource={adverSource}
                                    pagination={{
                                        current: adverParam.pageNo,
                                        pageSize: adverParam.pageSize,
                                        total: adverSourceTotal,
                                        onChange: (page, pageSize) => {
                                            adverParam.pageNo = page;
                                            this.setState({
                                                adverParam
                                            }, () => {
                                                this.httpGetAdverSum();
                                            });
                                        }
                                    }}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </PageWrap>
            </PageContent>
        );
    }
}

export default StatisIndex;