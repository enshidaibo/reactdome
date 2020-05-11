import React, { Component } from 'react';
import { Select, Icon, Button, notification } from 'antd';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
const SlateEditer = app.asyncComponent('SlateEditer')
import style from './styles.scss';
import { columnList, getDepartmentAll, contributeAdd, contributeEdit, getDepartmentPage } from '@/services/contribute';
const contextConsumers = app.globalRedux.localRudexConsumers

@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class ContributeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
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
            columnError: false,
            departError: false,
            titleLen: 0,
            saveLoading: false,
            draftLoading: false
        }
    }

    componentWillMount = () => {
        console.log(this.props.userInfo);
        this.httpGetColumnList();
        this.httpGetDepartList();
        this.httpGetCommonlyList();
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
            if(res.body.list&&res.body.list.length==1){
                let data=this.state.data
                data.orgId=res.body.list[0].orgId
                this.setState({
                    data
                });
            }
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
        if(value*1>89898988){
            value=(value*1-89898989)+''
        }
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
        let res = await contributeAdd(form);
        if (res.success) {
            this.setState({
                saveLoading: false
            });
            this.props.history.push("/contribute/index");
        } else {
            this.setState({
                saveLoading: false
            });
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
        });
        let form = {
            ...data,
            status: '6'
        }
        let res = await contributeAdd(form);
        if (res.success) {
            this.setState({
                draftLoading: false
            });
            this.props.history.push("/contribute/index");
        } else {
            this.setState({
                draftLoading: false
            });
        }
    }

    render() {
        let { columnError, departError } = this.state;
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
                                            showSearch
                                            optionFilterProp="children"
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
                                                    return <Select.Option key={d.id + ""} value={d.id + ""}>{d.columnName}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div className={style.textHdBox}>
                                        <Select
                                            placeholder="选择单位"
                                            showSearch
                                            optionFilterProp="children"
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
                                            <Select.Option disabled value="a" style={{color:'#136eb5'}}>常用单位</Select.Option>
                                            {
                                                this.state.commonlyData.map(d => {
                                                    return <Select.Option key={d.orgId*1 + 89898989} value={d.orgId*1 + 89898989}>{d.orgName}</Select.Option>
                                                })
                                            }
                                            <Select.Option disabled value="b" style={{color:'#136eb5'}}>所有单位</Select.Option>
                                            {
                                                this.state.departData.map(d => {
                                                    return <Select.Option key={d.id + ""} value={d.id + ""}>{d.name}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className={style.texttl}>
                                    <input value={this.state.data.title} onChange={this.handleOnChangeText} placeholder="标题" />
                                    <span>{this.state.titleLen}/85</span>
                                </div>
                                <SlateEditer
                                    value={this.state.data.content}
                                    contentChange={this.state.contentChange}
                                    onChange={this.handleEditerOnChange}
                                    scroll='content_inline'
                                    uploadConfig="me"
                                />
                                <div className={style.btnGroup}>
                                    <Button
                                        type="primary"
                                        onClick={this.handleSave}
                                        loading={this.state.saveLoading}
                                    >
                                        发布
                                    </Button>
                                    <Button
                                        type="primary"
                                        loading={this.state.draftLoading}
                                        onClick={this.handleSaveDraft}
                                    >
                                        保存草稿
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContributeAdd;