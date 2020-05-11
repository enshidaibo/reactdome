import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, notification } from 'antd';

import { getAgencyList, delAgency } from "@/services/advertise";

import PageWrap from '../component/PageWrap';
import PageContent from "../component/PageContent";
import { Table, Divider, Popconfirm, Button } from 'antd';

import agencyStyle from './agency.scss';
import '../base.css';

class AgencyIndex extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            dataSourceTotal: 0,
            param: {
                pageNo: 1,
                pageSize: 10,
                name: ""
            }
        }
    }

    componentWillMount = () => {
        this.httpGetAgencyList();
    }

    httpGetAgencyList = async () => {
        let { param } = this.state;
        let res = await getAgencyList(param);
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

    httpDelAgency = async (id) => {
        let res = await delAgency(id);
        if(res.success){
            this.httpGetAgencyList();
        }else{
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handleSearch = (v) => {
        let { param } = this.state;
        param.name = v;
        param.pageNo = 1;
        this.setState({
            param
        }, () => {
            this.httpGetAgencyList();
        })
    }

    searchOnChange = (e) => {
        let { param } = this.state;
        param.name = e.target.value;
        this.setState({
            param
        });
    }

    render(){
        const columns = [
            {
                title: "广告商名称",
                dataIndex: "name",
                align: "center",
                key: "name"
            },
            {
                title: "联系人",
                dataIndex: "contact",
                align: "center",
                key: "contact"
            },
            {
                title: "联系电话",
                dataIndex: "phone",
                align: "center",
                key: "phone"
            },
            {
                title: "联系邮箱",
                dataIndex: "email",
                align: "center",
                key: "email"
            },
            {
                title: "联系地址",
                dataIndex: "address",
                align: "center",
                key: "address"
            },
            {
                title: "创建时间",
                dataIndex: "createDate",
                align: "center",
                key: "createDate"
            },
            {
                title: "操作",
                dataIndex: "id",
                key: "id",
                align: "right",
                render: (text, record) => {
                    return (
                        <div>
                            <Link to={`/advertise/agency/edit/${record.id}`}>编辑</Link>
                            <Divider type="vertical" />
                            <Popconfirm title="你确定要删除吗?" onConfirm={() => this.httpDelAgency(record.id)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];

        let { dataSource, param, dataSourceTotal } = this.state;

        return (
            <PageContent>
                <PageWrap>
                    <div className={agencyStyle.hd + " row"}>
                        <div></div>
                        <div className={"row"}>
                            <Input.Search 
                                placeholder="搜索名称" 
                                value={param.name}
                                onChange={this.searchOnChange}
                                onSearch={this.handleSearch} 
                                enterButton 
                                style={{marginRight: '15px'}}
                            />
                            <Link to="/advertise/agency/add">
                                <Button type="primary">+新增广告商</Button>
                            </Link>
                        </div>
                    </div>
                    <div>
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
                                        this.httpGetAgencyList();
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

export default AgencyIndex;