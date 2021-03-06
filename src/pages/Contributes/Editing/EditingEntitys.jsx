import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button, Badge, Table, notification, Popconfirm, Spin, Tabs, Input, Avatar, Timeline, Tag } from 'antd';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { contributeView, contributeUnLock, replyList, replySave, replyDel, replyUpdate, contributeRecord } from '@/services/contribute';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import style from './styles.scss';
const contextConsumers = app.globalRedux.localRudexConsumers

import AsideBar from './component/AsideBar';
import AuditBar from './component/AuditBar';
@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class EditingEntitys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                id: this.props.match.params.id,
                userName: this.props.userInfo.username,
                siteId: this.props.userInfo.siteId,
                token: sessionStorage.token,
                isLockBy: true,
                realName: this.props.userInfo.realname
            },
            data: "",
            replyData: [],
            recordData: [],
            tgErrMsg: '',
            tgErr: false,
            replayForm: {
                userName: this.props.userInfo.username,
                siteId: this.props.userInfo.siteId,
                token: sessionStorage.token,
                reportId: this.props.match.params.id,
                content: "",
                realName: this.props.userInfo.realname,
                isLockBy: true
            },
            replyErr: false,
            replyErrMsg: "",
            recordErr: false,
            recordErrMsg: '',
            tgFetch: false,
            replyFetch: false,
            recordFetch: false,
            tgSucc: false,
            replySucc: false,
            recordSucc: false,
            badge: 0
        }
    }

    componentWillMount = () => {
        this.httpGetTg();
    }

    componentWillUnmount = () => {
        let { params } = this.state;
        contributeUnLock(params);
    }

    handleTabOnChange = key => {
        switch (key) {
            case "1":
                this.httpGetTg(); break;
            case "2":
                this.setState({ badge: 0 });
                this.httpGetReply(); break;
            case "3":
                this.httpGetRecord(); break;
        }
    }

    httpGetRecord = async () => {
        if (this.state.recordSucc) return;
        this.setState({
            recordErr: false,
            recordFetch: true,
            recordErrMsg: ''
        });
        let params = {
            userName: this.props.userInfo.username,
            siteId: this.props.userInfo.siteId,
            token: sessionStorage.token,
            reportId: this.props.match.params.id
        }
        let res = await contributeRecord(params);
        if (res.success) {
            this.setState({
                recordFetch: false,
                recordSucc: true,
                recordErr: false,
                recordData: res.body,
                recordErrMsg: ''
            });
        } else {
            this.setState({
                recordErr: true,
                recordFetch: false,
                recordSucc: false,
                recordErrMsg: "获取线索记录列表失败，　错误原因：" + res.message
            });
        }
    }

    httpGetReply = async () => {
        if (this.state.replySucc) return;
        this.setState({
            replyErr: false,
            replyFetch: true,
            replyErrMsg: ''
        });
        let params = {
            userName: this.props.userInfo.username,
            siteId: this.props.userInfo.siteId,
            token: sessionStorage.token,
            reportId: this.props.match.params.id
        }
        let res = await replyList(params);
        if (res.success) {
            this.setState({
                replyErr: false,
                replyFetch: false,
                replySucc: true,
                replyErrMsg: '',
                replyData: res.body.list
            });
        } else {
            this.setState({
                replyErr: true,
                replyFetch: false,
                replySucc: false,
                replyErrMsg: '获取回复列表失败, 错误原因: ' + (res.message)
            });
        }
    }

    //稿件
    httpGetTg = async () => {
        if (this.state.tgSucc) return;
        let { params } = this.state;
        this.setState({
            tgErr: false,
            tgFetch: true,
            tgErrMsg: ''
        });
        let res = await contributeView(params);
        if (res.success) {
            this.setState({
                data: res.body,
                badge: res.body.notReadMessage,
                tgErr: false,
                tgErrMsg: 'sss',
                tgFetch: false,
                tgSucc: true
            });
        } else {
            this.setState({
                tgErr: true,
                tgErrMsg: res.message,
                tgFetch: false,
                tgSucc: false
            });
        }
    }

    handleReloadTg = () => {
        this.setState({ tgSucc: false }, () => this.httpGetTg());
    }

    handleReloadReply = () => {
        this.setState({ replySucc: false }, () => this.httpGetReply());
    }

    handleReloadRecord = () => {
        this.setState({ recordSucc: false }, () => this.httpGetRecord());
    }

    handleReply = async () => {
        let { replayForm } = this.state;
        if (!replayForm.content.replace(/(^\s*)|(\s*$)/g, "")) {
            this.handleErrorMsg("请填写回复内容");
            return;
        }
        let res = await replySave(replayForm);
        if (res.success) {
            replayForm.content = "";
            this.setState({
                replayForm,
                replySucc: false
            }, () => this.httpGetReply());
        }
    }

    handleReplyUpdate = async (reply) => {
        let form = {
            userName: this.props.userInfo.username,
            siteId: this.props.userInfo.siteId,
            token: sessionStorage.token,
            realName: this.props.userInfo.realname
        }
        let res = await replyUpdate(form);
        if (res.success) {
            this.httpGetReply();
        }
    }

    handleReplyDel = async (id) => {
        let form = {
            userName: this.props.userInfo.username,
            siteId: this.props.userInfo.siteId,
            token: sessionStorage.token,
            realName: this.props.userInfo.realname,
            id: id
        }
        let res = await replyDel(form);
        if (res.success) {
            this.httpGetReply();
        }
    }

    handleTextAreaOnChange = (e) => {
        let { replayForm } = this.state;
        replayForm.content = e.target.value;
        this.setState({
            replayForm
        });
    }

    handleOnScore = () => {
        this.setState({
            tgSucc: false
        }, () => this.httpGetTg());
    }

    handleSetStatus = status => {
        let t = '';
        switch (status) {
            case "0":
                t = <span style={{ color: '#e89843' }}>待采用</span>; break;
            case "1":
                t = <span style={{ color: '#00a2ed' }}>待发表</span>; break;
            case "2":
                t = <span style={{ color: '#8ec792' }}>已发表</span>; break;
            case "3":
                t = <span style={{ color: '#b80000' }}>已退稿</span>; break;
            case "4":
                t = <span style={{ color: '#8ec792' }}>回收站</span>; break;
            case "5":
                t = <span style={{ color: '#00a3c6' }}>单计稿</span>; break;
            case "6":
                t = <span style={{ color: '#8ec792' }}>草稿</span>; break;
            default:
                t = ''; break;
        }
        return t;
    }

    handleErrorMsg = (msg = '') => {
        notification.error({
            message: '错误提示',
            description: msg ? msg : ''
        });
    }

    render() {
        let { replyData } = this.state;
        let { username } = this.props.userInfo;

        return (
            <div className={style.page}>
                <BreadcrumbCmp />
                <div className={style.pageBody}>

                    <AsideBar history={this.props.history} />

                    <div className={style.pageWrap}>

                        <AuditBar
                            entityId={this.state.data ? this.state.data.id : ''}
                            status={this.state.data ? this.state.data.status : ''}
                            history={this.props.history}
                            onScore={this.handleOnScore}
                            score={this.state.data.score}
                        />

                        <div className={style.pageMain}>
                            <div className={style.pageScroll}>
                                <Tabs onChange={(key) => this.handleTabOnChange(key)}>
                                    <Tabs.TabPane tab="稿件" key="1">
                                        <Spin spinning={this.state.tgFetch}>
                                            {
                                                this.state.tgErr ?
                                                    <div className={style.err}>
                                                        <div>{this.state.tgErrMsg}</div>
                                                        <a onClick={this.handleReloadTg}>重新加载</a>
                                                        /
                                            <Link to={`/contribute/editing`}>返回列表</Link>
                                                    </div>
                                                    :
                                                    <div>
                                                        <div className={style.entityTitle}>
                                                            <h4>{this.state.data.title}</h4>
                                                            <p>
                                                                <span>投稿时间:{this.state.data.firstReportTime}</span>
                                                                <span>栏目:{this.state.data.columnName}</span>
                                                                <span>投稿人:{this.state.data.createBy}</span>
                                                                <span>手机:{this.state.data.phone}</span>
                                                                <span>状态:{this.handleSetStatus(this.state.data.status)}</span>
                                                            </p>
                                                        </div>
                                                        <div className={style.entityContent} dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
                                                    </div>
                                            }
                                        </Spin>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab={<Badge count={this.state.badge}>回复</Badge>} key="2">
                                        <Spin spinning={this.state.replyFetch}>
                                            {
                                                this.state.replyErr
                                                    ?
                                                    <div className={style.err}>
                                                        <div>{this.state.replyErrMsg}</div>
                                                        <a onClick={this.handleReloadReply}>重新加载</a>
                                                    </div>
                                                    :
                                                    <div className={style.replyWrap}>
                                                        <ul>
                                                            {
                                                                replyData.map(d => {
                                                                    let t = new Date(d.createTime);
                                                                    let str = t.getFullYear() + '-' + (
                                                                        (t.getMonth() + 1) < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1)
                                                                    ) + '-' + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + ' ' + (
                                                                            t.getHours() < 10 ? "0" + t.getHours() : t.getHours() + ""
                                                                        ) + ":" + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes())
                                                                    d.createTime = str;
                                                                    return d.sendUser == username
                                                                        ?
                                                                        <li key={d.id + ''} className={style.replyRight}>
                                                                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} icon="user" />
                                                                            <div className={style.content}>
                                                                                <div className={style.user}><span>{d.createTime}</span><span>{d.sendUser}</span></div>
                                                                                <div className={style.descri}>{d.content}</div>
                                                                            </div>
                                                                        </li>
                                                                        :
                                                                        <li key={d.id + ''} className={style.replyLeft}>
                                                                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                                                                            <div className={style.content}>
                                                                                <div className={style.user}><span>{d.sendUser.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')}</span> <span>{d.createTime}</span></div>
                                                                                <div className={style.descri}
                                                                                    style={{ color: `${d.readFlag === 0 ? "#f56a00" : ''}` }}
                                                                                >
                                                                                    {d.content}
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                })
                                                            }
                                                        </ul>
                                                        <div className={style.fxRight}>
                                                            <a onClick={this.handleReply}>回复</a>
                                                            <div className={style.fx1}>
                                                                <Input.TextArea
                                                                    value={this.state.replayForm.content}
                                                                    onChange={this.handleTextAreaOnChange}
                                                                    placeholder="请输入回复内容" autosize={{ minRows: 2 }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </Spin>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="动态" key="3">
                                        <Spin spinning={this.state.recordFetch}>
                                            {
                                                this.state.recordErr
                                                    ?
                                                    <div className={style.err}>
                                                        <div>{this.state.recordErrMsg}</div>
                                                        <a onClick={this.handleReloadRecord}>重新加载</a>
                                                    </div>
                                                    :
                                                    <Timeline>
                                                        {
                                                            this.state.recordData.map(d => {
                                                                return (
                                                                    <Timeline.Item key={d.id}><Tag>{d.createTimeStr}</Tag> {d.content}</Timeline.Item>
                                                                )
                                                            })
                                                        }
                                                    </Timeline>
                                            }
                                        </Spin>
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditingEntitys;