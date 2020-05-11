/*
* 报料详情
* */
import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";

import Review from "./Detail/Review";
import Reply from "./Detail/Replys";
import Replied from "./Detail/Replied";
import NoProcess from "./Detail/NoProcessed";
import ReplyList from "./Detail/ReplyList";

import { Modal } from 'antd';
import Footer from "./Detail/Footer";
import styles from "./ReportDetail.scss";
export default class ReportDetail extends React.Component {
    constructor(props) {
        super(props);
        let { match } = this.props;
        this.state = {
            detail: null,
            id: match.params.id,
            visible: false,
            path: "" //原图地址
        };
    }

    componentDidMount() {
        this.getReportDetail();
    }
    /*
    * 报料详情
    * */
    getReportDetail = async () => {
        let { id } = this.state;
        let res = await app.yssjfetch.post("admin/web/bl/detail", { id: id });
        if (res.code == "200") {
            this.setState({
                detail: res.body
            });
        }
    };

    /*
    * 查看原图
    * */
    handleView = (path) => {
        this.setState({
            visible: true,
            path: path
        });
    };
    /*
    * 关闭
    * */
    handleClose = () => {
        this.setState({
            visible: false,
            path: ""
        });
    };

    render() {
        let { detail, id, visible, path } = this.state;
        return (
            <div className={styles.div}>
                <BreadcrumbCmp />
                {detail &&
                    (detail.status == "0" ? (
                        <Review id={id} userId={detail.userId} callBack={this.getReportDetail} />
                    ) : detail.status == "1" ? (
                        <Reply id={id} userId={detail.userId} callBack={this.getReportDetail} />
                    ) : detail.status == "2" ? (
                        <Replied id={id} callBack={this.getReportDetail} />
                    ) : (
                                    <NoProcess id={id} status={detail.status} callBack={this.getReportDetail} />
                                ))}
                {
                    detail && (
                        <div>
                            <div className={styles.detail}>
                                <div className={styles.title}>{detail.title}</div>
                                <div className={styles.content}>
                                    {detail.content}
                                    {detail.fileList.length <= 0 ?
                                        "" : (
                                            <div className={styles.file}>
                                                {detail.fileList.map(file => {
                                                    if (file.fileType == "1") {
                                                        //图片
                                                        return <p>
                                                            <img src={(file.thumbnail != undefined && file.thumbnail.length <= 0) ? file.thirdUrl : file.thumbnailUrl} />
                                                            <br />
                                                            {(file.thumbnail != undefined && file.thumbnail.length > 0) && <spam onClick={() => { this.handleView(file.thirdUrl) }} className={styles.view}>查看原图</spam>}
                                                        </p>;
                                                    } else if (file.fileType == "0") {
                                                        //视频
                                                        return <p><video controls="controls" src={file.thirdUrl} /></p>;
                                                    }
                                                })}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div>
                                {detail.status == "2" || detail.status == "3" ? (
                                    <ReplyList
                                        id={detail.id}
                                        replyTime={detail.replyTime}
                                        callBack={this.getReportDetail}
                                        reply={detail.reply}
                                        status={detail.status}
                                    />
                                ) : (
                                        ""
                                    )}
                            </div>
                            <div className={styles.footer}>
                                {" "}
                                <Footer data={detail} />
                            </div>
                        </div>
                    )}
                <Modal
                    width={800}
                    visible={visible}
                    title="查看图片"
                    onCancel={this.handleClose}
                    maskClosable={false}
                    footer={null}
                >
                    <img src={path} />
                </Modal>
            </div>
        );
    }
}
