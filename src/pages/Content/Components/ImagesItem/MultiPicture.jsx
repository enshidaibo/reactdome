import React, { Component } from "react";
import ImgItem from "./ImgItem";
import styles from "./styles.scss";
export default class MultiPicture extends Component {
    render() {
        let { data, onChange } = this.props;
        let { titleImg, typeImg, contentImg } = data;
        return (
            <div className={styles.multi}>
                <div className={styles.multione}>
                    <ImgItem name="titleImg" src={titleImg} onChange={onChange} />
                </div>
                <div className={styles.multione}>
                    <ImgItem name="typeImg" src={typeImg} onChange={onChange} />
                </div>
                <div className={styles.multione}>
                    <ImgItem name="contentImg" src={contentImg} onChange={onChange} />
                </div>
            </div>
        );
    }
}
