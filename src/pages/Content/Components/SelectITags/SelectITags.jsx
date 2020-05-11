import React, { useState, useEffect } from "react";
import { message, Select } from "antd";
const Option = Select.Option;
import SelectItem from "../SelectItem/SelectItem";
import styles from "../Edit.scss";

import { getHotTagsData } from "@/services/content";


const SelectITags = ({ name, value, onChange }) => {
    const [tags, setTags] = useState([])
    useEffect(() => {
        const getTagsData = async () => {
            let res = await getHotTagsData();
            if (res.success) {
                setTags(res.body)
            }
        };
        getTagsData()
    }, [])
    const handleChangeTags = value => {
        if (value.length > 5) {
            return message.warning("Tags标签长度不能超过5个");
        }
        onChange(name, value);
    };
    return (
        <div className={styles.time}>
            <SelectItem mode="tags" placeholder="Tags" value={value} onChange={handleChangeTags}>
                {tags.map(d => (
                    <Option key={d} value={d}>
                        {d}
                    </Option>
                ))}
            </SelectItem>
        </div>
    );
}

export default SelectITags