/*
* 增加报料栏目
* */
import React from "react";
import { Input, Modal, message, Form, Switch } from "antd";
import styles from "./Add.scss";
const { TextArea } = Input;
const { Item } = Form;
import reportSchems from "@/schema/reportSchems";
import useData from '@/hooks/useData';
import { updateReportColumn } from '@/services/report';

import ImageUpload from "../Upload/Attachment";

const Add = ({ callBackData }) => {
    const [data, setData] = useData({
        columnName: "",
        columnProfile: "",
        telephone: "",
        email: "",
        weChat: "",
        weiBo: "",
        isShowPic: "0",
        yssjId: localStorages._site_id_param,
        url: "",
        id: "",
        logo: ""
    })
    const [status, setStatus] = useData({
        visible: false,
        confirmLoading: false,
    })

    const handleChange = e => {
        let ndata = {}
        ndata[e.target.name] = e.target.value
        setData(ndata)
    };
    /*
    * 弹框
    */
    const handleAdd = () => setStatus({ visible: true });
    const handleCancel = () => setStatus({ visible: false });
    /*
   * 提交
   * */
    const handleOk = async () => {
        let rs = app.jsonschema(reportSchems, data);
        if (!rs.valid) {
            message.error(rs.errors[0].message);
            return false;
        }
        setStatus({ confirmLoading: true })
        let res = await updateReportColumn(data);
        if (res.success) {
            message.success("添加成功", 1);
            callBackData();
            setStatus({ visible: false, confirmLoading: false })
            setData({
                columnName: "",
                columnProfile: "",
                telephone: "",
                email: "",
                weChat: "",
                weiBo: "",
                isShowPic: "0",
                yssjId: localStorages._site_id_param,
                url: "",
                id: "",
                logo: ""
            })
        } else {
            setStatus({ confirmLoading: false })
        }
    };
    /*
    * 图片显示切换
    * */
    const handlePictureChange = checked => setData({ isShowPic: checked ? "0" : "1" })
    /*
    * logo上传
    * */
    const handleFileChange = (name, value) => {
        if (value.length > 0) {
            setData({ url: value[0].url, logo: value[0].path })
        } else {
            setData({ url: '', logo: '' })
        }
    };
    let { visible, confirmLoading } = status;
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
    };
    return (
        <div className={styles.title}>
            <span>报料栏目</span>
            <span className={`iconfont icon-add ${styles.icon}`} title="新增栏目" onClick={handleAdd} />
            <Modal
                title="新增栏目"
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                onOk={handleOk}
                cancelText="取消"
                okText="确定"
                destroyOnClose={true}
                zIndex={99}
            >
                <Item {...formItemLayout} label="栏目名称" required={true}>
                    <Input
                        placeholder="请输入栏目名称，保持在7字以内"
                        name="columnName"
                        onChange={handleChange}
                    />
                </Item>
                <Item {...formItemLayout} label="栏目简介" required={true}>
                    <TextArea
                        placeholder="请输入栏目简介，保持在200字以内"
                        name="columnProfile"
                        onChange={handleChange}
                        rows={3}
                    />
                </Item>
                <Item {...formItemLayout} required={true} label="报料电话">
                    <Input
                        placeholder="请输入报料电话"
                        type="number"
                        name="telephone"
                        onChange={handleChange}
                    />
                </Item>
                <Item {...formItemLayout} label="报料邮箱">
                    <Input placeholder="请输入报料邮箱" name="email" onChange={handleChange} />
                </Item>
                <Item {...formItemLayout} label="官方微信">
                    <Input placeholder="请输入官方微信" name="weChat" onChange={handleChange} />
                </Item>
                <Item {...formItemLayout} label="官方微博">
                    <Input placeholder="请输入官方微博" name="weiBo" onChange={handleChange} />
                </Item>
                <Item {...formItemLayout} required={true} label="图片显示">
                    <Switch onChange={handlePictureChange} defaultChecked />
                    <span className={styles.point}>若开启则在客户端展示报料栏目图片，若关闭则不显示</span>
                </Item>
                <Item {...formItemLayout} required={true} label="栏目logo">
                    <ImageUpload name="url" onChange={handleFileChange} />
                </Item>
            </Modal>
        </div>
    );
}
export default Add