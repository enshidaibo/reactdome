import React, { Component } from "react";
import { Table, Tag, Divider, Popconfirm, Tabs, DatePicker, Button, Pagination, notification, Modal } from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
import PageContent from "../component/PageContent";
import PageWrap from '../component/PageWrap';
import SearchBar from "./comp/SearchBar";
import Back from "../component/Back";

import { getAdverRela, moveAdver, getPxAdverList, releaseAdver, offAdver } from "@/services/advertise";

import style from './ad.scss';
import '../base.css';

moment.locale('zh-cn');
const { TabPane } = Tabs;

class AdPublish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            param: {
                pageNo: 1,
                pageSize: 10,
                adsId: this.props.match.params.id,
                deviceName: ""
            },
            dataSource: [],
            dataSourceTotal: 0,
            activeKey: "1",
            unParam: {
                pageNo: 1,
                pageSize: 10, 
                adsId: this.props.match.params.id,
                name: ""
            },
            unDataSource: [],
            unDataSourceTotal: 0,
            selectedRowKeys: [],
            offDate: "",
            dateModal: false,
            setOffDate: {
                deviceId: "",
                endDate: ""
            }
        }
    }

    componentWillMount = () => {
        this.httpGetAdverDeviceListRela();
    }

    httpGetAdverDeviceListRela = async () => {
        let { param } = this.state;
        let res = await getAdverRela(param);
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

    handleRelaSearch = (v) => {
        let { param } = this.state;
        param.deviceName = v;
        param.pageNo = 1;
        this.setState({
            param
        }, () => {
            this.httpGetAdverDeviceListRela();
        })
    }

    handleUnSearch = (v) => {
        let { unParam } = this.state;
        unParam.name = v;
        unParam.pageNo = 1;
        this.setState({
            unParam
        }, () => {
            this.httpGetUnAdverDeviceList();
        });
    }

    httpGetUnAdverDeviceList = async () => {
        let { unParam } = this.state;
        let res = await getPxAdverList(unParam);
        if(res.success){
            this.setState({
                unDataSource: res.data.list,
                unDataSourceTotal: res.data.count
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
                description: '请选择设备进行发布',
            });
            return;
        }else if(!param.adsId){
            notification.warning({
                message: '参数错误',
                description: '广告ID不存在, 请重新选择广告进行发布',
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
                adsId: param.adsId,
                endDate: offDate,
                deviceId: d
            }
            return t;
        });
        let res = await releaseAdver(form);
        if(res.success){
            this.setState({
                activeKey: "1"
            }, () => {
                this.httpGetAdverDeviceListRela();
            })
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    } 

    handleRemove = async (deviceId) => {
        let { param } = this.state;
        let form = {
            adsId: param.adsId,
            deviceId: deviceId
        };
        let res = await moveAdver(form);
        if(res.success){
            param.pageNo = 1;
            param.deviceName = "";
            this.setState({
                param
            }, () => {
                this.httpGetAdverDeviceListRela();
            });
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handleReload = () => {
        let { unParam } = this.state;
        unParam.pageNo = 1;
        unParam.name = "";
        this.setState({
            unParam
        }, () => {
            this.httpGetUnAdverDeviceList();
        });
    }

    handleTabChange = (key) => {
        if(key === "2"){
            this.handleReload();
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
        setOffDate.deviceId = "";
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
            adsId: param.adsId
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
            this.httpGetAdverDeviceListRela();
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
        setOffDate.deviceId = id;
        this.setState({
            setOffDate,
            dateModal: true
        });
    }

    render () {
        let { dataSource, activeKey, dataSourceTotal, unDataSource, unDataSourceTotal, unParam, param, selectedRowKeys, offDate, dateModal, setOffDate } = this.state;

        const columns = [
            {
                title: "设备名称",
                dataIndex: "device",
                key: "id",
                align: "left",
                render: (text) => {
                    return text.name
                }
            },
            {
                title: "设备号",
                dataIndex: "device",
                key: "number",
                align: "center",
                render: (text) => {
                    return text.number;
                }
            },
            {
                title: "设备地址",
                dataIndex: "device",
                key: "location",
                align: "center",
                render: (text) => {
                    return text.location
                }
            },
            {
                title: "下线时间",
                dataIndex: "endDate",
                key: "endDate",
                align: "center"
            },
            {
                title: "状态",
                dataIndex: "status",
                key: "status",
                align: "center",
                render: (text) => {
                    return text === "Y" ? <Tag color="#87d068">使用中</Tag> : <Tag color="#108ee9">未使用</Tag>;
                }
            },
            {
                title: "宽度",
                dataIndex: "device",
                key: "width",
                align: "center",
                render: (text) => {
                    return text.res ? (text.res.width ? text.res.width+"px" : "未知") : "未知";
                }
            },
            {
                title: "高度",
                dataIndex: "device",
                key: "high",
                align: "center",
                render: (text) => {
                    return text.res ? (text.res.high ? text.res.high+"px" : "未知") : "未知";
                }
            },
            {
                title: "操作",
                dataIndex: "device",
                key: "opt",
                align: "right",
                render: (text, record) => {
                    return (
                        <div>
                            <a href="javascript:;" onClick={() => this.handleShowModal(text.id)}>设置</a>
                            <Divider type="vertical"/>
                            <Popconfirm title="你确定要移除吗?" onConfirm={() => this.handleRemove(text.id)}>
                                <a href="javascript:;">移除</a>
                            </Popconfirm>
                        </div>
                    )
                }
            },
        ];

        const unCol = [
            {
                title: "设备号",
                dataIndex: "number",
                key: "number",
                align: 'left'
            },
            {
                title: "设备名称",
                dataIndex: "name",
                key: "name",
                align: "center"
            },
            {
                title: "分辨率(宽*高)",
                dataIndex: "res",
                key: "res",
                align: "right",
                render: (text) => {
                    return text.width + "*" + text.high;
                }
            }
        ];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleOnSelectChange
        };

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
                        <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
                            <TabPane tab="已关联设备" key="1">
                                <SearchBar onSearch={this.handleRelaSearch}/>
                                <Table 
                                    columns={columns}
                                    dataSource={dataSource}
                                    pagination={{
                                        total:dataSourceTotal,
                                        current: param.pageNo,
                                        pageSize: param.pageSize,
                                        onChange: (page, pageSize) => {
                                            param.pageNo = page;
                                            this.setState({
                                                param
                                            }, () => {
                                                this.httpGetAdverDeviceListRela()
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
                                    <SearchBar onSearch={this.handleUnSearch}/>
                                    <Table 
                                        rowKey={record => record.id}
                                        rowSelection={rowSelection}
                                        columns={unCol}
                                        dataSource={unDataSource}
                                        size={"small"}
                                        showHeader={true}
                                        pagination={false}
                                    />
                                    {
                                        unDataSource.length > 0 &&
                                        <div className={style.pageWrap + " row"}>
                                            <div>
                                                <Pagination size="small" 
                                                    total={unDataSourceTotal}
                                                    current={unParam.pageNo}
                                                    pageSize={unParam.pageSize}
                                                    onChange={(page, pageSize) => {
                                                        unParam.pageNo = page;
                                                        this.setState({
                                                            unParam
                                                        }, () => {
                                                            this.httpGetUnAdverDeviceList()
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

export default AdPublish;