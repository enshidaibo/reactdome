import React, { Component } from "react";
import { Button, message, Radio, Select } from "antd";
const RadioGroup = Radio.Group;
const Option = Select.Option;
import modeSchems from "@/schema/modeSchems";
import topicAppSchems from "@/schema/topicAppSchems";

import Modal from "@/Libs/Components/Modal/Modal";
const { Warpper, Groups, Input, Btns, ItemLabel } = Modal;

import SingleLeft from "@/pages/Content/Components/ImagesItem/SingleLeft";
import SingleBottom from "@/pages/Content/Components/ImagesItem/SingleBottom";
import MultiBottom from "@/pages/Content/Components/ImagesItem/MultiBottom";
import TopicAppStyleMode from "@/pages/Content/Components/TopicAppStyle/TopicAppStyleMode";
import { getContentListItemDetail, getContentListLabel, httpContentListItemUpdate } from "@/services/contentlist";
import styles from "./EditDetail.scss";

class EditContent extends Component {
    static defaultProps = {
        ishistory: false
    };
    constructor(props) {
        super(props);
        this.state = {
            data: Immutable(props.data || {}),
            labelData: []
        };
    }
    componentDidMount() {
        this.getData();
        this.getLabelData();
    }
    getData = async () => {
        let { data } = this.props;
        if (!data.id || data._isEdit) {
            return;
        }
        let res = await getContentListItemDetail({ id: data.id });
        if (res.success) {
            this.setState({
                data: Immutable(res.body)
            });
        }
    };
    getLabelData = async () => {
        let res = await getContentListLabel();
        if (res.success) {
            this.setState({
                labelData: Immutable(res.body)
            });
        }
    };
    handleChange = (name, value) => {
        let { data } = this.state;
        data = data.set(name, value);
        this.setState({ data });
    };
    handleSubmit = async e => {
        e.preventDefault();
        let { ishistory, list, onChangeList } = this.props;
        let { data, labelData } = this.state;
        let labelColors = labelData.find(d => {
            return d.name == data.label;
        });
        if (labelColors) {
            data = data.set("labelColor", labelColors.labelColor);
        }
        let validatamodde
        if (data.isTopic) {
            validatamodde = app.jsonschema(topicAppSchems["mode" + data.topicAppStyle], data);
        } else {
            validatamodde = app.jsonschema(modeSchems["mode" + data.mode], data);
        }
        if (!validatamodde.valid) {
            return message.error(validatamodde.errors[0].message);
        }
        if (ishistory) {
            let res = await httpContentListItemUpdate(data);
            if (res.success) {
                message.success("保存成功！");
                this.props.getHttpData();
                this.props.onChange({ visible: false });
            }
        } else {
            list = list.map(d => {
                if (d.sort == data.sort) {
                    return {
                        ...data,
                        _isEdit: true
                    };
                }
                return d;
            });
            onChangeList(list);
            this.props.onChange({ visible: false });
        }
    };
    render() {
        let { onChange } = this.props;
        let { data, labelData } = this.state;
        return (
            <Modal>
                <Warpper title={"编辑内容"} onClick={() => onChange({ visible: false })}>
                    <form onSubmit={this.handleSubmit}>
                        <Groups>
                            <Input title={`标题`} name="title" value={data.title} onChange={this.handleChange} />
                            <Input
                                title={`副标题`}
                                name="shortTitle"
                                value={data.shortTitle}
                                onChange={this.handleChange}
                            />
                            <Input
                                title={`摘要`}
                                name="description"
                                value={data.description}
                                onChange={this.handleChange}
                            />
                        </Groups>
                        <Groups>
                            <ItemLabel title={`标签设置`}>
                                <Select
                                    className={styles.select}
                                    style={{ width: "100%" }}
                                    value={data.label}
                                    onChange={label => this.handleChange("label", label)}
                                    placeholder="请选择标签"
                                >
                                    {labelData.map((d, i) => (
                                        <Option key={i} value={d.name}>
                                            {d.name}
                                        </Option>
                                    ))}
                                </Select>
                            </ItemLabel>
                            {data.isTopic
                                ? [
                                    <ItemLabel title={`显示模式`} key={"topic"}>
                                        <RadioGroup
                                            onChange={e => this.handleChange("topicAppStyle", e.target.value)}
                                            value={data.topicAppStyle}
                                        >
                                            <Radio value={0}>单图</Radio>
                                            <Radio value={1}>大图</Radio>
                                            <Radio value={2}>三图</Radio>
                                            <Radio value={3}>列表</Radio>
                                            <Radio value={4}>大图滑动</Radio>
                                            <Radio value={5}>幻灯片</Radio>
                                            <Radio value={6}>一行两列</Radio>
                                            <Radio value={12}>长图固定</Radio>
                                            <Radio value={11}>长图滑动</Radio>
                                            <Radio value={13}>上下滑动</Radio>
                                        </RadioGroup>
                                    </ItemLabel>,
                                    <ItemLabel title={" "} key={"topicmode"}>
                                        <div style={{ width: "300px" }}>
                                            <TopicAppStyleMode data={data} onChange={this.handleChange} />
                                        </div>
                                    </ItemLabel>
                                ]
                                : [
                                    <ItemLabel title={`显示模式`} key={"notopic"}>
                                        <RadioGroup
                                            onChange={e => this.handleChange("mode", e.target.value)}
                                            value={data.mode}
                                        >
                                            <Radio value={0}>单图</Radio>
                                            <Radio value={1}>大图</Radio>
                                            <Radio value={2}>三图</Radio>
                                            <Radio value={3}>无图</Radio>
                                        </RadioGroup>
                                    </ItemLabel>,
                                    <ItemLabel title={" "} key={"notopicmode"}>
                                        <div style={{ width: "300px" }}>
                                            {data.mode == 0 && (
                                                <SingleLeft
                                                    name="titleImg"
                                                    title={data.title}
                                                    src={data.titleImg}
                                                    onChange={this.handleChange}
                                                />
                                            )}
                                            {data.mode == 1 && (
                                                <SingleBottom
                                                    name="titleImg"
                                                    title={data.title}
                                                    src={data.titleImg}
                                                    onChange={this.handleChange}
                                                />
                                            )}
                                            {data.mode == 2 && (
                                                <MultiBottom data={data} onChange={this.handleChange} />
                                            )}
                                            {data.mode == 3 && <div>{data.title}</div>}
                                        </div>
                                    </ItemLabel>
                                ]}
                        </Groups>
                        <Btns>
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                        </Btns>
                    </form>
                </Warpper>
            </Modal>
        );
    }
}

export default class EditDetail extends Component {
    state = {
        visible: false
    };
    handleChangeState = data => {
        this.setState(data);
    };
    render() {
        let { children, ...props } = this.props;
        let { visible } = this.state;
        return [
            React.cloneElement(children, {
                onClick: () => this.setState({ visible: true })
            }),
            visible && <EditContent key={`modal`} {...props} onChange={this.handleChangeState} />
        ];
    }
}
