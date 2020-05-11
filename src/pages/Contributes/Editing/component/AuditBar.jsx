import React, { Component } from 'react';
import { Button, notification, Menu, Dropdown, message } from 'antd';
import { Link } from 'react-router-dom';
import { contributeStatus, contributeScore } from '@/services/contribute';
import style from './styles.scss';
const contextConsumers = app.globalRedux.localRudexConsumers

@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class AuditBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            isScore: false
        }
    }

    //采用
    handleUse = async () => {
        let form = {
            id: this.props.entityId,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            statusIndex: '1',
            realName: this.props.userInfo.realname
        }
        let res = await contributeStatus(form);
        if (res.success) {
            this.props.history.goBack();
        }
    }

    //一键发表
    handlePublish = async () => {
        this.props.history.push(`/content/add?modelId=0&contributeid=${this.props.entityId}`);
    }

    //撤回
    handleRecall = async () => {
        let form = {
            id: this.props.entityId,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            statusIndex: '0',
            realName: this.props.userInfo.realname
        }
        let res = await contributeStatus(form);
        if (res.success) {
            this.props.history.goBack();
        }
    }

    //退稿
    handleBack = async () => {
        let form = {
            id: this.props.entityId,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            statusIndex: '3',
            realName: this.props.userInfo.realname
        }
        let res = await contributeStatus(form);
        if (res.success) {
            this.props.history.goBack();
        }
    }

    //设为单计稿
    handleAlone = async () => {
        let form = {
            id: this.props.entityId,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            statusIndex: '5',
            realName: this.props.userInfo.realname
        }
        let res = await contributeStatus(form);
        if (res.success) {
            this.props.history.goBack();
        }
    }

    //评分
    handleScore = async (score) => {
        if (this.state.isScore) return;
        this.setState({ isScore: true });
        let form = {
            id: this.props.entityId,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            realName: this.props.userInfo.realname,
            score: score
        }
        let res = await contributeScore(form);
        if (res.success) {
            this.props.onScore && this.props.onScore();
            message.success('评分成功', 1);
        } else {
            message.error('评分失败' + (res.message ? ": " + res.message : ""), 1);
        }
        this.setState({ isScore: false });
    }

    //评分
    handleScore = async (score) => {
        if (this.state.isScore) return;
        this.setState({ isScore: true });
        let form = {
            id: this.props.entityId,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            realName: this.props.userInfo.realname,
            score: score
        }
        let res = await contributeScore(form);
        if (res.success) {
            this.props.onScore && this.props.onScore();
            message.success('评分成功', 1);
        } else {
            message.error('评分失败' + (res.message ? ": " + res.message : ""), 1);
        }
        this.setState({ isScore: false });
    }

    handleRouteBack = () => {
        this.props.history.goBack();
    }

    handleErrorMsg = (msg = '') => {
        notification.error({
            message: '错误提示',
            description: msg ? msg : ''
        });
    }

    render() {
        let id = this.props.entityId;
        let { status, score } = this.props;
        let grade = "";
        if (score === "1" || score === 1) {
            grade = "A";
        } else if (score === "2" || score === 2) {
            grade = "B";
        } else if (score === "3" || score === 3) {
            grade = "C";
        } else if (score === "4" || score === 4) {
            grade = "D";
        } else {
            grade = "";
        }
        let canPublish = status == "0" || status == "1" ? true : false;
        let canBack = (status == "0" || status == "3") ? false : true;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={() => this.handleScore('1')}>A</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => this.handleScore('2')}>B</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => this.handleScore('3')}>C</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => this.handleScore('4')}>D</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={style.pageHd}>
                <Button onClick={this.handleRouteBack}>返回列表</Button>
                {
                    status == "0" &&
                    <Button disabled={id ? false : true} onClick={this.handleUse}>采用</Button>
                }
                {
                    canPublish &&
                    <Button disabled={id ? false : true} onClick={this.handlePublish}>一键发表</Button>
                }
                {
                    canBack &&
                    <Button disabled={id ? false : true} onClick={this.handleRecall}>撤回</Button>
                }
                {
                    (status == "0" || status == "1") &&
                    <Button disabled={id ? false : true} onClick={this.handleBack}>退稿</Button>
                }
                {
                    (status == "0" || status == "1") &&
                    <Button disabled={id ? false : true} onClick={this.handleAlone}>设为单计稿</Button>
                }
                {
                    (status !== '4' || status !== '6') &&
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button loading={this.state.isScore} disabled={id ? false : true}>
                            {
                                grade ? "已评为" + grade : "评分"
                            }
                        </Button>
                    </Dropdown>
                }
            </div>
        )
    }
}

export default AuditBar;