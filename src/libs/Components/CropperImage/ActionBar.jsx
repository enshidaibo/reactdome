import React, { Component } from "react";
import { Button } from "antd";
const ButtonGroup = Button.Group;
import aspectRatios from "./aspectRatios";

import styles from "./ActionBar.scss";
export default class ActionBar extends Component {
    render() {
        let {
            isOk,
            step,
            aspectRatio,
            handleSetAspectRatio,
            handleRotate,
            handleScaleX,
            handleScaleY,
            handleOverCropper,
            handleReBuild,
            handleUpload,
            handleChange,
            onHide
        } = this.props;
        console.log(isOk);
        console.log(step);
        return (
            <div className={styles.actionBar}>
                <ButtonGroup style={{ margin: "0 5px" }}>
                    {aspectRatios.map((d, i) => {
                        return (
                            <Button
                                className={aspectRatio == i ? styles.btnActive : styles.btn}
                                key={d.value}
                                onClick={() => handleSetAspectRatio(i)}
                                type="primary"
                                disabled={step != 1}
                            >
                                {d.title}
                            </Button>
                        );
                    })}
                </ButtonGroup>
                <ButtonGroup style={{ margin: "0 5px" }}>
                    <Button
                        className={styles.btn}
                        onClick={() => handleRotate(-45)}
                        type="primary"
                        disabled={step != 1}
                        title="左旋转"
                    >
                        <i className={`iconfont  icon-xuanzhuan ${styles.icon}`} />
                    </Button>
                    <Button
                        className={styles.btn}
                        onClick={() => handleRotate(45)}
                        type="primary"
                        disabled={step != 1}
                        title="右旋转"
                    >
                        <i className={`iconfont  icon-youxuanzhuan ${styles.icon}`} />
                    </Button>
                    <Button
                        className={styles.btn}
                        onClick={handleScaleX}
                        type="primary"
                        disabled={step != 1}
                        title="左右对调"
                    >
                        <i className={`iconfont  icon-shuipingfanzhuan ${styles.icon}`} />
                    </Button>
                    <Button
                        className={styles.btn}
                        onClick={handleScaleY}
                        type="primary"
                        disabled={step != 1}
                        title="上下对调"
                    >
                        <i className={`iconfont  icon-chuizhifanzhuan ${styles.icon}`} />
                    </Button>
                </ButtonGroup>
                <ButtonGroup style={{ margin: "0 5px" }}>
                    <Button className={styles.btn} onClick={handleOverCropper} type="primary" disabled={step != 1}>
                        确定裁剪
                    </Button>
                    <Button
                        className={styles.btn}
                        onClick={handleReBuild}
                        type="primary"
                        disabled={step != 2 && step != 4}
                    >
                        重新裁剪
                    </Button>
                </ButtonGroup>
                <ButtonGroup style={{ margin: "0 5px" }}>
                    <Button
                        className={styles.btn}
                        onClick={handleUpload}
                        type="primary"
                        loading={step == 3}
                        disabled={step != 2 && !isOk}
                    >
                        插入
                    </Button>
                    {/* <Button className={styles.btn} onClick={handleChange} type="primary" disabled={!isOk}>
                        插入
                    </Button> */}
                </ButtonGroup>
                <i className={`iconfont icon-x ${styles.close}`} onClick={onHide} />
            </div>
        );
    }
}
