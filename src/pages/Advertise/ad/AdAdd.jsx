import React, { Component } from 'react';
import { Input, Divider, Button, Row, Col, TreeSelect, Icon, notification } from 'antd';

import { getAgencyList, getPxList, saveAdver } from "@/services/advertise";
import { verifyUrl } from "../verify";

import PageContent from "../component/PageContent";
import PageWrap from '../component/PageWrap';
import FormItem from "./comp/FormItem";
import PxAdver from "./comp/PxAdver";
import PxListItem from "./comp/PxListItem";
import ThumbAdd from "./comp/ThumbAdd";
import Back from "../component/Back";

import adStyle from './ad.scss';
import "../base.css";

const { TreeNode } = TreeSelect;

class AdAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pxAllList: [],
            agencyAllList: [],
            selectPxList: [],
            adver: {
                adsName: "",
                merId: "",
                adsTime: "",
                thumb: "",
                adsResList: []
            }
        }
    }

    componentWillMount = () => {
        this.httpGetPxAll();
        this.httpGetAgencyAll();
    }

    httpGetPxAll = async () => {
        let res = await getPxList();
        let { pxAllList } = this.state;

        if (res.success) {
            pxAllList = res.data.list;
            this.setState({
                pxAllList
            });
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    httpGetAgencyAll = async () => {
        let res = await getAgencyList();
        let { agencyAllList } = this.state;
        if (res.success) {
            agencyAllList = res.data.list;
            this.setState({
                agencyAllList
            });
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    httpSaveAdver = async () => {
        let { adver, selectPxList } = this.state;
        if (!adver.adsName) {
            notification.warning({
                message: '参数错误',
                description: '请填写广告名称',
            });
            return;
        } else if (adver.adsName.length > 64) {
            notification.warning({
                message: '参数错误',
                description: '广告名称长度超出限制',
            });
            return;
        } else if (!adver.adsTime || parseInt(adver.adsTime) != adver.adsTime || parseInt(adver.adsTime) <= 0) {
            notification.warning({
                message: '参数错误',
                description: '请填写播放时长且播放时长大于0的数字',
            });
            return;
        } else if (!adver.merId) {
            notification.warning({
                message: '参数错误',
                description: '请选择广告商',
            });
            return;
        } else if (!adver.thumb) {
            notification.warning({
                message: '参数错误',
                description: '请选择缩略图',
            });
            return;
        } else if (selectPxList.length <= 0) {
            notification.warning({
                message: '参数错误',
                description: '请指定分辨率,并填写广告地址',
            });
            return;
        }
        let arr = [];
        let flag = false;
        for (let i = 0, len = selectPxList.length; i < len; i++) {
            if (verifyUrl(selectPxList[i].url) === false) {
                flag = true;
                notification.warning({
                    message: '参数错误',
                    description: '存在无效的广告地址, 请重新输入',
                });
                break;
            }
            let t = {
                res: {
                    id: selectPxList[i].id
                },
                adsUrl: selectPxList[i].url
            };
            arr.push(t);
        }
        if (flag) return;
        adver.adsResList = arr;

        let res = await saveAdver(adver);
        if (res.success) {
            this.props.history.push("/advertise/ad");
        } else {
            notification.error({
                message: '请求失败',
                description: res.msg,
            });
            return;
        }
    }

    handleTreeSelectChange = (name, v) => {
        let { adver } = this.state;
        adver[name] = v;
        this.setState({
            adver
        });
    }

    handleTextChange = (name, e) => {
        let { adver } = this.state;
        adver[name] = e.target.value;
        this.setState({
            adver
        });
    }

    handleUrlChange = (v, data) => {
        let { selectPxList } = this.state;
        let list = selectPxList.map(d => {
            let t = {
                ...d
            }
            if (data.id == d.id) {
                t.url = v;
            }
            return t;
        });
        this.setState({
            selectPxList: list
        });
    }

    handleDel = () => {
        let { adver } = this.state;
        adver.thumb = "";
        this.setState({
            adver
        });
    }

    handleThumbClick = (data) => {
        let { adver } = this.state;
        adver.thumb = data.thumb;
        this.setState({
            adver
        });
    }

    handleAddPx = (data) => {
        let t = {
            ...data,
            url: ""
        };
        let { selectPxList, pxAllList } = this.state;
        let list = pxAllList.map(d => {
            if (data.id === d.id) {
                d.status = false;
            }
            return d;
        });
        selectPxList.push(t);
        this.setState({
            selectPxList,
            pxAllList: list
        });
    }

    handleRemove = (data) => {
        let { selectPxList, pxAllList } = this.state;
        let select = [];
        selectPxList.map(d => {
            if (data.id !== d.id) {
                select.push(d);
            }
        });

        let all = pxAllList.map(d => {
            if (data.id === d.id) {
                d.status = true;
            }
            return d;
        });
        this.setState({
            selectPxList: select,
            pxAllList: all
        });
    }

    render() {
        let { adver, pxAllList, selectPxList, agencyAllList } = this.state;
        return (
            <PageContent>
                <PageWrap>
                    <div className={adStyle.hd}>
                        <Back history={this.props.history} />
                    </div>
                    <div>
                        <div className="ad-form">
                            <FormItem label="广告名称">
                                <Input className={adStyle.input}
                                    placeholder="请输入广告名称"
                                    value={adver.adsName}
                                    onChange={(e) => this.handleTextChange("adsName", e)}
                                />
                            </FormItem>
                            <FormItem label="广告商">
                                <TreeSelect
                                    style={{ width: 320 }}
                                    value={adver.merId}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择广告商"
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={(v) => this.handleTreeSelectChange("merId", v)}
                                >
                                    <TreeNode value="" title="请选择广告商" key="0-1" />
                                    {
                                        (agencyAllList && agencyAllList.length > 0) &&
                                        agencyAllList.map(d => {
                                            return <TreeNode value={d.id} title={d.name} key={d.id} />;
                                        })
                                    }
                                </TreeSelect>
                            </FormItem>
                            <FormItem label="播放时长">
                                <Input className={adStyle.input}
                                    placeholder="请输入播放时长"
                                    value={adver.adsTime}
                                    onChange={(e) => this.handleTextChange("adsTime", e)}
                                />
                            </FormItem>
                            <FormItem label="缩略图">
                                <ThumbAdd thumb={adver.thumb} thumbClick={this.handleThumbClick} delClick={this.handleDel} />
                            </FormItem>
                        </div>
                        <div>
                            <div className={"pxBox"}>
                                <FormItem label="分辨率">
                                </FormItem>
                            </div>
                            <Row>
                                <Col xs={{ offset: 2, span: 18 }} sm={{ offset: 3, span: 18 }}>
                                    <div className={adStyle.pxForm + " row"}>
                                        <div className={adStyle.left + " fx"}>
                                            {
                                                selectPxList.map((d, i) => {
                                                    return <PxAdver data={d} onChange={this.handleUrlChange} btnClick={this.handleRemove} key={i} />
                                                })
                                            }
                                        </div>
                                        <div className={adStyle.right}>
                                            {
                                                pxAllList.map((d, i) => {
                                                    return <PxListItem select={selectPxList} data={d} key={i} btnOnClick={this.handleAddPx} />
                                                })
                                            }
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <FormItem offset>
                                <Button onClick={this.httpSaveAdver} style={{ width: '120px' }} type="primary">保存</Button>
                            </FormItem>
                        </div>
                    </div>
                </PageWrap>
            </PageContent>
        );
    }
}

export default AdAdd;