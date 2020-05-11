import React, { useState, useEffect } from "react";
import { Select, Button } from "antd";
const Option = Select.Option;
import { getShareList } from "@/services/contentlist";
import styles from "./Step1.scss";

const Step3 = ({ onChangeStep, onChange, data, onSave }) => {
    const [shareList, setShareList] = useState([])
    useEffect(() => {
        const getData = async () => {
            let res = await getShareList();
            if (res.success) {
                setShareList(res.body)
            }
        }
        getData()
    }, [])
    return (
        <div>
            <div className={styles.items}>
                <label className={styles.label}>
                    <span className={styles.lbt}>共享列表</span>
                    <Select
                        className={styles.select}
                        style={{ width: "100%" }}
                        value={data.shareId}
                        onChange={shareId => onChange({ shareId })}
                        placeholder="请选择共享列表"
                    >
                        {shareList.map(d => (
                            <Option key={d.id} value={d.id}>
                                {d.name}
                            </Option>
                        ))}
                    </Select>
                </label>
            </div>
            <div className={styles.btns}>
                <Button type="primary" className={styles.next} onClick={() => onChangeStep(1)}>上一步</Button>
                <Button type="primary" className={styles.next} onClick={onSave}>保存</Button>
            </div>
        </div>
    );
}

export default Step3