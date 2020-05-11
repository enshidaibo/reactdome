import React, { Component } from 'react';
import { Select, Icon, Button, notification } from 'antd';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
const SlateEditer = app.asyncComponent('SlateEditer')
import style from './styles.scss';
import { columnList, getDepartmentAll, contributeView, contributeEdit, getDepartmentPage } from '@/services/contribute';
const contextConsumers = app.globalRedux.localRudexConsumers

@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class ContributeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: "",
                title: "",
                content: '',
                orgId: '',
                columnId: "",
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                realName: this.props.userInfo.realname
            },
            contentChange: false,
            columnData: [],
            departData: [],
            commonlyData:[],
            dataError: false,
            columnError: false,
            departError: false,
            version: '',
            saveLoading: false,
            draftLoading: false
        }
    }

    componentWillMount = () => {
        this.httpGetData();
        this.httpGetColumnList();
        this.httpGetDepartList();
        this.httpGetCommonlyList();
    }

    //查询稿件
    httpGetData = async () => {
        this.setState({
            dataError: false
        })
        let { data } = this.state;
        let params = {
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            id: this.props.match.params.id,
            isLockBy: false
        }
        let res = await contributeView(params);
        if (res.success) {
            let d = res.body;
            data.id = d.id;
            data.title = d.title;
            data.content = d.content;
            data.columnId = d.columnId ? d.columnId : "";
            data.orgId = d.orgId ? d.orgId : "";
            this.setState({
                data,
                dataError: false,
                version: Date.parse(new Date())
            });
        } else {
            this.setState({
                version: Date.parse(new Date()),
                dataError: true
            });
        }
    }

    //栏目列表
    httpGetColumnList = async () => {
        this.setState({
            columnError: false
        })
        let params = {
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            pageNo: 1,
            pageSize: 10000
        }
        let res = await columnList(params);
        if (res.success) {
            this.setState({
                columnData: res.body,
                columnError: false
            });
        } else {
            this.setState({
                columnError: true
            });
        }
    }

    //单位列表
    httpGetDepartList = async () => {
        this.setState({
            departError: false
        })
        let params = {
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            pageNo: 1,
            pageSize: 10000
        }
        let res = await getDepartmentAll(params);
        if (res.success) {
            this.setState({
                departData: res.body,
                departError: false
            });
        } else {
            this.setState({
                departError: true
            });
        }
    }
//单位常用列表
httpGetCommonlyList = async () => {
        this.setState({
            departError: false
        })
        let params = {
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            pageNo: 1,
            pageSize: 10000
        }
        let res = await getDepartmentPage(params);
        if (res.success) {
            this.setState({
                commonlyData: res.body.list,
                departError: false
            });
        } else {
            this.setState({
                departError: true
            });
        }
    }
    handleErrorMsg = (msg = '') => {
        notification.error({
            message: '错误提示',
            description: msg ? msg : ''
        });
    }

    handleOnChangeText = (e) => {
        let { data } = this.state;
        let len = this.handleTitleLen(e.target.value);
        if (len < 85) {
            data.title = e.target.value;
        } else {
            data.title = e.target.value.substring(0, 85);
        }
        this.setState({
            data,
            titleLen: data.title.length
        });
    }

    handleEditerOnChange = (value) => {
        let { data } = this.state;
        data.content = value;
        this.setState({
            data
        });
    }

    handleSelectOnChange = (name, value) => {
        let { data } = this.state;
        data[name] = value;
        this.setState({
            data
        });
    }

    handleTitleLen = (str) => {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
    }

    //发布
    handleSave = async () => {
        let { data, saveLoading, draftLoading } = this.state;
        if (saveLoading || draftLoading) return;
        if (!data.title) {
            this.handleErrorMsg("请填写标题"); return;
        }
        if (!data.orgId || !data.columnId) {
            this.handleErrorMsg("请选择你的投稿栏目或投稿单位"); return;
        }
        if (!data.content || data.content == '<p></p>') {
            this.handleErrorMsg("请填写内容"); return;
        }
        this.setState({
            saveLoading: true
        })
        let form = {
            ...data,
            status: '0'
        }
        let res = await contributeEdit(form);
        if (res.success) {
            this.setState({
                saveLoading: false
            })
            this.props.history.push("/contribute/index");
        } else {
            this.setState({
                saveLoading: false
            })
        }
    }

    //保存草稿
    handleSaveDraft = async () => {
        let { data, saveLoading, draftLoading } = this.state;
        if (saveLoading || draftLoading) return;
        if (!data.title) {
            this.handleErrorMsg("请填写标题"); return;
        }
        if (!data.content || data.content == '<p></p>') {
            this.handleErrorMsg("请填写内容"); return;
        }
        this.setState({
            draftLoading: true
        })
        let form = {
            ...data,
            status: '6'
        }
        let res = await contributeEdit(form);
        if (res.success) {
            this.setState({
                draftLoading: false
            })
            this.props.history.push("/contribute/index");
        } else {
            this.setState({
                draftLoading: false
            })
        }
    }

    render() {
        let { dataError, columnError, departError } = this.state;
        let { content } = this.state.data;
        let error = (dataError) ? true : false;
        return (
            <div className={style.fullWrap}>
                <BreadcrumbCmp />
                <div className={style.fullPage}>
                    <div className={style.scroll}>
                        <div className={style.fullPageBd}>
                            <div id="content_inline">
                                <div className={style.textHd}>
                                    <div className={style.textHdBox}>
                                        <Select
                                            placeholder="选择栏目"
                                            value={this.state.data.columnId + ""}
                                            onChange={(value) => this.handleSelectOnChange("columnId", value)}
                                            loading className={style.select}
                                            suffixIcon={<Icon
                                                type="down-circle"
                                                theme="filled"
                                                style={{ color: '#00a1ee', fontSize: '18px' }}
                                            />
                                            }
                                        >
                                            <Select.Option value="">选择栏目</Select.Option>
                                            {
                                                this.state.columnData.map(d => {
                                                    return <Select.Option key={d.id} value={d.id + ""}>{d.columnName}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div className={style.textHdBox}>
                                        <Select
                                            placeholder="选择单位"
                                            loading
                                            value={this.state.data.orgId + ""}
                                            onChange={(value) => this.handleSelectOnChange("orgId", value)}
                                            className={style.select}
                                            suffixIcon={<Icon
                                                type="down-circle"
                                                theme="filled"
                                                style={{ color: '#00a1ee', fontSize: '18px' }}
                                            />
                                            }
                                        >
                                            <Select.Option value="">选择单位</Select.Option>
                                            <Select.Option disabled value="">常用单位</Select.Option>
                                            {
                                                this.state.commonlyData.map(d => {
                                                    return <Select.Option key={d.orgId*1 + 89898989} value={d.orgId + ""}>{d.orgName}</Select.Option>
                                                })
                                            }
                                            <Select.Option disabled value="">所有单位</Select.Option>
                                            {
                                                this.state.departData.map(d => {
                                                    return <Select.Option key={d.id+ ""} value={d.id + ""}>{d.name}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className={style.texttl}>
                                    <input value={this.state.data.title} onChange={this.handleOnChangeText} placeholder="标题" />
                                    <span>{this.state.data.title.length}/85</span>
                                </div>
                                <SlateEditer
                                    version={this.state.version}
                                    value={content}
                                    contentChange={this.state.contentChange}
                                    onChange={this.handleEditerOnChange}
                                    scroll='content_inline'
                                    uploadConfig="me"
                                />

                                <div className={style.btnGroup}>
                                    <Button disabled={error} loading={this.state.saveLoading} type="primary" onClick={this.handleSave}>保存</Button>
                                    <Button disabled={error} loading={this.state.draftLoading} type="primary" onClick={this.handleSaveDraft}>保存草稿</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ContributeEdit;