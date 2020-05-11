import React, { useEffect, useState } from "react";
import AddType from "./AddType/AddType";
import styles from "./Sidebar.scss";
import { httpFilesTypeList } from "@/services/resource";
import { localeContext } from '../localRedux'

const Sidebar = ({ typeId, type, uploadConfig, getData }) => {
    const locale = localeContext()
    const { fileTypes } = locale.context
    /**
    * 获取栏目信息
    */
    const httpGetCatList = async () => {
        let res = await httpFilesTypeList({ type });
        if (res.success) {
            locale.dispatch.set({ fileTypes: res.body })
        }
    };
    /**
     * 切换栏目
     */
    const handleClick = id => {
        getData({
            typeId: uploadConfig == 'me' ? '-1' : id,
            tag: ""
        });
    };
    useEffect(() => { httpGetCatList() }, [])
    return (
        uploadConfig != 'me' ?
            <div className={styles.sidebar}>
                <div className={styles.smenu}>
                    <div className={!typeId ? styles.curtab : styles.stab} onClick={() => handleClick(null)}>全部</div>
                    <div className={typeId == -1 ? styles.curtab : styles.stab} onClick={() => handleClick(-1)}>我的</div>
                    {fileTypes.map(d => {
                        return (
                            <div
                                key={d.id}
                                className={d.id == typeId ? styles.curtab : styles.stab}
                                onClick={() => handleClick(d.id)}
                            >
                                {d.name}
                            </div>
                        );
                    })}
                </div>
                <AddType getFilesCat={httpGetCatList} type={type} />
            </div> :
            <div className={styles.sidebar}>
                <div className={styles.smenu}>
                    <div className={styles.curtab}>我的</div>
                </div>
            </div>
    );
}

export default Sidebar