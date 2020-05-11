/**
 * 专栏
 */

import React, { Component } from "react";
import { httpTopicAdd, httpTopicUpdate } from "@/services/content";

import { Input, Switch, Button, message, Icon } from "antd";

import moment from "moment";
import "moment/locale/zh-cn";

import jsonschema from "@/globalApp/jsonschema";
import contentSchems from "@/schema/contentSchems";
import topicAppSchems from "@/schema/topicAppSchems";
import ContentLayout from '@/pages/A_Layout/ContentLayout';
import SpecialtyEditContent from "./SpecialtyEditContent";

import TopicAppStyle from "./TopicAppStyle/TopicAppStyle";
import SinglePicture from "./ImagesItem/SinglePicture";
import ColorPicker from "./ColorPicker/ColorPicker";
import InputItem from "./InputItem/InputItem";
import TextAreaItem from "./TextAreaItem/TextAreaItem";
import DatePickerItem from "./DatePickerItem/DatePickerItem";

import SelectChannel from "./SelectChannel/SelectChannel";
import SelectITags from "./SelectITags/SelectITags";
import SelectLeader from "./SelectLeader/SelectLeader";
import SelectIOrgs from "./SelectIOrgs/SelectIOrgs";

import ContentList from "@/components/ContentList";

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

import styles from "./Edit.scss";

import { withRouter } from "react-router-dom";
@withRouter
export default class Specialty extends React.Component {
    static defaultProps = {
        form: {
            shortTitle: "", //副标题
            author: "", //作者
            reprint: false, //是否转载
            mode: 0,
            recommend: false, //推荐
            mark: false, //水印
            isComment: true, //评论
            modelId: 0, // 0:文章，1：组图，2：视频，3：音频，4：外链，5：专栏
            tagStr: [],
            channelIds: [], //栏目id
            topicLogo: "",
            topicAppStyle: 0, //：专栏app样式，0:专栏单图左，1：专栏单图下，2：专栏三图，3：列表；4：大图滑动；5：幻灯片；6一行两列
            //
            name: "", //名称
            classify: 0, //类型(0手动,1自动,2共享)
            description: "", //描述备注
            // isimitRows: false,
            limitRows: 5, //限制行数
            isShare: false, //是否共享
            shareName: "", //共享名称
            // shareType: null //共享分类
            order: 0, //排序方式
            models: [], //内容模型id
            channelStr: [], //栏目id
            keyWord: [], //关键词
            releaseDateRange: 0, //发布时间范围
            isThumb: false, //是否有缩略图
            channelSiteId: localStorages._site_id_param * 1
        }
    };
    constructor(props) {
        super(props);
        let { channelIds, isProps, form } = props;
        let data = {
            ...form
        };
        if (isProps) {
            data = this.formatIn(data);
        } else {
            data.channelIds = channelIds;
        }
        this.state = {
            form: data,
            edit: false,
            step: 1,
            isEdit: true
        };
    }
    handleChange = (key, value) => {
        let { form, isEdit } = this.state;
        if (isEdit) {
            window.addEventListener("beforeunload", this.handleBeforeunload);
        }
        form[key] = value;
        this.setState({
            form,
            isEdit: false
        });
    };
    handleChangeData = (newData = {}) => {
        let { form } = this.state;
        form = { ...form, ...newData };
        this.setState({ form });
    };
    handleChangeStep = step => {
        this.setState({
            step
        });
    };
    handleChangeTime = (name, value) => {
        let d = moment(value).format("YYYY-MM-DD HH:mm:ss");
        this.handleChange(name, d);
    };
    handleSubmit = async (contribute = true) => {
        let { action } = this.props;
        let { form } = this.state;
        let data = {
            ...form,
            contribute
        };
        let validate = jsonschema(contentSchems["modelId5"], data);
        if (!validate.valid) {
            return message.error(validate.errors[0].message);
        }
        let validatamodde = jsonschema(topicAppSchems["mode" + form.topicAppStyle], data);
        if (!validatamodde.valid) {
            return message.error(validatamodde.errors[0].message);
        }
        let formatdata = this.formatOut(validate.data);
        if (!formatdata) {
            return;
        }
        if (action == "add") {
            let res = await httpTopicAdd(formatdata);
            if (res.success) {
                this.setState({
                    isEdit: true
                });
                window.removeEventListener("beforeunload", this.handleBeforeunload);
                this.props.history.replace(`/content/${res.body}`);
            }
        } else if (action == "edit") {
            let res = await httpTopicUpdate(formatdata);
            if (res.success) {
                this.setState({
                    isEdit: true
                });
                window.removeEventListener("beforeunload", this.handleBeforeunload);
                message.success("保存成功！");
            }
        }
    };
    handleBeforeunload = e => {
        let confirmationMessage = "还有内容未保存，确定离开吗？";
        (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
        return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
    };
    handleConfirm = location => {
        let res = confirm("还有内容未保存，确定离开吗？");
        if (res) {
            window.removeEventListener("beforeunload", this.handleBeforeunload);
        }
        return res;
    };
    handleEditShow = () => {
        this.setState({
            edit: true
        });
    };
    handleChangeState = (data = {}) => {
        this.setState(data);
    };
    render() {
        let { action } = this.props;
        let { form, edit, step } = this.state;
        return (
            <ContentLayout>
                <div className={styles.AtricleLeft}>
                    <div className={styles.left_inline}>
                        <SelectChannel name={"channelIds"} value={form.channelIds} onChange={this.handleChange} />
                        <div className={styles.time}>
                            <span className={styles.t}>标题</span>
                            <InputItem
                                name={"name"}
                                value={form.name}
                                count={60}
                                onChange={this.handleChange}
                                placeholder="请输入标题"
                            />
                            <ColorPicker color={form.titleColor} onChange={this.handleChange} />
                        </div>
                        {action == "add" && (
                            <div className={styles.addContentbox}>
                                <Button type="primary" className={styles.addContent} onClick={this.handleEditShow}>
                                    <Icon style={{ fontSize: "30px" }} type="file-text" />
                                    <div>创建内容</div>
                                </Button>
                                {edit && (
                                    <SpecialtyEditContent
                                        data={form}
                                        step={step}
                                        action={action}
                                        onChangeStep={this.handleChangeStep}
                                        onChange={this.handleChange}
                                        onChangeData={this.handleChangeData}
                                        onChangeState={this.handleChangeState}
                                    />
                                )}
                            </div>
                        )}
                        {action == "edit" && <div style={{ marginTop: "0.15rem " }}><ContentList curItem={form} sectionId={form.topicId} /></div>}
                    </div>
                    <div className={styles.submit}>
                        <Button type="primary" onClick={() => this.handleSubmit()}>发布</Button>
                        <Button
                            type="primary"
                            style={{ margin: "0 15px" }}
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
                    </div>
                    <SinglePicture
                        name="topicLogo"
                        title="上传头像"
                        style={{ margin: "15px 0 0" }}
                        src={form.topicLogo}
                        onChange={this.handleChange}
                    />
                    <TopicAppStyle onChange={this.handleChange} data={form} />
                    <TextAreaItem
                        placeholder="摘要，限制128个字"
                        onChange={this.handleChange}
                        name="description"
                        value={form.description}
                        count={128}
                    />
                    {authors.map(({ key, title }) => {
                        return (
                            <div className={styles.time} key={key}>
                                <Input
                                    className={styles.input}
                                    value={form[key]}
                                    onChange={e => this.handleChange(key, e.target.value)}
                                    placeholder={title}
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
                </div>
            </ContentLayout>
        );
    }
    formatOut = data => {
        if (data.name.length == 0) {
            message.error("请输入内容列表名称！");
            return;
        }
        if (data.classify == 1) {
            if (data.channelStr.length == 0) {
                message.error("内容列表必须选择栏目！");
                return;
            }
        }
        data.channelStr = data.channelStr.join(",");
        data.models = data.models.join(",");
        data.keyWord = data.keyWord.join(",");
        return data;
    };
    formatIn = data => {
        data.channelStr = this.formaSplit(data.channelStr);
        data.models = this.formaSplit(data.models);
        data.keyWord = this.formaSplit(data.keyWord);
        return data;
    };
    formaSplit = data => {
        return data && data.length > 0 ? data.split(",") : [];
    };
}
