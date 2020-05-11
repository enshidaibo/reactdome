import React, { Component } from "react";

const ModelView = ({ modelId }) => {
    switch (modelId) {
        case 0:
            return <span style={{ color: "#ff6c04" }} className={`iconfont icon-wenzhang`} />;
        case 1:
            return <span style={{ color: "#ff6c04" }} className={`iconfont icon-lunbozutu`} />;
        case 2:
            return <span className={`iconfont icon-shipin1`} />;
        case 3:
            return <span className={`iconfont icon-yinpin`} />;
        case 4:
            return <span className={`iconfont icon-bianjiqichaolianjie`} />;
        case 5:
            return <span className={`iconfont icon-bianji-copy`} />;
        default:
            return null;
    }
};

export default ModelView;
