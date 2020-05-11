import React, { useState } from "react";
import { Button } from "antd";
import uploadFile from "./uploadFile";
import { UploadBox, ListBox, FileState, FilesButton } from "../Components/UploadBox/index";
import styles from "./UploadFilesBox.scss";
import Uploadfiles from '../hooks/uploadfiles'

const UploadFilesBox = ({ type = 'image', typeId, onOk, handleDirectInsertion, children, isDirect }) => {
    const [visible, setVisible] = useState(false)
    const handleChangeVisible = (isVisible = true) => {
        setVisible(isVisible)
    }
    const uploadRequest = async (file, onProgress) => {
        return uploadFile(file, { typeId, type })
    }
    return [
        React.cloneElement(children, {
            onClick: handleChangeVisible,
            key: "children"
        }),
        <UploadBox key="uploadbox" show={visible} title={"图片上传"}>
            <Uploadfiles accept={type} uploadRequest={uploadRequest} >
                {(attachments, handleFileChange, handleRetry) => {
                    /**
                     * 确定按钮
                     */
                    const handleOk = () => {
                        let successfiles = attachments.filter(d => d.state == 3);
                        onOk && onOk(successfiles, attachments);
                        setVisible(false)
                    };
                    /**
                     * 直接插入
                     */
                    const handleDirectInsertions = () => {
                        let successfiles = attachments.filter(d => d.status == 3);
                        handleDirectInsertion && handleDirectInsertion(successfiles, attachments);
                        setVisible(false)
                    }
                    return [<ListBox onChange={handleFileChange} key='list'>
                        {attachments.map((d, i) => {
                            let cls = styles.imgbox;
                            return (
                                <div className={cls} key={i}>
                                    <img src={d.bloburl} className={styles.img} />
                                    <div className={styles.imgdes + " " + styles["state" + d.status]}>
                                        <FileState state={d.status} />
                                    </div>
                                </div>
                            );
                        })}
                    </ListBox>,
                    <div className={styles.btns} key='btns'>
                        <div className={styles.info}>文件数：总{attachments.length}个</div>
                        <FilesButton accept="image/*" onChange={handleFileChange} />
                        <Button type="primary" className={styles.btn} onClick={handleRetry}>重试上传失败文件</Button>
                        <Button type="primary" onClick={handleOk} className={styles.btn}>确定</Button>
                        {isDirect && <Button type="primary" onClick={handleDirectInsertions} className={styles.btn}>直接插入</Button>}
                        <Button className={styles.btn} onClick={handleOk}>关闭</Button>
                    </div>]
                }}
            </Uploadfiles>
        </UploadBox>
    ]
}

export default UploadFilesBox