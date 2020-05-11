/* global xiuxiu */
import React, { useState, useEffect, useRef } from "react";
import { Modal, Spin } from 'antd';
import { httpFilesUpload } from "@/services/resource";
import flashChecker from './flashChecker'
import convertDataUrlToFile from './convertDataUrlToFile'

import styles from './style.scss';


const uploadFile = async (files, { type = "image", typeId, mark = false } = {}) => {
    let res = await httpFilesUpload({
        uploadFile: files,
        type,
        typeId: typeId || 0,
        mark
    });
    return res;
};

const handleUploadResponse = res => {
    console.log(res);
}
const Mtxx_Editer = ({ url, onUploadResponse = handleUploadResponse, onClose }) => {
    const [loading, setLoading] = useState(true)
    const editEl = useRef(null);
    const error = () => {
        Modal.warning({
            title: '提示',
            content: '当前页面暂未开启flash，无法进行图片编辑操作',
            getContainer: () => editEl.current,
            onOk: onClose
        });
    }
    useEffect(() => {
        let flash = flashChecker()
        if (flash.f == 0) {
            setLoading(false)
            error()
            return
        }

        xiuxiu.setLaunchVars("customMenu", ["decorate", "facialMenu", "puzzle"]);
        xiuxiu.setLaunchVars("titleVisible", 0);
        /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
        xiuxiu.embedSWF("altContent", 3, "100%", "100%");
        xiuxiu.setUploadType(3);
        xiuxiu.onInit = function () {
            xiuxiu.loadPhoto(url);//修改为要处理的图片url
            setLoading(false)
        }
        xiuxiu.onSaveBase64Image = function (data, fileName, fileType, id) {
            let file = convertDataUrlToFile(data, fileName, fileType)
            // let bloburl = URL.createObjectURL(file);
            uploadFile(file).then(onUploadResponse)
        }
    }, [])
    return <div className={styles.mtxx} >
        <div className={styles.mtxx_content}>
            <div className={styles.close} onClick={onClose}>×</div>
            <div className={styles.mtxx_editer} ref={editEl}>
                <div className={styles.mtxx_inline}>
                    <div id='altContent'></div>
                </div>
                {loading && <Spin tip="图片编辑器加载中..." className={styles.wrapperClassName}></Spin>}
            </div>
        </div>
    </div >
}

const Mtxx = ({ children, ...props }) => {
    const [visible, setVisible] = useState(false)
    const onClose = () => setVisible(false)
    return [
        React.cloneElement(children, {
            key: "children",
            onClick: () => setVisible(true)
        }),
        visible && <Mtxx_Editer key='editer' onClose={onClose}  {...props} />
    ]

}

export default Mtxx