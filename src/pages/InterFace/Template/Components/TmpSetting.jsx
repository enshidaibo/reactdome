import React, { useEffect } from "react";
import { Form, Select, Button, message } from 'antd';
import useData from '@/hooks/useData'
import { getTplSetting, getTplSolutions, updateTplSolutions } from '../services';

const { Option } = Select;
const TemplateSetting = ({ setVisible }) => {
    const [data, setData] = useData({ list: [], update: false })
    const { list, update, solution, mobile, app } = data
    useEffect(() => {
        const getData = async () => {
            let res = await getTplSolutions()
            if (res.success) {
                setData({ list: res.body })
            }
        }
        const getTmplist = async () => {
            let res = await getTplSetting()
            if (res.success) {
                setData({
                    solution: res.body.tplSolution,
                    mobile: res.body.tplMobileSolution,
                    app: res.body.tplAppSolution
                })
            }
        }
        getTmplist()
        getData()
    }, [])
    const handleSubmit = async () => {
        setData({ update: true })
        let res = await updateTplSolutions({ solution, mobile, app })
        setData({ update: false })
        if (res.success) {
            message.success("保存成功！")
            setVisible(false)
        }
    }
    const formItemLayout = {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        },
    };
    const formItemBtnLayout = {
        wrapperCol: {
            span: 20,
            offset: 4,
        },
    };
    return <div>
        <Form.Item {...formItemLayout} label="PC端模板">
            <Select
                placeholder="请选择一个模板"
                style={{ width: "100%" }}
                value={solution}
                onChange={solution => setData({ solution })}>
                {list.map(d => {
                    return <Option key={d} value={d}>{d}</Option>
                })}
            </Select>
        </Form.Item>
        <Form.Item {...formItemLayout} label="移动端模板">
            <Select
                placeholder="请选择一个模板"
                style={{ width: "100%" }}
                value={mobile}
                onChange={mobile => setData({ mobile })}>
                {list.map(d => {
                    return <Option key={d} value={d}>{d}</Option>
                })}
            </Select>
        </Form.Item>
        <Form.Item {...formItemLayout} label="APP端模板">
            <Select
                placeholder="请选择一个模板"
                style={{ width: "100%" }}
                value={app}
                onChange={app => setData({ app })}>
                {list.map(d => {
                    return <Option key={d} value={d}>{d}</Option>
                })}
            </Select>
        </Form.Item>
        <Form.Item {...formItemBtnLayout}>
            <Button loading={update} onClick={handleSubmit} type='primary'>保存</Button>
        </Form.Item>
    </div>
}



export default TemplateSetting