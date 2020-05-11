import React, { Component } from 'react';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { Table, Button, Popconfirm, message, Tag } from 'antd';

import Aside from './component/Aside';
import AuthModal from './component/AuthModal';

import style from './style.scss';
class PrivilegeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                pid: '1'
            },
            api: {
                id: ''
            },
            form: {
                id: '',
                type: '',
                flag: '',
                name: '',
                uri: '',
                pid: ''
            },
            sysArr: [],
            routerTree: [],
            apiArr: [],
            batchIdArr: [],
            visible: false,
            type: false,
            loading: false
        }
    }

    componentWillMount = () => {
        this.httpGetSys();
        this.httpGetRouterTree();
    }

    //获取系统标识
    httpGetSys = async () => {
        let res = await app.yssjfetch.post("admin/permission/systems");
        if (res.success) {
            this.setState({
                sysArr: res.body
            });
        }
    }

    //获取系统路由树
    httpGetRouterTree = async () => {
        let { params } = this.state;
        let res = await app.yssjfetch.post("admin/permission/list", params);
        if (res.success) {
            this.setState({
                routerTree: res.body
            });
        }
    }

    //更改系统标识, 以便获取系统路由树
    handleSysOnClick = (id) => {
        let { params, api } = this.state;
        if (id + "" === params.pid) {
            return;
        }
        params.pid = id + "";
        api.id = "";
        this.setState({
            params,
            apiArr: [],
            api
        }, () => this.httpGetRouterTree());
    }

    //获取路由下api数据接口信息列表
    httpGetApiList = async () => {
        this.setState({
            loading: true
        });
        let { api } = this.state;
        if (!api.id) {
            return;
        }
        let res = await app.yssjfetch.post("admin/permission/apiList", api);
        if (res.success) {
            this.setState({
                apiArr: res.body
            });
        }
        this.setState({
            loading: false
        });
    }

    //路由树删除
    handleDelRouter = () => {
        let { api, params } = this.state;
        if (api.id === params.pid) {
            message.warning('不能删除根节点');
            return;
        }
        this.handleDel(api.id);
    }

    //批量删除api信息
    handleDel = async (id) => {
        let form = { ids: id };
        let res = await app.yssjfetch.post("admin/permission/delete", form);
        if (res.success) {
            this.httpGetApiList();
            this.httpGetRouterTree();
        }
    }

    //批量删除api信息
    httpBatchDel = async () => {
        let { batchIdArr } = this.state;
        let form = { ids: batchIdArr.join(",") };
        let res = await app.yssjfetch.post("admin/permission/delete", form);
        if (res.success) {
            this.httpGetApiList();
            this.httpGetRouterTree();
            this.setState({
                batchIdArr: []
            })
        }
    }

    //路由树选择事件
    handleTreeSelect = (selectedKeys, info) => {
        let { api } = this.state;
        api.id = selectedKeys[0] ? selectedKeys[0] : "";
        this.setState({
            api,
            apiArr: [],
        }, () => this.httpGetApiList());
    }

    //新增显示modal
    handleModelShow = () => {
        this.setState({
            visible: true,
            type: false
        });
    }

    //修改显示modal
    handleUpdateModalShow = (record) => {
        let { form } = this.state;
        form.id = record.id + "";
        form.name = record.name;
        form.flag = record.flag + "";
        form.type = record.type + "";
        form.uri = record.uri;
        form.pid = record.pid;
        this.setState({
            visible: true,
            type: true,
            form
        });
    }

    //修改路由树modal
    handleUpdateRouter = () => {
        let { api, form, routerTree } = this.state;
        let data = null;
        data = this.findRouterTree(api.id, routerTree);
        if (!data) {
            message.warning('未找到路由树节点信息, 无法修改');
            return;
        }
        form.id = data.id + "";
        form.name = data.name;
        form.flag = data.flag + "";
        form.type = data.type + "";
        form.uri = data.uri;
        form.pid = data.pid;

        this.setState({
            form,
            visible: true,
            type: true
        });
    }

    //查找路由树节点信息
    findRouterTree = (id, tree) => {
        for (let i = 0, len = tree.length; i < len; i++) {
            if (id == tree[i].id + "") {
                return tree[i];
            }
            if (tree[i].hasChild) {
                let data = this.findRouterTree(id, tree[i].child);
                if (data) {
                    return data;
                }
            }
        }
        return null;
    }

    //隐藏modal
    handleModelHide = () => {
        this.setState({ visible: false });
    }

    //modal 保存成功后的回调
    handleOnOk = () => {
        this.setState({ visible: false });
        this.httpGetRouterTree();
        this.httpGetApiList();
    }

    render() {
        let { routerTree, sysArr, apiArr, api, visible, type, params, form, batchIdArr, loading } = this.state
        api.id = api.id ? api.id : params.pid;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '模块',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '权限字符',
                dataIndex: 'uri',
                key: 'uri'
            },
            {
                title: '权限类型',
                dataIndex: 'flag',
                key: 'flag',
                render: (text) => {
                    let str = <Tag>未知</Tag>;
                    switch (text + "") {
                        case "1":
                            str = <Tag color="#f50">API</Tag>;
                            break;
                        case "2":
                            str = <Tag color="#2db7f5">路由</Tag>;
                            break;
                        case "3":
                            str = <Tag color="#87d068">标记</Tag>;
                            break;
                    }
                    return str;
                }
            },
            {
                title: '权限级别',
                dataIndex: 'type',
                key: 'type',
                render: (text) => {
                    let str = <Tag>未知</Tag>;
                    switch (text + "") {
                        case "1":
                            str = <Tag color="#f50">系统级别</Tag>;
                            break;
                        case "2":
                            str = <Tag color="#2db7f5">模块级别</Tag>;
                            break;
                        case "3":
                            str = <Tag color="#87d068">末级导航</Tag>;
                            break;
                        case "4":
                            str = <Tag color="#108ee9">功能级别</Tag>;
                            break;
                    }
                    return str;
                }
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'options',
                render: (text, record) => {
                    return (
                        <div>
                            <span
                                className={`iconfont icon-bianji ${style.bianji}`} title="编辑"
                                onClick={() => this.handleUpdateModalShow(record)}
                            />
                            <Popconfirm
                                placement="topRight"
                                title={"你确定要删除吗?"}
                                onConfirm={() => this.handleDel(record.id)}
                                okText="确定"
                                cancelText="取消"
                            >
                                <span className={`iconfont icon-x ${style.delete}`} title="删除" />
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];
        const rowSelection = {
            selectedRowKeys: this.state.batchIdArr,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    batchIdArr: selectedRowKeys !== undefined ? selectedRowKeys : []
                })
            },
            getCheckboxProps: record => ({
                name: record.name,
            })
        }

        return (
            <div className={style.page}>
                <BreadcrumbCmp />
                <div className={style.main}>
                    <div className={style.header}>
                        {
                            sysArr.map(d => {
                                return (
                                    <Button type={params.pid === d.id + "" ? "primary" : "default"}
                                        key={d.id}
                                        onClick={() => this.handleSysOnClick(d.id)}
                                    >
                                        {d.name}
                                    </Button>
                                )
                            })
                        }
                    </div>
                    <div className={style.container}>
                        <div className={style.aside}>
                            <Aside routerTree={routerTree}
                                selectedKeys={api.id}
                                onSelect={this.handleTreeSelect}
                                sysId={params.pid}
                            />
                        </div>
                        <div className={style.wrap}>
                            <div>
                                <div className={style.btnsGroup}>
                                    <Button onClick={this.handleModelShow}>新增</Button>
                                    {
                                        api.id === params.pid ?
                                            <Button disabled>修改</Button> :
                                            <Button onClick={this.handleUpdateRouter}>修改</Button>
                                    }
                                    {
                                        api.id === params.pid ?
                                            <Button disabled>删除</Button> :
                                            <Popconfirm
                                                placement="topRight"
                                                title={"你确定要删除吗?"}
                                                onConfirm={() => this.handleDelRouter()}
                                                okText="确定"
                                                cancelText="取消"
                                            >
                                                <Button>删除</Button>
                                            </Popconfirm>
                                    }
                                    {
                                        batchIdArr.length <= 0 ?
                                            <Button disabled>批量删除</Button> :
                                            <Popconfirm
                                                placement="topRight"
                                                title={"你确定要批量删除这些吗?"}
                                                onConfirm={() => this.httpBatchDel()}
                                                okText="确定"
                                                cancelText="取消"
                                            >
                                                <Button>批量删除</Button>
                                            </Popconfirm>
                                    }
                                </div>
                                <Table
                                    rowKey={record => record.id}
                                    dataSource={apiArr}
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    loading={loading}
                                />
                            </div>
                            <AuthModal visible={visible} type={type}
                                onOk={this.handleOnOk}
                                onCancel={this.handleModelHide}
                                data={form}
                                parentId={api.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrivilegeIndex;