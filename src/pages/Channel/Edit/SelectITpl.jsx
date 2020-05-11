/**
 * 修改模板
 */
import React, { useState, useEffect } from "react";
import { Select } from "antd";
const Option = Select.Option;
import { getTplData } from "@/services/content";
import FormItem from './FormItem'
import { modelTag } from '@/config/mark.config';

const modelTmps = [{
    model_id: 0,
    title: "文章"
}, {
    model_id: 1,
    title: "组图"
}, {
    model_id: 2,
    title: "视频"
}, {
    model_id: 3,
    title: "音频"
}]

const SelectItem = ({ list = [], name, value = '', onChange }) => {
    return <Select
        placeholder="请选择"
        showArrow={true}
        showSearch
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        style={{ width: "400px" }}
        tokenSeparators={[",", " "]}
        value={value}
        onChange={value => onChange(name, value)}
    >
        <Option value={''}>默认</Option>
        {list.map(d => <Option key={d} value={d}>{d}</Option>)}
    </Select>
}

const SelectITpl = ({ detail, onChange, handleChangeState }) => {
    const [model_list, setList] = useState({})
    useEffect(() => {
        const getData = async () => {
            let res = await getTplData();
            if (res.success) {
                setList(res.body);
            }
        }
        getData()
    }, [])
    let { models = [], tpls = [], mtpls = [] } = detail
    const handleChangeTpls = (name, value, model_id) => {
        models[model_id] = model_id
        models[model_id] = model_id
        detail.models[model_id] = model_id
        detail[name][model_id] = value
        // console.log(name);
        // console.log(value);
        // console.log(model_id);
        handleChangeState(detail)
    }
    return [
        <FormItem label='栏目PC模板' key="tplContent">
            <SelectItem
                list={detail.modelId == modelTag.singlepage ? model_list.aloneTpl : model_list.channelTpl}
                name='tplChannel'
                value={detail.tplChannel}
                onChange={onChange} />
        </FormItem>,
        <FormItem label='栏目手机模板' key="tplMobileContent">
            <SelectItem
                list={detail.modelId == modelTag.singlepage ? model_list.aloneMobileTpl : model_list.channelMobileTpl}
                name='tplMobileChannel'
                value={detail.tplMobileChannel}
                onChange={onChange} />
        </FormItem>,
        detail.modelId == modelTag.article && <FormItem label='内容页PC模板' key="tpls">
            {modelTmps.map(d => {
                return <FormItem label={d.title} key={`tpls_${d.model_id}`}>
                    <SelectItem
                        list={model_list.contentTpl}
                        name='tpls'
                        value={tpls[d.model_id]}
                        onChange={(name, value) => handleChangeTpls(name, value, d.model_id)} />
                </FormItem>
            })}
        </FormItem>,
        detail.modelId == modelTag.article && <FormItem label='内容页手机模板' key="mtpls">
            {modelTmps.map(d => {
                return <FormItem label={d.title} key={`mtpls_${d.model_id}`}>
                    <SelectItem
                        list={model_list.contentMobileTpl}
                        name='mtpls'
                        value={mtpls[d.model_id]}
                        onChange={(name, value) => handleChangeTpls(name, value, d.model_id)} />
                </FormItem>
            })}
        </FormItem>
    ];
}
export default SelectITpl