import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { getOrgStatisticPage as contributeStat } from '@/services/contribute';
import style from './styles.scss';
import StatTool from './component/StatTool';
const contextConsumers = app.globalRedux.localRudexConsumers

@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class Statis extends Component{
    constructor(props){
        super(props);
        this.state = {
            params: {
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                siteId: this.props.userInfo.siteId,
                pageNo: 1,
                pageSize: 10,
                orderBy: '',
                orderDesc: '',
                startTime: '',
                endTime: '',
                timeType: '',
                updateBy: '',
            },
            data: [],
            total: 0,
            loading: false,
            sortedInfo: {}
        }
    }

    componentDidMount = () => {
        this.httpGetStat();
    }

    httpGetStat = async () => {
        if(this.state.loading) return;
        this.setState({loading: true});
        let { params } = this.state;
        let res = await contributeStat(params);
        if(res.success){
            this.setState({
                loading: false,
                data: res.body.list,
                total: res.body.totalCount
            });
        }else{
            this.setState({loading: false});
        }
    }

    handleSearch = (start, end, type, updateBy) => {
        let { params } = this.state;
        params.startTime = start;
        params.endTime = end;
        params.timeType = type;
        params.updateBy = updateBy;
        this.setState({
            params
        }, () => {this.httpGetStat()});
    }

    handleTableChange = (pagination, filters, sorter) => {
        let { params } = this.state;
        params.orderBy = sorter.columnKey ? sorter.columnKey : '';
        params.orderDesc = sorter.order ? (sorter.order === "ascend" ? "asc" : "desc") : '';
        this.setState({
            sortedInfo: sorter,
            params
        }, () => this.httpGetStat());
    };

    render(){
        let { pageNo, pageSize, startTime, endTime } = this.state.params;
        let { total, sortedInfo, params } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [
            { title: '用户名称', dataIndex: 'orgName',
                sorter: (a, b) => a.orgName - b.orgName,
                sortOrder: sortedInfo.columnKey === "orgName" && sortedInfo.order,
                render: (text, record) => {
                    return <Link to={`/contribute/statistical/${record.orgId}`}>{text}</Link>
                }
            },
            // { title: '手机号', dataIndex: 'userId',
            //     sorter: (a, b) => a.userId - b.userId,
            //     sortOrder: sortedInfo.columnKey === "userId" && sortedInfo.order
            // },
            { title: '投稿篇数', dataIndex: 'total',
                sorter: (a, b) => a.total - b.total,
                sortOrder: sortedInfo.columnKey === "total" && sortedInfo.order
            },
            { title: '采用篇数', dataIndex: 'caiyong',
                sorter: (a, b) => a.caiyong - b.caiyong,
                sortOrder: sortedInfo.columnKey === "caiyong" && sortedInfo.order
            },
            { title: '发表量', dataIndex: 'publish',
                sorter: (a, b) => a.publish - b.publish,
                sortOrder: sortedInfo.columnKey === "publish" && sortedInfo.order
            },
            { title: 'A', dataIndex: 'a',
                sorter: (a, b) => a.a - b.a,
                sortOrder: sortedInfo.columnKey === "a" && sortedInfo.order
            },
            { title: 'B', dataIndex: 'b',
                sorter: (a, b) => a.b - b.b,
                sortOrder: sortedInfo.columnKey === "b" && sortedInfo.order
            },
            { title: 'C', dataIndex: 'c',
                sorter: (a, b) => a.c - b.c,
                sortOrder: sortedInfo.columnKey === "c" && sortedInfo.order
            },
            { title: 'D', dataIndex: 'd',
                sorter: (a, b) => a.d - b.d,
                sortOrder: sortedInfo.columnKey === "d" && sortedInfo.order
            }
        ];
        
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                name: record.name,
            })
        }

        return (
            <div className={style.page}>
                <BreadcrumbCmp />
                <div className={style.pageBody}>
                    <div className={style.pageStatis}>
                        <div className={style.pageHd}>
                            <StatTool onSearch={this.handleSearch} onExport={this.handleExport} params={params}/>
                        </div>
                        <div className={style.pageMain}>
                            <div className={style.pageScroll}>
                                <Table
                                    rowKey={record => record.userId}
                                    onChange={this.handleTableChange}
                                    columns={columns} 
                                    loading={this.state.loading}
                                    dataSource={this.state.data}
                                    pagination={{
                                        current: pageNo,
                                        pageSize: pageSize,
                                        total: total,
                                        onChange: (page, pageSize) => {
                                            let { params } = this.state;
                                            params.pageNo = page;
                                            this.setState({
                                                params
                                            }, () => this.httpGetStat())
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Statis