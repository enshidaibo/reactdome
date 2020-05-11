import React, { Component } from "react";
import styles from "./Header.scss";
const tabs = [{ key: "image", title: "图片" }, { key: "video", title: "视频" }, { key: "audio", title: "音频" }];

const Header = ({ sourceType, resourceType, onHide, onToggleTab }) => {
    return (
        <div className={styles.header}>
            <button className={styles.backbtn} onClick={onHide}>
                返回
            </button>
            {tabs.map(({ key, title }) => {
                if (resourceType) {
                    if (key == resourceType) {
                        return <div key={key} className={styles.tabone}>{title}</div>
                    }
                    return null;
                }
                return (
                    <div
                        key={key}
                        className={sourceType == key ? styles.curtab : styles.tab}
                        onClick={() => onToggleTab(key)}
                    >
                        {title}
                    </div>
                );
            })}
        </div>
    );
};

export default Header;
