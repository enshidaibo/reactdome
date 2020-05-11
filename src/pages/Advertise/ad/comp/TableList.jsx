import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Popconfirm, Tag } from 'antd';

import { deleteAdver } from "@/services/advertise";

class TableList extends Component{

    constructor(props) {
        super(props);
    }

    delAdver  = (id) => {
        typeof this.props.delAdver === "function" && this.props.delAdver(id);
    }

    render () {
        const columns = [
            {
                title: "广告名称",
                align: "left",
                dataIndex: "adsName"
            },
            {
                title: "广告商",
                align: "center",
                dataIndex: "merName"
            },
            {
                title: "广告时长",
                align: "center",
                dataIndex: "adsTime"
            },
            {
                title: "使用状态",
                align: "center",
                dataIndex: "status",
                render: (text) => {
                    return text === "Y" ? <Tag color="#87d068">使用中</Tag> : <Tag color="#108ee9">未使用</Tag>;
                }
            },
            {
                title: "创建时间",
                align: "center",
                dataIndex: "createDate"
            },
            {
                title: "操作",
                align: "right",
                dataIndex: "id",
                render: (text, record) => {
                    return (
                        <div>
                            <Link to={`/advertise/ad/entity/${record.id}`}>查看</Link>
                            <Divider type="vertical"/>
                            <Link to={`/advertise/ad/push/${record.id}`}>发布</Link>
                            <Divider type="vertical"/>
                            {
                                record.status === "Y"
                                ?
                                <a href="javascript:;" style={{color: "#ccc", cursor: "not-allowed"}}>编辑</a>
                                : 
                                <Link to={`/advertise/ad/edit/${record.id}`}>编辑</Link>
                            }
                            <Divider type="vertical"/>
                            <Popconfirm title="你确定要删除吗?" onConfirm={() => this.delAdver(record.id)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];

        let { dataSource } = this.props;

        return (
            <div>
                <Table 
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </div>
        )
    }
}

export default TableList;