/**
 * 高阶函数
 * 上传文件附件(爆料)
 */
import React from "react";
import uuid from "uuid/v1";

import convertSizeToBit from "./convertSizeToBit";
import convertImageToCanvas from "./convertImageToCanvas";
import convertDataUrlToFile from "./convertDataUrlToFile";

import { uploadfile } from '@/services'

const ReportUpload = Component =>
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
            let { value } = props;
            let attachments = [];
            if (value.length > 0) {
                attachments = value;
            }
            this.state = {
                attachments,
                files: {}
            };
        }
        /**
         * 选择框选取文件
         */
        handleFileChange = e => {
            let files = e.target.files || e.dataTransfer.files;
            this.handleImageUpload(files[0]);
        };

        /**
         * 图片上传操作
         */
        handleImageUpload = async file => {
            let { cover, width, height } = this.props;
            let { attachments, files } = this.state;
            let _id = 0;
            files[_id] = file;
            let bloburl = URL.createObjectURL(file);
            attachments = [];
            attachments.push({
                name: file.name,
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
                let res = await uploadfile({
                    uploadFile: upfile,
                    type: "0",
                    fileType: "1" //图片
                });
                if (res.success) {
                    attachments[_id].state = 3;
                    attachments[_id].url = res.body[0].url;
                    attachments[_id].path = res.body[0].path;
                } else {
                    attachments[_id].state = 2;
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
                        name: attachment.name,
                        type: attachment.type,
                        url: attachment.url,
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

export default ReportUpload;
