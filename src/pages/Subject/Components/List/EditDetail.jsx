import React, { useState } from 'react';
import { Button, Radio, message } from 'antd';
const RadioGroup = Radio.Group;
import useData from '@/hooks/useData';
import Modal from "@/Libs/Components/Modal/Modal";
const { Warpper, Groups, Input, Btns, ItemLabel } = Modal;

import SingleLeft from "@/pages/Content/Components/ImagesItem/SingleLeft";
import SingleBottom from "@/pages/Content/Components/ImagesItem/SingleBottom";
import MultiBottom from "@/pages/Content/Components/ImagesItem/MultiBottom";

const EditCpt = ({ setVisible, data = {}, onChange }) => {
    const [state, setState] = useData(data)
    const handleChange = (name, value) => {
        setState({ [name]: value })
    }
    const handleChangeMode = e => {
        setState({ mode: e.target.value })
    }
    const handleOk = e => {
        e.preventDefault();
        if (!state.title) {
            return message.warning('板块标题不能为空！')
        }
        setVisible(false)
        onChange(state)
    }
    return <Modal>
        <Warpper title={"编辑内容"} onClick={() => setVisible(false)}>
            <form onSubmit={handleOk}>
                <Groups>
                    <Input title={`标题`} name="title" value={state.title} onChange={handleChange} />
                    <Input title={`链接地址`} name="url" value={state.url} onChange={handleChange} />
                    <ItemLabel title={`显示模式`} key={"notopic"}>
                        <RadioGroup value={state.mode} onChange={handleChangeMode}
                        >
                            <Radio value={0}>单图</Radio>
                            <Radio value={1}>大图</Radio>
                            <Radio value={2}>三图</Radio>
                            <Radio value={3}>无图</Radio>
                        </RadioGroup>
                    </ItemLabel>
                    <ItemLabel title={" "} key={"notopicmode"}>
                        <div style={{ width: "300px" }}>
                            {state.mode == 0 && (
                                <SingleLeft
                                    name="titleImg"
                                    title={data.title}
                                    src={state.titleImg}
                                    onChange={handleChange}
                                />
                            )}
                            {state.mode == 1 && (
                                <SingleBottom
                                    name="titleImg"
                                    title={data.title}
                                    src={state.titleImg}
                                    onChange={handleChange}
                                />
                            )}
                            {state.mode == 2 && (
                                <MultiBottom data={state} onChange={handleChange} />
                            )}
                            {state.mode == 3 && <div>{data.title}</div>}
                        </div>
                    </ItemLabel>
                </Groups>
                <Btns>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Btns>
            </form>
        </Warpper>
    </Modal>
}

const EditDetail = ({ data, onChange, children }) => {
    const [visible, setVisible] = useState(false)
    return [React.cloneElement(children, {
        key: "children",
        onClick: () => setVisible(true)
    }), visible && <EditCpt key='modal' setVisible={setVisible} data={data} onChange={onChange}></EditCpt>]
}

export default EditDetail