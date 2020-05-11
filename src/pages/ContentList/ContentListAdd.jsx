import React, { Component } from "react";
import { message } from "antd";
import getTypeTreeData from "@/components/ContentList/dispatch/getTypeTreeData";
import getHashQuery from '@/utils/getHashQuery';
import Modal from "Components/Modal/Modal";
const { Warpper } = Modal;

import Step1 from "@/pages/ContentList/ContentListAdd/Step1";
import Step2 from "@/pages/ContentList/ContentListAdd/Step2";
import Step3 from "@/pages/ContentList/ContentListAdd/Step3";
import { httpContentListAdd, getContentListDetail, httpContentListUpdate } from "@/services/contentlist";
const contextConsumers = app.globalRedux.localRudexConsumers
@contextConsumers()
export default class ContentListAdd extends Component {
    constructor(props) {
        super(props);
        let { match } = this.props;
        let typeId = getHashQuery('typeId')
        let { id } = match.params;
        typeId = typeId || id;
        let action = id ? "edit" : "add";
        this.state = {
            step: 1,
            typeId,
            action,
            data: {
                typeId,
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
    }
    componentDidMount() {
        let { history } = this.props;
        let { typeId, action } = this.state;
        if (!typeId) {
            return history.replace("/contentlist");
        }
        if (action == "edit") {
            this.httpGet(typeId);
        }
    }
    httpGet = async id => {
        let res = await getContentListDetail({ id });
        if (res.message) {
            let data = this.formatIn(res.body);
            this.setState({
                data
            });
        }
    };
    handleChange = (name, value) => {
        let { data } = this.state;
        data[name] = value;
        this.setState({ data });
    };
    handleChangeData = (newData = {}) => {
        let { data } = this.state;
        data = { ...data, ...newData };
        this.setState({ data });
    };
    handleChangeStep = step => {
        this.setState({
            step
        });
    };
    handleNextStep = () => {
        let { data } = this.state;
        if (data.name.length == 0) {
            message.error("请输入内容列表名称！");
            return;
        }
        if (data.classify == 0) {
            this.httpSave();
        } else if (data.classify == 1) {
            this.setState({
                step: 2
            });
        } else if (data.classify == 2) {
            this.setState({
                step: 3
            });
        }
    };
    httpSave = () => {
        let { action } = this.state;
        let { data } = this.state;
        let formatdata = this.formatOut({ ...data });
        if (!formatdata) {
            return;
        }
        if (action == "add") {
            this.httpSaveAdd(formatdata);
        } else if (action == "edit") {
            this.httpSaveUpdate(formatdata);
        }
    };
    httpSaveAdd = async data => {
        let res = await httpContentListAdd(data);
        if (res.success) {
            message.success("新增内容列表成功！");
            console.log(this.props.dispatch);
            getTypeTreeData(this.props.dispatch);
            window.history.back();
        }
    };
    httpSaveUpdate = async data => {
        let res = await httpContentListUpdate(data);
        if (res.success) {
            message.success("保存成功！");
            getTypeTreeData(this.props.dispatch);
            window.history.back();
        }
    };
    handleBack = e => {
        window.history.back();
    };
    render() {
        let { match } = this.props;
        let title = match.params.id ? "修改内容列表" : "创建内容列表";
        let { step, data, action } = this.state;
        return (
            <Modal>
                <Warpper onClick={this.handleBack} title={title}>
                    {step == 1 && (
                        <Step1
                            data={data}
                            action={action}
                            onChange={this.handleChange}
                            onNextStep={this.handleNextStep}
                        />
                    )}
                    {step == 2 && (
                        <Step2
                            data={data}
                            action={action}
                            onChange={this.handleChangeData}
                            onChangeStep={this.handleChangeStep}
                            onSave={this.httpSave}
                        />
                    )}
                    {step == 3 && (
                        <Step3
                            data={data}
                            action={action}
                            onChange={this.handleChangeData}
                            onChangeStep={this.handleChangeStep}
                            onSave={this.httpSave}
                        />
                    )}
                </Warpper>
            </Modal>
        );
    }
    formatOut = data => {
        if (data.name.length == 0) {
            message.error("请输入内容列表名称！");
            return;
        }
        if (data.classify == 1) {
            if (data.channelStr.length == 0) {
                message.error("必须选择栏目！");
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
