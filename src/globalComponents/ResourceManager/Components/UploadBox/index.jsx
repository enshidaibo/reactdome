import React from "react";
import ReactDOM from "react-dom";

import styles from "./styles.scss";

import Warpper from "./Warpper";
import _FilesButton from "./FilesButton";
import _FileProgress from "./FileProgress";

export const FilesButton = _FilesButton
export const FileProgress = _FileProgress

export const UploadBox = ({ show, ...props }) => {
    return show ? ReactDOM.createPortal(<Warpper {...props} />, document.getElementById(rootDom)) : null;
};

export const ListBox = ({ onChange, children }) => {
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        <div className={styles.listbox} onDrop={onChange} onDragOver={handleDragOver}>
            {children.length == 0 ? <div className={styles.pre}>拖拽文件上传</div> : children}
        </div>
    );
}

export const FileState = ({ state }) => {
    let tip = "上传中";
    switch (state) {
        case 1:
            tip = "上传中";
            break;
        case 2:
            tip = "上传失败";
            break;
        case 3:
            tip = "上传成功";
            break;
        case 4:
            tip = "等待上传";
            break;
        default:
            break;
    }
    return tip;
};
