import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Select, Button, message } from "antd";
const Option = Select.Option;

import styles from "./EditBox.scss";
import { httpFilesSave } from "@/services/resource";
import { httpGetMediaInfo } from "@/services/vms";
import { localeContext } from '../localRedux'
import useData from '@/hooks/useData'

const EditBox = ({ data, onHide, getData, children }) => {
    const locale = localeContext()
    const { fileTypes } = locale.context
    let tags = data.tags ? data.tags.split(",") : [];
    const [state, setState] = useData({ ...data, tags })

    const handleChange = value => {
        setState(value)
    };
    const handleSubmit = async () => {
        let data = {
            ...state,
            filePath: state.path,
            fileName: state.name
        };
        data.tags = data.tags.join(",");
        let res = await httpFilesSave(data);
        if (res.success) {
            message.info("保存成功");
            getData();
            onHide();
        }
    };

    const handleToVms = async () => {
        let form = {
            id: 229478
        }
        console.log(state);
        let res = await httpGetMediaInfo(form);
        console.log(res);
        if(res.code == 200) {
            let baseUrl = res.body.url;
            let siteid = res.body.siteid;
            let customid = res.body.customid;
            let phone = res.body.phone;
            let redirect = res.body.redirect;

            let token = localStorage.getItem("token");
            let url = baseUrl+"?siteid="+siteid+"&customid="+customid+"&phone="+phone+"&token="+token+"&redirect="+redirect;
            console.log(url);
            window.open(url, "_blank");
        }else{
            // window.open("","_blank");
        }
    }

    return ReactDOM.createPortal(
        <div className={styles.EditFilesBox}>
            <div className={styles.wrapper}>
                <div className={styles.close} onClick={onHide}>
                    ×
                    </div>
                <div className={styles.left}>{children}</div>
                <div className={styles.right}>
                    <div className={styles.title}>{state.name}</div>
                    <Select
                        defaultValue={state.typeId || undefined}
                        placeholder="请选择分类"
                        className={styles.select}
                        onChange={typeId => handleChange({ typeId })}
                    >
                        {fileTypes.map(d => {
                            return (
                                <Option key={d.id} value={d.id}>
                                    {d.name}
                                </Option>
                            );
                        })}
                    </Select>
                    <Select
                        className={styles.select}
                        placeholder="请输入标签"
                        showArrow={true}
                        mode="tags"
                        tokenSeparators={[",", " "]}
                        onChange={tags => handleChange({ tags })}
                        value={state.tags}
                    />
                    <div>
                        <Button type="primary" onClick={handleSubmit}>
                        保存
                        </Button>
                        {/* <Button type="primary" style={{marginLeft: '15px'}} onClick={handleToVms}>
                            快编
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById(rootDom)
    );
}

export default EditBox