import React from "react";
import { Form, Button, Modal, message, DatePicker } from "antd";
const FormItem = Form.Item;
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import useData from '@/hooks/useData';
import TextArea from "@/pages/Content/Components/TextAreaItem/TextAreaItem";
import Content from "./Content";
import DestRadio from './DestRadio';
import styles from "./styles.scss";

const ContentLink = ({ item, onClick, onDelete }) => {
    return (
        <div className={styles.lk}>
            <span className={styles.lkl}>链接到：</span>
            <span className={styles.lkt}>{item.title}</span>
            <Button onClick={onDelete} size={"small"} className={styles.lkd}>
                移除
            </Button>
            <Button onClick={onClick} size={"small"} type="primary" className={styles.lkr}>
                重选
            </Button>
        </div>
    );
};


function onOk(value) {
    console.log('onOk: ', value);
}

const initData = {
    title: "",
    description: "",
    dest: 2,
    item: null,
    timing: null
}

const PushAddOrEdit = ({ loading, onSubmit, btnTitle = '保存', initValue = initData }) => {
    const [data, setData] = useData({ ...initValue, visible: false })
    const { title, dest, visible, item, description, timing } = data
    const showModal = () => setData({ visible: true })
    const handleOk = item => {
        if (title == '') {
            setData({ visible: false, item, title: item.title })
        } else {
            setData({ visible: false, item })
        }
    };
    const handleCancel = () => setData({ visible: false })
    const handleSubmit = async e => {
        e.preventDefault();
        if (title.length == 0) {
            return message.error("请输入推送标题");
        }
        if (!item) {
            return message.error("请选择内容");
        }
        onSubmit(data)
    };
    return (
        <RightContent>
            <FormItem>
                <div className={styles.textare}>
                    <TextArea
                        value={title}
                        onChange={(name, title) => setData({ title })}
                        style={{ background: "#fff", margin: 0, border: "none" }}
                        count={40}
                        maxLength={40}
                        placeholder="请输入推送标题，限40字以内"
                    />
                </div>
            </FormItem>
            <FormItem>
                <div className={styles.textare}>
                    <TextArea
                        value={description}
                        onChange={(name, description) => setData({ description })}
                        style={{ background: "#fff", margin: 0, border: "none" }}
                        count={80}
                        maxLength={80}
                        placeholder="请输入推送描述，限80字以内"
                    />
                </div>
            </FormItem>
            <FormItem>
                {item == null ?
                    <Button icon={"plus-circle"} type="primary" onClick={showModal}>选择内容</Button>
                    : <ContentLink item={item} onClick={showModal} onDelete={() => setData({ item: null })} />
                }
            </FormItem>
            <FormItem>
                <DatePicker showTime placeholder="请选择推送时间" value={timing ? moment(timing) : timing} onChange={(value, timing) => setData({ timing })} onOk={onOk} />
                <div>选择定时推送时间，无或者小于当前时间则保存后立即推送。</div>
            </FormItem>
            <FormItem>
                <DestRadio onChange={e => setData({ dest: e.target.value })} value={dest} />
            </FormItem>
            <FormItem>
                <Button type="primary" loading={loading} onClick={handleSubmit} htmlType="submit" icon="rise">
                    {btnTitle}
                </Button>
            </FormItem>
            <Modal
                title={<div style={{ textAlign: "center" }}>选择内容</div>}
                visible={visible}
                onCancel={handleCancel}
                width={700}
                bodyStyle={{ padding: "0.1rem 0.24rem 0.24rem" }}
                footer={null}
            >
                <Content onOk={handleOk} />
            </Modal>
        </RightContent>
    );
}
export default PushAddOrEdit