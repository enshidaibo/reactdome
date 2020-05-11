import React, { useState } from "react";

// const CropperImage = asyncComponents(() => import("@/libs/Components/CropperImage/CropperImage"));
// const ResourceManager = asyncComponents(() => import("@/globalComponents/ResourceManager"));
const ResourceManager = app.asyncComponent('ResourceManager')

import styles from "./styles.scss";

const ImgItem = ({ onChange, name, style, src, title }) => {
    const [visible, setVisible] = useState(false)
    const handleShow = () => setVisible(true)
    const handleHide = () => setVisible(false)
    const handleChange = (data) => {
        setVisible(false)
        let url = data[0].thumb
        onChange && onChange(name, url);
    };
    if (src) {
        style = {
            ...style,
            backgroundImage: `url(${src})`
        };
    }
    return (
        <div className={styles.image} style={style}>
            {!src && <div className={"iconfont icon-tianjiatupian " + styles.iconfont} />}
            <div className={styles.uploadBtn} onClick={handleShow} />
            {title && (
                <div className={styles.title} onClick={handleShow}>
                    {title}
                </div>
            )}
            {visible && (
                <ResourceManager
                    onHide={handleHide}
                    onOk={handleChange}
                    multiple={false}
                    image={false}
                    curTab={"image"}
                />
            )}
        </div>
    );
}
export default ImgItem