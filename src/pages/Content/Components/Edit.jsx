/* global app */

import React, { Component } from "react";
import { Prompt, withRouter } from "react-router";

import { Input, Switch, Button, message, Checkbox, Modal } from "antd";
const confirm2 = Modal.confirm;

import jsonschema, { validator } from "@/globalApp/jsonschema";
import contentSchems from "@/schema/contentSchems";
import modeSchems from "@/schema/modeSchems";
import ContentLayout from '@/pages/A_Layout/ContentLayout';

import ImagesItem from "./ImagesItem";
import ColorPicker from "./ColorPicker/ColorPicker";
import InputItem from "./InputItem/InputItem";
import TextAreaItem from "./TextAreaItem/TextAreaItem";
import Attachment from "./Attachment/Attachment";
import CorrelationRead from './CorrelationRead/CorrelationRead';
import DatePickerItem from "./DatePickerItem/DatePickerItem";

import UrlItem from "./UrlItem/UrlItem";
import VideoItem from "./VideoItem/VideoItem";
import AudioItem from "./AudioItem/AudioItem";
import MultiPic from "./MultiPic/MultiPic";
const SlateEditer = app.asyncComponent('SlateEditer')
// import SlateEditer from '@/globalComponents/SlateEditer';
import SelectChannel from "./SelectChannel/SelectChannel";
import SelectITags from "./SelectITags/SelectITags";
import SelectIOrgs from "./SelectIOrgs/SelectIOrgs";
import SelectLeader from "./SelectLeader/SelectLeader";
import SelectITopic from "./SelectITopic/SelectITopic";
import SelectITpl from "./SelectITpl/SelectITpl";

const authors = [
    {
        key: "author",
        title: "作者"
    },
    {
        key: "editor",
        title: "编辑"
    },
    {
        key: "editorCharge",
        title: "责任编辑"
    },
    {
        key: "editorChief",
        title: "主编"
    },
    {
        key: "correspondent",
        title: "通讯员"
    }
];

import { modelTag } from '@/config/mark.config'

import styles from "./Edit.scss";
const initValue = {
    channelIds: [], //栏目id
    title: "", //标题
    description: "", //摘要
    shortTitle: "", //副标题
    author: "", //作者
    reprint: false, //是否转载
    mode: 0,
    recommend: false, //推荐
    mark: true, //水印
    isComment: false, //评论
    modelId: 0, // 0:文章，1：组图，2：视频，3：音频，4：外链，5：专栏
    titleImg: "", //图片一
    reads: "", //相关阅读
    dutyDepratment: "", //政务公开责任部门
    docNum: "" //政务公开文号
}

const contextConsumers = app.globalRedux.localRudexConsumers

@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
@withRouter
export default class Edit extends React.Component {
    static defaultProps = {
        isProps: false,
        form: {}
    };
    constructor(props) {
        super(props);
        let { isProps, form } = props;
        let { shortTitle } = form;
        let showShortTitle = shortTitle && shortTitle.length > 0;
        if (!isProps) {
            form = {
                ...initValue,
                ...form,
            };
        }
        if (form.modelId == 7) {
            form.dutyDepratment = form.dutyDepratment ? form.dutyDepratment : this.props.userInfo.siteName;
        }
        this.validator = validator(contentSchems["modelId" + form.modelId]);
        let { properties } = this.validator.init(form);
        this.state = {
            isInitDescription: isProps,
            form,
            showShortTitle,
            isEdit: false,
            properties,
            version: false,
            isloading: false
        };
    }
    componentDidMount() {
        let { id = 0, modelId } = this.props.form;
        let content = localStorages["content_" + modelId + "_" + id];
        let that = this;
        if (content) {
            confirm2({
                title: "编辑提醒",
                content: "上次有编辑未保存，是否从缓存中读取？",
                okText: "确定",
                cancelText: "取消",
                onOk() {
                    that.handleChangeForm(JSON.parse(content));
                    setTimeout(() => {
                        that.setState({
                            version: true
                        });
                    }, 1);
                },
                onCancel() { }
            });
        }
    }
    handleChange = (key, value) => {
        let data = {};
        data[key] = value;
        this.handleChangeForm(data);
    };

    handleReadOnChange = (ids) => {
        let data = {};
        data["reads"] = ids;
        this.handleChangeForm(data);
    }

    handleChangeForm = async (data = {}) => {
        let { properties } = this.validator.async(data);
        let { form, isEdit } = this.state;
        if (!isEdit) {
            window.addEventListener("beforeunload", this.handleBeforeunload);
        }

        if (form.modelId == 2) {
            form.title = form.title ? form.title : (data.mediaName ? data.mediaName : "");
        }
        if (form.modelId == 1) {
            let pic = data.pictureStr ? data.pictureStr : "";
            if (pic) {
                let img1 = pic[0] ? pic[0] : "";
                let img2 = pic[1] ? pic[1] : "";
                let img3 = pic[2] ? pic[2] : "";
                switch (form.mode) {
                    case 0:
                        form.titleImg = form.titleImg ? form.titleImg : (img1.path ? img1.path : "");
                        break;
                    case 1:
                        form.titleImg = form.titleImg ? form.titleImg : (img1.path ? img1.path : "");
                        form.typeImg = form.typeImg ? form.typeImg : (img2.path ? img2.path : "");
                        break;
                    case 2:
                        form.titleImg = form.titleImg ? form.titleImg : (img1.path ? img1.path : "");
                        form.typeImg = form.typeImg ? form.typeImg : (img2.path ? img2.path : "");
                        form.contentImg = form.contentImg ? form.contentImg : (img3.path ? img3.path : "");
                        break;
                }
            }
        }
        form = {
            ...form,
            ...data
        };
        if (form.mode == 3) {
            form.titleImg = ""
        }
        this.setState({
            form,
            properties,
            isEdit: true
        });
        let { id = 0, modelId } = form;
        localStorages["content_" + modelId + "_" + id] = JSON.stringify(form);
    };
    handleChangeShowShortTitle = e => {
        let { form } = this.state;
        let showShortTitle = e.target.checked;
        if (!showShortTitle) {
            form.shortTitle = "";
        }
        this.setState({
            showShortTitle,
            form
        });
    };
    handleChangeImages = images => {
        const keys = ["titleImg", "typeImg", "contentImg"];
        let { titleImg, typeImg, contentImg } = this.state.form;
        let imgs = {
            titleImg,
            typeImg,
            contentImg
        };
        let noimgs = keys
            .filter(k => imgs[k])
            .map(d => imgs[d]);
        let nhvalue = keys.filter(d => !imgs[d]);
        const adds = images.filter(d => {
            return !noimgs.includes(d.src);
        });
        adds.map((d, i) => {
            if (i < nhvalue.length) {
                imgs[nhvalue[i]] = d.src;
            }
        });
        return imgs;
    };
    handleChangeContent = (html, str, images) => {
        let imgs = this.handleChangeImages(images);
        let { isInitDescription } = this.state;
        if (!isInitDescription) {
            this.handleChangeForm({
                txt: html,
                ...imgs,
                description: str.replace(/\n/g, "").replace(/' '/g, "").substring(0, 180)
            });
        } else {
            this.handleChangeForm({
                txt: html,
                ...imgs
            });
        }
    };
    handleChangeDescription = (name, value) => {
        this.setState({
            isInitDescription: true
        });
        this.handleChange("description", value);
    };
    handleSubmit = (contribute = true) => {
        let { onSubmit } = this.props;
        let { form } = this.state;
        if (form.mode == 3) {
            form.titleImg = ""
        }
        let data = {
            ...form,
            contribute
        };
        // let validate = jsonschema(contentSchems["modelId" + form.modelId], data);
        // console.log(validate)
        let { valid, errors, properties } = this.validator.valid(data);
        this.setState({
            properties
        });
        if (!valid) {
            return message.error(errors[0].message);
        }
        let validatamodde = jsonschema(modeSchems["mode" + form.mode], data);
        if (!validatamodde.valid) {
            return message.error(validatamodde.errors[0].message);
        }
        this.setState({
            isEdit: false
        });
        let { id = 0, modelId } = data;
        localStorages.removeItem("content_" + modelId + "_" + id);
        window.removeEventListener("beforeunload", this.handleBeforeunload);
        if (onSubmit) {
            this.setState({ isloading: true })
            onSubmit(data).then(res => {
                if (!res.success) {
                    this.setState({
                        isloading: false,
                        isEdit: true
                    });
                } else {
                    this.setState({ isloading: false })
                }
            });
        }
    };
    handleBeforeunload = e => {
        let confirmationMessage = "还有内容未保存，确定离开吗？";
        (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
        return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
    };
    handleConfirm = location => {
        let { history } = this.props;
        let that = this;
        if (that.leave) {
            window.removeEventListener("beforeunload", this.handleBeforeunload);
            return true;
        }
        confirm2({
            title: "编辑提醒",
            content: "还有内容未保存，是否离开？",
            okText: "确定",
            cancelText: "取消",
            onOk() {
                that.leave = true;
                history.push(location);
            },
            onCancel() { }
        });
        return false;
    };
    render() {
        let { form, showShortTitle, isEdit, properties, version, isloading } = this.state;
        let { modelId } = form;
        return (
            <ContentLayout>
                <Prompt when={isEdit} message={this.handleConfirm} />
                <div className={styles.AtricleLeft}>
                    <div className={styles.left_inline} id='content_inline'>
                        <SelectChannel name={"channelIds"} value={form.channelIds} onChange={this.handleChange} />
                        <div className={styles.time}>
                            <span className={styles.t}>标题</span>
                            <InputItem
                                {...properties.title}
                                name={"title"}
                                value={form.title}
                                count={60}
                                maxLength={60}
                                onChange={this.handleChange}
                                placeholder="请输入标题"
                            />
                            <ColorPicker color={form.titleColor} onChange={this.handleChange} />
                            <Checkbox
                                className={styles.showShortTitle}
                                checked={showShortTitle}
                                onChange={this.handleChangeShowShortTitle}
                            >
                                副标题
                            </Checkbox>
                        </div>
                        {showShortTitle && (
                            <div className={styles.time}>
                                <span className={styles.t}>副标题</span>
                                <Input
                                    className={styles.input}
                                    value={form.shortTitle}
                                    maxLength={60}
                                    onChange={e => this.handleChange("shortTitle", e.target.value)}
                                    placeholder="副标题"
                                />
                            </div>
                        )}
                        {
                            modelId == modelTag.governOffice &&
                            <div className={styles.time}>
                                <span className={styles.t}>文号</span>
                                <InputItem
                                    name={"docNum"}
                                    value={form.docNum}
                                    onChange={this.handleChange}
                                    placeholder="请输入文号"
                                />
                                <span className={styles.t}>责任部门</span>
                                <InputItem
                                    {...properties.dutyDepratment}
                                    name={"dutyDepratment"}
                                    value={form.dutyDepratment}
                                    onChange={this.handleChange}
                                    placeholder="请输入责任部门"
                                />
                            </div>
                        }
                        {
                            (modelId == modelTag.governOffice && form.index) &&
                            <div className={styles.time}>
                                <span className={styles.t}>索引号</span>
                                <InputItem
                                    name={"title"}
                                    value={form.index}
                                    placeholder="索引号"
                                    disabled={true}
                                />
                            </div>
                        }
                        {modelId != modelTag.link && (
                            <div className={styles.time}>
                                <span className={styles.t}>来源</span>
                                <InputItem
                                    name={"origin"}
                                    value={form.origin}
                                    onChange={this.handleChange}
                                    placeholder="请输入来源"
                                    maxLength={30}
                                />
                                <Checkbox
                                    className={styles.showShortTitle}
                                    checked={form.reprint}
                                    onChange={e => this.handleChangeForm({ reprint: e.target.checked })}
                                >
                                    转载
                                </Checkbox>
                                <InputItem
                                    name={"originUrl"}
                                    value={form.originUrl}
                                    onChange={this.handleChange}
                                    disabled={!form.reprint}
                                    placeholder="URL"
                                    type="url"
                                />
                            </div>
                        )}
                        <div className={styles.time}>
                            {modelId == modelTag.article && (
                                <SlateEditer
                                    value={form.txt}
                                    mark={form.mark}
                                    modelId={form.modelId}
                                    version={version}
                                    onChange={this.handleChangeContent}
                                    scroll='content_inline'
                                    uploadConfig='all'
                                />
                            )}
                            {modelId == modelTag.governOffice && (
                                <SlateEditer
                                    value={form.txt}
                                    mark={form.mark}
                                    modelId={modelId}
                                    version={version}
                                    onChange={this.handleChangeContent}
                                    scroll='content_inline'
                                    uploadConfig='all'
                                />
                            )}
                            {modelId == modelTag.images && (
                                <MultiPic mark={form.mark} value={form.pictureStr} name="pictureStr" onChange={this.handleChange} />
                            )}
                            {modelId == modelTag.video && (
                                <VideoItem value={form.mediaPath} name="mediaPath" onChange={this.handleChangeForm} />
                            )}
                            {modelId == modelTag.audio && (
                                <AudioItem value={form.audioPath} name="audioPath" onChange={this.handleChangeForm} />
                            )}
                            {modelId == modelTag.link && (
                                <UrlItem value={form.link} onChange={e => this.handleChange("link", e.target.value)} />
                            )}
                        </div>
                    </div>
                    <div className={styles.submit}>
                        {/* <Button type="primary" onClick={() => this.handleSubmit()}>发布</Button> */}
                        <Button type="primary" loading={isloading} onClick={() => this.handleSubmit()}>保存</Button>
                        <Button
                            type="primary"
                            style={{ margin: "0 15px" }}
                            loading={isloading}
                            onClick={() => this.handleSubmit(false)}
                        >
                            保存草稿
                            </Button>
                    </div>
                </div>
                <div className={styles.AtricleRight}>
                    <div className={styles.lt}>
                        <div>
                            {/* <span className={styles.span}>推荐</span> */}
                            <Switch
                                checkedChildren="推荐"
                                unCheckedChildren="推荐"
                                checked={form.recommend}
                                onChange={value => this.handleChange("recommend", value)}
                            />
                        </div>
                        <div>
                            {/* <span className={styles.span}>推荐</span> */}
                            <Switch
                                // defaultChecked
                                checkedChildren="评论"
                                unCheckedChildren="评论"
                                checked={form.isComment}
                                onChange={value => this.handleChange("isComment", value)}
                            />
                        </div>
                        <div>
                            {/* <span className={styles.span}>推荐</span> */}
                            <Switch
                                // defaultChecked
                                checkedChildren="水印"
                                unCheckedChildren="水印"
                                checked={form.mark}
                                onChange={value => this.handleChange("mark", value)}
                            />
                        </div>
                    </div>
                    {/* <div className={styles.title}>{form.title}</div> */}
                    <ImagesItem data={form} onChange={this.handleChange} isOne={modelId == 1} />
                    <TextAreaItem
                        placeholder="摘要，限制500个字"
                        onChange={this.handleChangeDescription}
                        name="description"
                        value={form.description}
                        maxLength={500}
                    />
                    {authors.map(({ key, title }) => {
                        return (
                            <div className={styles.time} key={key}>
                                <Input
                                    className={styles.input}
                                    value={form[key]}
                                    onChange={e => this.handleChange(key, e.target.value)}
                                    placeholder={title}
                                    maxLength={50}
                                />
                            </div>
                        );
                    })}
                    <SelectITags name="tagStr" value={form.tagStr} onChange={this.handleChange} />
                    <div className={styles.time}>
                        <span className={styles.t}>发布时间</span>
                        <DatePickerItem
                            className={styles.st}
                            value={form.releaseDate}
                            name="releaseDate"
                            onChange={this.handleChange}
                            isInit={true}
                        />
                    </div>
                    <div className={styles.time}>
                        <span className={styles.t}>下线时间</span>
                        <DatePickerItem
                            className={styles.st}
                            value={form.pigeonholeDate}
                            name="pigeonholeDate"
                            onChange={this.handleChange}
                        />
                    </div>
                    <SelectLeader name="leadIds" value={form.leadIds} onChange={this.handleChange} />
                    <SelectIOrgs name="organizationIds" value={form.organizationIds} onChange={this.handleChange} />
                    <SelectITopic name="topicId" value={form.topicId} onChange={this.handleChange} />
                    <Attachment
                        multiple={true}
                        name="attachmentStr"
                        value={form.attachmentStr}
                        onChange={this.handleChange}
                        image={false}
                    />
                    <CorrelationRead value={form.reads} onChange={this.handleReadOnChange} />

                    <SelectITpl form={form} onChange={this.handleChange} />
                </div>
            </ContentLayout>
        );
    }
}
