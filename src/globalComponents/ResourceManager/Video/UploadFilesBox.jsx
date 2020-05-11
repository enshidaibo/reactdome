import React, { useState } from "react";
import { Button } from "antd";
import vmsUploadFile from "@/Libs/Utils/upload_vms";
import { UploadBox, ListBox, FilesButton, FileProgress } from "../Components/UploadBox/index";
import styles from "./UploadFilesBox.scss";
import Uploadfiles from '../hooks/uploadfiles'

const UploadFilesBox = ({ type = 'video', typeId, onOk, children }) => {
    const [visible, setVisible] = useState(false)
    const handleChangeVisible = (isVisible = true) => {
        setVisible(isVisible)
    }
    const uploadRequest = async (file, onProgress) => {
        return vmsUploadFile(file, { func_type: 1, typeId, onProgress });
    }
    return [
        React.cloneElement(children, {
            onClick: handleChangeVisible,
            key: "children"
        }),
        <UploadBox key="uploadbox" show={visible} title={"视频上传"}>
            <Uploadfiles accept={type} uploadRequest={uploadRequest} >
                {(attachments, handleFileChange, handleRetry) => {
                    /**
                     * 确定按钮
                     */
                    const handleOk = () => {
                        let successfiles = attachments.filter(d => {
                            d.state == 3;
                        });
                        onOk && onOk(successfiles, attachments);
                        setVisible(false)
                    };
                    return [<ListBox onChange={handleFileChange} key='list'>
                        {attachments.map((d, i) => {
                            return (
                                <div className={styles.item} key={i}>
                                    <video src={d.bloburl} className={styles.audio} />
                                    <FileProgress state={d.status} progress={d.progress} />
                                </div>
                            );
                        })}
                    </ListBox>,
                    <div className={styles.btns} key='btns'>
                        <div className={styles.info}>文件数：总{attachments.length}个</div>
                        <FilesButton accept={"video/*,video/x-matroska,video/x-flv"} onChange={handleFileChange} />
                        <Button type="primary" className={styles.btn} onClick={handleRetry}>重试上传失败文件</Button>
                        <Button type="primary" onClick={handleOk} className={styles.btn}>确定</Button>
                        <Button className={styles.btn} onClick={handleOk}>关闭</Button>
                    </div>]
                }}
            </Uploadfiles>
        </UploadBox>
    ]
}

export default UploadFilesBox