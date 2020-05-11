import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Pagination, notification, Input, Radio } from 'antd';

import PageContent from "../component/PageContent";
import PageWrap from '../component/PageWrap';
import TableList from "./comp/TableList";
import PanelList from "./comp/PanelList";

import { getAdverList, deleteAdver } from "@/services/advertise";

import adStyle from './ad.scss';
import '../base.css';

const contextConsumers = app.globalRedux.localRudexConsumers

@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class AdIndex extends Component{

    constructor(props){
        super(props);
        let listType = localStorage.getItem("listType");
        this.state = {
            listType: listType === true ? true : false,
            dataSource: [],
            dataSourceTotal: 0,
            param: {
                pageNo: 1,
                pageSize: 10,
                adsName: "",
                status: ""
            }
        }
    }

    componentWillMount = () => {
        this.getAdverList();
    }

    switchType = () => {
        localStorage.setItem("listType", !this.state.listType);
        this.setState({
            listType: !this.state.listType
        });
    }

    getAdverList = async () => {
        let { param } = this.state;
        let res = await getAdverList(param);
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

    delAdver = async (id) => {
        let res = await deleteAdver(id);
        if(res.success) {
            this.getAdverList();
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handlePageChange = (page, pageSize) => {
        let { param } = this.state;
        param.pageNo = page;
        this.setState({
            param
        }, () => {
            this.getAdverList();
        });
    }

    handleSearch = (v) => {
        let { param } = this.state;
        param.adsName = v;
        param.pageNo = 1;
        this.setState({
            param
        }, () => {
            this.getAdverList();
        })
    }

    searchOnChange = (e) => {
        let { param } = this.state;
        param.adsName = e.target.value;
        this.setState({
            param
        });
    }

    handleRadioChange = (e) => {
        let { param } = this.state;
        param.status = e.target.value;
        param.pageNo = 1;
        this.setState({
            param
        }, () => {
            this.getAdverList();
        });
    }

    render(){
        const icon = {
            fontSize: "24px",
            marginRight: "2px"
        }
        const iconActive = {
            fontSize: "24px",
            marginRight: "2px",
            color: "#1890ff"
        }
        let { listType, dataSource, dataSourceTotal, param } = this.state;

        return (
            <PageContent>
                <PageWrap>
                    <div className={adStyle.hd + " row"}>
                        <div className="row">
                            <div className={adStyle.iconWrap + " row"}>
                                <Icon onClick={this.switchType} type="appstore" style={listType ? icon : iconActive}/>
                                <Icon type="bars" onClick={this.switchType} style={listType ? iconActive : icon}/>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div style={{marginRight: '15px'}}>
                                <Radio.Group 
                                    buttonStyle="solid"
                                    value={param.status}
                                    onChange={this.handleRadioChange}
                                >
                                    <Radio.Button value="">所有状态</Radio.Button>
                                    <Radio.Button value="Y">使用中</Radio.Button>
                                    <Radio.Button value="N">未使用</Radio.Button>
                                </Radio.Group>
                            </div>
                            <div style={{marginRight: '15px'}}>
                                <Input.Search 
                                    placeholder="搜索名称" 
                                    value={param.adsName}
                                    onChange={this.searchOnChange}
                                    onSearch={this.handleSearch} 
                                    enterButton 
                                    style={{width: '200px'}}
                                />
                            </div>
                            <div>
                                <Link to="/advertise/ad/add">
                                    <Button type="primary">+新增广告</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="fx">
                    {
                        listType 
                        ?
                        <TableList dataSource={dataSource} delAdver={this.delAdver}/>
                        :
                        <PanelList dataSource={dataSource} delAdver={this.delAdver}/>
                    }
                    {
                        dataSource.length > 0 &&
                        <div style={{marginTop: `${listType ? "15px" : "0"}`}}>
                            <Pagination size="small" 
                                total={dataSourceTotal} 
                                current={param.pageNo}
                                pageSize={param.pageSize}
                                onChange={this.handlePageChange}
                            />
                        </div>
                    }
                    </div>
                </PageWrap>
            </PageContent>
        );
    }
}

export default AdIndex;