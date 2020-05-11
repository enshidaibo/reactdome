/**
 * 高阶函数
 * 上传文件附件
 */
import React from "react";
import uuid from "uuid/v1";

import { httpFilesUploadAll } from "@/services/resource";

import convertSizeToBit from "./convertSizeToBit";
import convertImageToCanvas from "./convertImageToCanvas";
import convertDataUrlToFile from "./convertDataUrlToFile";

const uploadAttachments = Component =>
    class extends React.Component {
        static defaultProps = {
            value: [],
            image: true,
            multiple: false,
            maxsize: AppConfig.maxUploadSize || 1024 * 300, //设置小于300kb的图片不压缩
            width: AppConfig.imgUploadWidth || 1600, //设置图片压缩宽度
            height: AppConfig.imgUploadHeight || 900, //设置图片压缩高度
            cover: AppConfig.imgCover || false //图片是否裁剪
        };
        constructor(props) {
            super(props);
            let attachments = props.value.map(d => {
                return {
                    ...d,
                    uid: uuid()
                };
            });
            this.state = {
                attachments,
                files: {}
            };
        }
        /**
         * 选择框选取文件
         */
        handleFileChange = e => {
            let { image } = this.props;
            let files = e.target.files || e.dataTransfer.files;
            for (let index = 0; index < files.length; index++) {
                if (image && files[index].type !== "image/gif") {
                    this.handleImageUpload(files[index]);
                } else {
                    this.handleFileUpload(files[index]);
                }
            }
        };
        /**
         * 文件上传操作
         */
        handleFileUpload = async file => {
            let { multiple } = this.props;
            let { attachments, files } = this.state;
            let uid = uuid();
            if (!multiple) {
                attachments = [];
                files = {};
            }
            files[uid] = file;
            let bloburl = URL.createObjectURL(file);
            attachments.push({
                name: file.name,
                size: file.size,
                type: file.type,
                uid: uid,
                state: 1, //1：上传中，2：上传失败，3：上传成功，
                bloburl: bloburl
            });
            this.setState({ attachments, files });
            let res = await httpFilesUploadAll({
                uploadFile: file,
                type: "attach"
            });
            let attachmentIndex = attachments.findIndex(d => {
                return d.uid == uid;
            });
            if (res.success) {
                attachments[attachmentIndex].state = 3;
                attachments[attachmentIndex].path = res.body.uploadPath;
            } else {
                attachments[attachmentIndex].state = 2;
            }
            this.setState({ attachments });
            this.handleChange({ attachments });
        };
        /**
         * 图片上传操作
         */
        handleImageUpload = async file => {
            // console.log(file.slice(0, 1000));
            let { maxsize, multiple, cover, width, height } = this.props;
            if (file.size < maxsize) {
                return this.handleFileUpload(file);
            }
            let { attachments, files } = this.state;
            let uid = uuid();
            if (!multiple) {
                attachments = [];
                files = {};
            }
            files[uid] = file;
            let bloburl = URL.createObjectURL(file);
            attachments.push({
                name: file.name,
                size: file.size,
                type: file.type,
                state: 1, //1：上传中，2：上传失败，3：上传成功，
                bloburl: bloburl
            });
            this.setState({ attachments, files });
            let image = new Image();
            image.src = bloburl;
            image.onload = async () => {
                let canvas = convertImageToCanvas(image, width, height, cover);
                let DataURL = canvas.toDataURL(file.type);
                let upfile = convertDataUrlToFile(DataURL, file.name, file.type);
                let res = await httpFilesUploadAll({
                    uploadFile: upfile,
                    type: "attach"
                });
                if (res.success) {
                    attachments[uid].state = 3;
                    attachments[uid].path = res.body.uploadPath;
                } else {
                    attachments[uid].state = 2;
                    console.log(res.message);
                }
                this.setState({ attachments });
                this.handleChange({ attachments });
            };
        };
        /**
         * 删除操作
         */
        handleDel = e => {
            e.stopPropagation();
            e.preventDefault();
            let uid = e.target.dataset.uid;
            let { attachments, files } = this.state;
            attachments = attachments.filter(d => {
                return d.uid != uid;
            });
            delete files[uid];
            this.setState({ attachments, files });
            this.handleChange({ attachments });
        };
        handleChange = ({ attachments = this.state.attachments }) => {
            let { onChange, name } = this.props;
            let value = [];
            attachments.map(attachment => {
                if (attachment.state == 3 || !attachment.state) {
                    value.push({
                        size: attachment.size,
                        name: attachment.name,
                        type: attachment.type,
                        path: attachment.path
                    });
                }
            });
            onChange && onChange(name, value);
        };
        render() {
            let { attachments, value } = this.state;
            return (
                <Component
                    {...this.props}
                    onChange={this.handleFileChange}
                    onDel={this.handleDel}
                    size={convertSizeToBit}
                    attachments={attachments}
                    value={value}
                />
            );
        }
    };

export default uploadAttachments;
