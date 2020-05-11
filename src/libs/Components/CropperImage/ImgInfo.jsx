import React, { Component } from "react";
import styles from "./ImgInfo.scss";
export default class ImgInfo extends Component {
    render() {
        let { imginfo, newfile } = this.props;
        return (
            <div className={styles.info}>
                <div className={styles.tr}>
                    <div className={styles.td}>原图信息</div>
                    <div className={styles.td}>
                        宽：
                        {imginfo.naturalWidth}
                    </div>
                    <div className={styles.td}>
                        高：
                        {imginfo.naturalHeight}
                    </div>
                </div>
                <div className={styles.tr}>
                    <div className={styles.td}>裁剪图片信息</div>
                    <div className={styles.td}>
                        宽：
                        {newfile.width}
                    </div>
                    <div className={styles.td}>
                        高：
                        {newfile.height}
                    </div>
                    <div className={styles.td}>
                        为方便操作，裁剪界面的图片有缩放；裁剪后图片宽度超过800像素的，会自动等比例压缩到800像素宽度
                    </div>
                </div>
            </div>
        );
    }
}
