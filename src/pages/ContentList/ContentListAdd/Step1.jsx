import React, { useState, useEffect } from "react";
import { Switch, Select, Icon, Button } from "antd";
const Option = Select.Option;
import Modal from "@/Libs/Components/Modal/Modal";
const { Groups, Input } = Modal;
import { getShareType } from "@/services/contentlist";
import styles from "./Step1.scss";

const Step1 = ({ onChange, onNextStep, data, action }) => {
    const [shareTypes, setShareTypes] = useState([])
    useEffect(() => {
        const getData = async () => {
            let res = await getShareType();
            if (res.success) {
                setShareTypes(res.body)
            }
        }
        getData()
    }, [])
    return (
        <div>
            <Groups>
                <Input title={`名称`} name="name" value={data.name} onChange={onChange} placeholder="请输入名称" />
                <Input
                    title={`备注`}
                    name="description"
                    value={data.description}
                    onChange={onChange}
                    placeholder="请输入备注"
                />
            </Groups>
            <Groups>
                <Input
                    title={`限制行数`}
                    name="limitRows"
                    value={data.limitRows}
                    onChange={onChange}
                    placeholder="请输入最多行数"
                />
            </Groups>
            <Groups>
                <div className={styles.label}>
                    <span className={styles.lbt}>是否共享</span>
                    <Switch checked={data.isShare} onChange={checked => onChange("isShare", checked)} />
                </div>
                <Input
                    title={`共享名称`}
                    name="shareName"
                    value={data.shareName}
                    onChange={onChange}
                    placeholder="请输入共享名称"
                    disabled={!data.isShare}
                />
                <div className={styles.label}>
                    <span className={styles.lbt}>共享分类</span>
                    <Select
                        value={data.shareType || undefined}
                        onChange={value => onChange("shareType", value)}
                        placeholder="选择共享分类"
                        disabled={!data.isShare}
                        className={styles.select}
                    >
                        {shareTypes.map(d => {
                            return (
                                <Option key={d.value} value={d.value}>
                                    {d.name}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
            </Groups>
            <Groups>
                <div className={styles.label}>
                    <span className={styles.lbt}>选择类型</span>
                    <Select
                        value={data.classify}
                        disabled={action == "edit"}
                        onChange={value => onChange("classify", value)}
                        className={styles.select}
                        placeholder="请选择类型"
                    >
                        <Option value={0}>
                            <Icon type="fork" /> 手动
                    </Option>
                        <Option value={1}>
                            <Icon type="rocket" /> 自动
                    </Option>
                        <Option value={2}>
                            <Icon type="share-alt" /> 共享
                    </Option>
                    </Select>
                </div>
            </Groups>
            <div className={styles.btns}>
                <Button type="primary" className={styles.next} onClick={onNextStep}>
                    {data.classify == 0 ? "保存" : "下一步"}
                </Button>
            </div>
        </div>
    )
}

export default Step1