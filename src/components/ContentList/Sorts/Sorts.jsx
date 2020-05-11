import React, { useState } from "react";
import { message, Button } from "antd";
import { httpContentListSave } from "@/services/contentlist";
import styles from "./Sorts.scss";

const Sorts = ({ list, query, getListData, getHistoryListData, onChangeState, isSort }) => {
    const [loading, setLoading] = useState(false)
    const handelChangeSorts = async () => {
        setLoading(true)
        let res = await httpContentListSave({
            paramsStr: JSON.stringify({
                sectionId: query.id,
                list
            })
        });
        setLoading(false)
        if (res.success) {
            message.success("保存成功！");
            getListData();
            getHistoryListData();
            onChangeState({
                isSort: false
            });
        }
    };
    return (
        <Button type="primary" disabled={!isSort} loading={loading} className={styles.sorts} onClick={handelChangeSorts}>
            发布
        </Button>
    );
}

export default Sorts