import React, { Component } from "react";
import { Button, message } from "antd";
import vmsUploadFile from "@/Libs/Utils/upload_vms";
import sourcefilter from '../hooks/sourcefilter';
import audioImg from "./audio.jpg";
import { UploadBox, ListBox, FileProgress, FilesButton } from "../Components/UploadBox/index";
import styles from "./UploadFilesBox.scss";

export default class UploadFilesBox extends Component {
    static defaultProps = {
        type: "audio",
        keepData: false
    };
    state = {
        show: false,
        attachments: [],
        files: {}
    };
    show = (isShow = true) => {
        let { keepData } = this.props;
        let data = {
            show: isShow
        };
        if (!keepData) {
            data.attachments = [];
            data.files = {};
        }
        this.setState(data);
    };
    /**
     * 选择框选取文件
     */
    handleFileChange = e => {
        let { type } = this.props;
        sourcefilter(e, type, sitesConfig, this.handleFristUpload)
    };
    /**
     * 文件上传操作
     */
    handleFristUpload = file => {
        let { attachments, files } = this.state;
        let _id = attachments.length;
        files[_id] = file;
        let bloburl = URL.createObjectURL(file);
        attachments.push({
            fileName: file.name,
            fileType: file.type,
            size: file.size,
            state: 1, //1：上传中，2：上传失败，3：上传成功，
            bloburl: bloburl,
            progress: {
                start: 0,
                filesize: file.size
            }
        });
        this.setState({ attachments, files });
        this.handleFileUpload(file, _id);
    };
    /**
     * 重试上传失败的文件
     */
    handleRetry = () => {
        let { attachments, files } = this.state;
        attachments.map((attachment, index) => {
            if (attachment.state != 2) {
                return;
            }
            attachments[index].state = 1;
            this.setState({
                attachments
            });
            this.handleFileUpload(files[index], index);
        });
    };
    /**
     * 确定按钮
     */
    handleOk = () => {
        let { onOk } = this.props;
        let { attachments, files } = this.state;
        let successfiles = attachments.filter(d => {
            d.state == 3;
        });
        onOk && onOk(successfiles, attachments, files);
        this.setState({
            show: false
        });
    };
    render() {
        let { type, children } = this.props;
        let { attachments, show } = this.state;
        return [
            React.cloneElement(children, {
                onClick: this.show,
                key: "children"
            }),
            <UploadBox key="uploadbox" show={show} title={"音频上传"}>
                <ListBox onChange={this.handleFileChange}>
                    {attachments.map((d, i) => {
                        return (
                            <div className={styles.item} key={i}>
                                <img src={audioImg} className={styles.audio} />
                                <FileProgress state={d.state} progress={d.progress} />
                            </div>
                        );
                    })}
                </ListBox>
                <div className={styles.btns}>
                    <div className={styles.info}>
                        文件数：总
                        {attachments.length}个
                    </div>
                    <FilesButton accept={"audio/*"} onChange={this.handleFileChange} />
                    <Button type="primary" className={styles.btn} onClick={this.handleRetry}>
                        重试上传失败文件
                    </Button>
                    <Button type="primary" onClick={this.handleOk} className={styles.btn}>
                        确定
                    </Button>
                    <Button className={styles.btn} onClick={this.handleOk}>
                        关闭
                    </Button>
                </div>
            </UploadBox>
        ];
    }
    handleFileUpload = async (file, index) => {
        let { typeId } = this.props;
        let { attachments } = this.state;
        let res = await vmsUploadFile(file, { func_type: 2, typeId, onProgress: res => this.onProgress(res, index) });
        if (res.success) {
            attachments[index].state = 3;
            attachments[index].filePath = res.data.videoUrl;
        } else {
            attachments[index].state = 2;
        }
        this.setState({ attachments });
    };
    onProgress = (res, index) => {
        let { attachments } = this.state;
        attachments[index].progress = res;
        this.setState({ attachments });
    };
}
