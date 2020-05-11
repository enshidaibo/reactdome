import React, { useRef } from "react";
import styles from "./FilesButton.scss";

const FilesButton = ({ title = "选择文件", onChange, multiple = true, ...rest }) => {
    const fileEle = useRef(null);
    const handleFileChange = e => {
        onChange(e);
        fileEle.current.value = "";
    };
    return (
        <div className={styles.btn}>
            {title}
            <input
                type="file"
                ref={fileEle}
                onChange={handleFileChange}
                multiple
                className={styles.btnIpt}
                {...rest}
            />
        </div>
    );
}

export default FilesButton