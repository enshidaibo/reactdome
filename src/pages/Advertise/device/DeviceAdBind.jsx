import React, { Component } from 'react';
import { Table, Divider, Popconfirm, Tabs, DatePicker, Button, Pagination, notification, Modal } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import PageWrap from '../component/PageWrap';
import PageContent from "../component/PageContent";
import SearchBar from "./comp/SearchBar";
import Back from "../component/Back";

import { getDeviceAdverList, getPxsAdversList, moveAdver, releaseAdver, offAdver } from "@/services/advertise";
import style from "./device.scss";
import "../base.css";
const { TabPane } = Tabs;
class DeviceAdBind extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            dataSourceTotal: 0,
            param: {
                pageNo: 1,
                pageSize: 10,
                deviceId: this.props.match.params.id,
                number: "",
                adsName: ""
            },
            pxAdData: [],
            pxAdDataTotal: 0,
            pxAdParam: {
                pageNo: 1,
                pageSize: 10,
                deviceId: this.props.match.params.id,
                number: "",
                adsName: ""
            },
            activeKey: "1",
            selectedRowKeys: [],
            offDate: "",
            dateModal: false,
            setOffDate: {
                adsId: "",
                endDate: ""
            }
        }
    }

    componentWillMount = () => {
        this.httpGetDeviceAdverList();
    }

    httpGetPxAdList = async () => {
        let { pxAdParam } = this.state;
        let res = await getPxsAdversList(pxAdParam);
        if(res.success){
            this.setState({
                pxAdData: res.data.list,
                pxAdDataTotal: res.data.count
            });
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handleRelaSearch = (number, adsName) => {
        let { param } = this.state;
        param.number = number;
        param.adsName = adsName;
        param.pageNo = 1;
        this.setState({
            param
        }, () => {
            this.httpGetDeviceAdverList();
        });
    }

    handlePxAdSearch = (number, adsName) => {
        let { pxAdParam } = this.state;
        pxAdParam.number = number;
        pxAdParam.adsName = adsName;
        pxAdParam.pageNo = 1;
        this.setState({
            pxAdParam
        }, () => {
            this.httpGetPxAdList();
        });
    }

    httpGetDeviceAdverList = async () => {
        let { param } = this.state;
        let res = await getDeviceAdverList(param);
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

    httpRemove = async (adsId) => {
        let { param } = this.state;
        let form = {
            adsId: adsId,
            deviceId: param.deviceId
        }
        let res = await moveAdver(form);
        if(res.success){
            param.pageNo = 1;
            param.number = "";
            param.adsName = "";
            this.setState({
                param
            }, () => {
                this.httpGetDeviceAdverList();
            });
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    httpReleaseSave = async () => {
        let { selectedRowKeys, param, offDate } = this.state;
        if(selectedRowKeys.length<=0){
            notification.warning({
                message: '参数错误',
                description: '请选择广告进行发布',
            });
            return;
        }else if(!param.deviceId){
            notification.warning({
                message: '参数错误',
                description: '设备ID不存在, 请重新选择设备进行添加',
            });
            return;
        }else if(!offDate){
            notification.warning({
                message: '参数错误',
                description: '请设置广告下线时间',
            });
            return;
        }

        let form = selectedRowKeys.map(d => {
            let t = {
                deviceId: param.deviceId,
                endDate: offDate,
                adsId: d
            }
            return t;
        });
        let res = await releaseAdver(form);
        if(res.success){
            this.setState({
                activeKey: "1"
            }, () => {
                this.httpGetDeviceAdverList();
            });
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handleTabChange = (key) => {
        if(key === "2"){
            this.httpGetPxAdList();
        }
        this.setState({
            activeKey: key,
            offDate: "",
            selectedRowKeys: []
        });
    }

    handleOnSelectChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        });
    }

    handleDateChange = (moment, str) => {
        this.setState({
            offDate: str
        });
    }

    handleEndDateChange = (moment, str) => {
        let { setOffDate } = this.state;
        setOffDate.endDate = str;
        this.setState({
            setOffDate
        });
    }

    handleModalClose = () => {
        let { setOffDate }  =this.state;
        setOffDate.adsId = "";
        setOffDate.endDate = "";
        this.setState({
            setOffDate,
            dateModal: false
        });
    }

    handleSetOffDate = async () => {
        let { setOffDate, param } = this.state;
        let form = {
            ...setOffDate,
            deviceId: param.deviceId
        }
        if(!form.endDate){
            notification.warning({
                message: '参数错误',
                description: '请选择下线时间',
            });
            return;
        }else if(!form.adsId){
            notification.warning({
                message: '参数错误',
                description: '广告ID不存在,请重新选择广告',
            });
            return;
        }else if(!form.deviceId){
            notification.warning({
                message: '参数错误',
                description: '设备ID不存在,请重新设备后再设置',
            });
            return;
        }
        let res = await offAdver(form);
        if(res.success){
            this.handleModalClose();
            this.httpGetDeviceAdverList();
        }else{
            notification.error({
                message: '参数错误',
                description: res.msg,
            });
            return;
        }
    }

    handleShowModal = (id) => {
        let { setOffDate } = this.state;
        setOffDate.adsId = id;
        this.setState({
            setOffDate,
            dateModal: true
        });
    }

    render(){
        const columns = [
            {
                title: "广告名称",
                dataIndex: "adsName",
                key: "adsName",
                align: "left",
            },
            {
                title: "设备名称",
                dataIndex: "name",
                key: "name",
                align: "center",
            },
            {
                title: "广告商",
                dataIndex: "merName",
                key: "merName",
                align: "center",
            },
            {
                title: "广告地址",
                dataIndex: "adsUrl",
                key: "adsUrl",
                align: "center",
            },
            {
                title: "发布时间",
                dataIndex: "startDate",
                key: "startDate",
                align: "center",
            },
            {
                title: "下线时间",
                dataIndex: "endDate",
                key: "endDate",
                align: "center",
            },
            {
                title: "操作",
                dataIndex: "opt",
                align: "right",
                render: (text, record) => {
                    return (
                        <div style={{whiteSpace: "nowrap"}}>
                            <a href="javascript:;" onClick={() => this.handleShowModal(record.adsId)}>设置</a>
                            <Divider type="vertical" />
                            <Popconfirm title="你确定要移除吗?" onConfirm={() => this.httpRemove(record.adsId)}>
                                <a href="javascript:;">移除</a>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];

        const unCol = [
            {
                title: "广告名称",
                dataIndex: "adsName",
                key: "adsName",
                align: 'left'
            },
            {
                title: "广告商",
                dataIndex: "merName",
                key: "merName",
                align: "center"
            },
            {
                title: "广告地址",
                dataIndex: "adsUrl",
                key: "adsUrl",
                align: "center"
            },
            {
                title: "分辨率(宽*高)",
                dataIndex: "width",
                key: "width",
                align: "right",
                render: (text, record) => {
                    return record.width + "*" + record.high;
                }
            }
        ];

        let { dataSource, dataSourceTotal, activeKey, pxAdData, pxAdDataTotal, selectedRowKeys, offDate, dateModal, setOffDate, pxAdParam, param } = this.state;
        
        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleOnSelectChange
        };

        return (
            <PageContent>
                <PageWrap>
                    <div className={style.hd + " row"}>
                        <Back history={this.props.history}/>
                    </div>
                    <div>
                        <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
                            <TabPane tab="关联广告" key="1">
                                <SearchBar onSearch={this.handleRelaSearch}/>
                                <Table 
                                    columns={columns}
                                    dataSource={dataSource}
                                    pagination={{
                                        total: dataSourceTotal,
                                        current: param.pageNo,
                                        pageSize: param.pageSize,
                                        onChange: (page, pageSize) => {
                                            param.pageNo = page;
                                            this.setState({
                                                param
                                            }, () => {
                                                this.httpGetDeviceAdverList()
                                            });
                                        }
                                    }}
                                />
                                <Modal
                                    visible={dateModal}
                                    title="设置下线时间"
                                    onOk={this.handleModalClose}
                                    onCancel={this.handleModalClose}
                                    footer={null}
                                    keyboard={false}
                                    maskClosable={false}
                                >
                                    <DatePicker 
                                        style={{width: "220px"}}
                                        format={'YYYY-MM-DD HH:mm:ss'} 
                                        value={setOffDate.endDate ? moment(setOffDate.endDate, 'YYYY-MM-DD HH:mm:ss') : null}
                                        placeholder={"设置广告时间"}
                                        onChange={this.handleEndDateChange}
                                        showTime
                                    />
                                    <div style={{marginTop: "20px"}}>
                                        <Button type="primary" onClick={this.handleSetOffDate} style={{width: 120}}>保存</Button>
                                    </div>
                                </Modal>
                            </TabPane>

                            <TabPane tab="添加" key="2">
                                <div className={style.dateWrap}>
                                    <div className={style.dateRow + " row"}>
                                        <div className={style.dateLabel}>
                                            下线时间: 
                                        </div>
                                        <div className="fx">
                                            <DatePicker 
                                                style={{width: "100%"}}
                                                format={'YYYY-MM-DD HH:mm:ss'} 
                                                disabled={selectedRowKeys.length<=0 ? true : false}
                                                value={offDate ? moment(offDate, 'YYYY-MM-DD HH:mm:ss') : null}
                                                placeholder={"设置广告时间"}
                                                onChange={this.handleDateChange}
                                                showTime
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={style.tableWrap}>
                                    <SearchBar onSearch={this.handlePxAdSearch}/>
                                    <Table 
                                        rowKey={record => record.adsId}
                                        rowSelection={rowSelection}
                                        columns={unCol}
                                        dataSource={pxAdData}
                                        size={"small"}
                                        showHeader={true}
                                        pagination={false}
                                    />
                                    {
                                        pxAdData.length > 0 &&
                                        <div className={style.pageWrap + " row"}>
                                            <div>
                                                <Pagination size="small" 
                                                    total={pxAdDataTotal}
                                                    current={pxAdParam.pageNo}
                                                    pageSize={pxAdParam.pageSize}
                                                    onChange={(page, pageSize) => {
                                                        pxAdParam.pageNo = page;
                                                        this.setState({
                                                            pxAdParam
                                                        }, () => {
                                                            this.httpGetDeviceAdverList()
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>   
                                    }
                                </div>
                                
                                <div className={style.btnWrap}>
                                    <Button type="primary" onClick={this.httpReleaseSave} className={style.btn}>发布</Button>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </PageWrap>
            </PageContent>
        );
    }
}

export default DeviceAdBind;