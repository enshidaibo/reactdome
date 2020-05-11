import React, { Component } from "react";
import { Button, Icon, Modal, Input, Select, Table, Pagination, message, Spin } from "antd";

import { getChannelTree } from "@/services/channel";
import { getContentList } from "@/services/content";
import flattenChannels from '../../hooks/flattenChannels';
const Option = Select.Option;


import styles from "./CorrelationRead.scss";
import "./CorrelationRead.css";

export default class CorrelationRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedData: this.props.value ? this.props.value : [],
            contentData: {
                list: [],
                total: 0
            },
            contentModal: false,
            contentListParams: {
                pageNo: 1,
                pageSize: 10,
                cid: 0+"",
                modelId: "",
                queryTopLevel: false, //置顶
                queryRecommend: false, //推荐
                queryShare: 0, //共享
                queryStatus: "checked", //状态
                queryOrderBy: 4,
                queryTitle: "", //搜索标题
                queryInputUsername: "" //搜索发布人
            },
            channelTreeData: [],
            moduleTypeData: [
                {id: "0", name: "图文"},
                {id: "1", name: "组图"},
                {id: "2", name: "视频"},
                {id: "3", name: "音频"},
                {id: "4", name: "外链"},
                {id: "5", name: "专栏"},
                {id: "7", name: "政务"}
            ],
            spinning: false
        };
    }

    httpGetChannel = async () => {
        let { channelTreeData } = this.state;
        let res = await getChannelTree();
        if(res.success){
            let flattenChannel = flattenChannels(res.body);
            this.setState({
                channelTreeData: flattenChannel
            });
        }
    }

    httpGetContent = async () => {
        let { contentListParams, contentData }  =this.state;
        this.setState({
            spinning: true
        });
        let res = await getContentList(contentListParams);
        if(res.success){
            contentData.list = res.body;
            contentData.total = res.totalCount
            this.setState({
                contentData,
                spinning: false
            });
        }else{
            this.setState({
                spinning: false
            });
            message.error('获取文章列表失败');
        }
    }

    handleAddBtn = () => {
        let { contentListParams, contentData } = this.state;
        contentListParams.pageNo = 1;
        contentData.total = 0;
        contentData.list = [];
        this.setState({
            contentModal: true,
            contentListParams,
            contentData
        }, () => {
            this.httpGetContent();
            this.httpGetChannel();
        });
    }

    handleContentOk = () => {
        this.setState({
            contentModal: false
        });
    }

    handleContentCancel = () => {
        this.setState({
            contentModal: false
        });
    }

    handlePageOnChange = (page, pageSize) => {
        let { contentListParams } = this.state;
        contentListParams.pageNo = page;
        this.setState({
            contentListParams
        }, () => {
            this.httpGetContent();
        });
    }

    handleAddContent = (obj) => {
        let { selectedData } = this.state;
        if(selectedData.length>=10){
            message.warning('篇数已达10篇!');
            return;
        }
        let arr = [];
        for(let i=0, len=selectedData.length; i<len; i++){
            if(obj.id!=selectedData[i].id){
                arr.push(selectedData[i]);
            }
        }
        arr.push(obj);
        this.setState({
            selectedData: arr.length > 10 ? arr.slice(0, 10) : arr
        });
        let ids = arr.map(d=>{
            let t = {
                id: d.id,
                name: d.title
            }
            return t;
        });
        ids = JSON.stringify(ids);
        this.props.onChange && this.props.onChange(ids);
    }

    handleMoveContent = (obj) => {
        let { selectedData } = this.state;
        let arr = [];
        for(let i=0, len=selectedData.length; i<len; i++){
            if(obj.id!=selectedData[i].id){
                arr.push(selectedData[i]);
            }
        }
        this.setState({
            selectedData: arr
        });
        let ids = arr.map(d=>{
            let t = {
                id: d.id,
                name: d.title
            }
            return t;
        });
        ids = JSON.stringify(ids);
        this.props.onChange && this.props.onChange(ids);
    }

    channelOnChange = (v) => {
        let { contentListParams, contentData } = this.state;
        contentListParams.cid = v;
        contentListParams.pageNo = 1;
        contentData.total = 0;
        contentData.list = [];
        this.setState({
            contentListParams,
            contentData
        }, () => {
            this.httpGetContent();
        });
    }   

    modelOnChange = (v) => {
        let { contentListParams, contentData } = this.state;
        contentListParams.modelId = v;
        contentListParams.pageNo = 1;
        contentData.total = 0;
        contentData.list = [];
        this.setState({
            contentListParams,
            contentData
        }, () => {
            this.httpGetContent();
        });
    }

    onSearch  =(v) => {
        let { contentListParams, contentData } = this.state;
        contentListParams.pageNo=1;
        contentData.total = 0;
        contentData.list = [];
        contentListParams.queryTitle = v;
        this.setState({
            contentListParams,
            contentData
        }, () => {
            this.httpGetContent();
        });
    }

    render() {
        let { selectedData, contentModal, contentData, contentListParams, channelTreeData, moduleTypeData, spinning } = this.state;
        let { pageSize, pageNo } = contentListParams;
        return (
            <div className={styles.readWrap}>
                <div className={styles.readHead}>
                    <div className={styles.readLabel}>
                        相关阅读
                    </div>
                    <div className={styles.readBtn}>
                        <span onClick={this.handleAddBtn}><i></i>相关阅读</span>
                    </div>
                </div>
                <PanelLi btnOnClick={this.handleMoveContent} checkData={selectedData}/>
                <Modal
                    visible={contentModal}
                    title="相关阅读"
                    onOk={this.handleContentOk}
                    onCancel={this.handleContentCancel}
                    footer={null}
                    bodyStyle={{padding: '15px 10px', background: '#f1f1f1'}}
                    width="760px"
                >
                    <div className={styles.modalContentWrap}>
                        <div className={styles.modalContentLeft}>
                            <div className={styles.modalContentBar}>
                                <div style={{marginRight: '10px'}}>
                                    <Select value={contentListParams.cid} style={{ width: 140 }} onChange={this.channelOnChange}>
                                        <Option value="0">全部内容</Option>
                                        {
                                            channelTreeData.map(d => {
                                                return <Option key={d.id} value={d.id}>{d.name}</Option>
                                            })
                                        }
                                    </Select>
                                </div>
                                <div style={{marginRight: '10px'}}>
                                    <Select value={contentListParams.modelId} onChange={this.modelOnChange} style={{ width: 80 }}>
                                        <Option value="">模型</Option>
                                        {
                                            moduleTypeData &&
                                            moduleTypeData.map(d=>{
                                                return <Option key={d.id} value={d.id}>{d.name}</Option>
                                            })
                                        }
                                    </Select>
                                </div>
                                <div>
                                    <Input.Search
                                        placeholder="搜索标题"
                                        enterButton="搜索"
                                        onSearch={this.onSearch}
                                    />
                                </div>
                            </div>
                            <div className={styles.modalContentContainer}>
                                <Spin spinning={spinning}>
                                    <ModalContentLi btnOnClick={this.handleAddContent} contentData={contentData.list} />
                                    <div className={styles.modalContentPage}>
                                    {
                                        contentData.total > 0 &&
                                        <Pagination size="small" 
                                            total={contentData.total} 
                                            pageSize={pageSize}
                                            current={pageNo}
                                            onChange={this.handlePageOnChange}
                                        />
                                    }   
                                    </div>
                                </Spin>
                            </div>
                        </div>
                        <div className={styles.modalContentRight}>
                            <div className={styles.modalCheckTitle}>
                                <span>已选择{selectedData.length}篇内容</span>
                            </div>
                            <ModalCheckLi btnOnClick={this.handleMoveContent} checkData={selectedData} />
                        </div>
                    </div>
                    <div className={styles.modalFooterWrap}>
                        <span onClick={this.handleContentCancel} className={styles.modalFtBtn}>取消</span>
                        <span onClick={this.handleContentOk} className={styles.modalFtBtn}>确定</span>
                    </div>
                </Modal>
            </div>
        );
    }
}

class PanelLi extends Component {
    handleBtnOnClick = d => {
        this.props.btnOnClick && this.props.btnOnClick(d);
    }

    render() {
        let { checkData } = this.props;
        checkData = checkData ? checkData : [];
        return (
            <ul className={styles.readBody}>
            {
                checkData.map((d, i) => {
                    return (
                        <li key={i} className={styles.readLi}>
                            <span onClick={() => this.handleBtnOnClick(d)} className={styles.readMoveBtn}>━</span>
                            <div className={styles.readTxt}>
                                <span className={styles.readBadge}>{i+1}</span>
                                <span>{d.title}</span>
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        )
    }
}

class ModalContentLi extends Component {

    handleBtnOnClick = d => {
        this.props.btnOnClick && this.props.btnOnClick(d);
    }
    
    render() {
        let { contentData, checkData } = this.props;
        contentData = contentData ? contentData : [];
        checkData = checkData ? checkData : [];
        return (
            <ul className={styles.modalContentList}>
            {
                contentData.map((d, i) => {
                    return (
                        <li key={i} className={styles.modalContentLi}>
                            <span onClick={() => this.handleBtnOnClick(d)} className={styles.modalContentBtn}>添加</span>
                            <div className={styles.modalContentTxt}>{d.title}</div>
                        </li> 
                    )
                })
            }
            </ul>
        )
    }
}

class ModalCheckLi extends Component {

    handleBtnOnClick = d => {
        this.props.btnOnClick && this.props.btnOnClick(d);
    }

    render () {
        let { checkData }  =this.props;
        checkData = checkData ? checkData : [];
        return (
            <ul className={styles.modalCheckList}>
            {
                checkData.map((d, i) => {
                    return (
                        <li key={i} className={styles.modalContentLi}>
                            <span onClick={() => this.handleBtnOnClick(d)} className={styles.modalCheckBtn}>移除</span>
                            <div className={styles.modalContentTxt}>{d.title}</div>
                        </li>
                    )
                })
            }
            </ul>
        )
    }
}
