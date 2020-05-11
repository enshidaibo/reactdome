import React, { Component } from "react";
import styles from "./WaterMark.scss";
export default class WaterMark extends Component {
    handleDown = e => {
        // console.log(e.clientX);
        // console.log(e.clientY);
        // console.log(this.water.offsetLeft);
        // clearTimeout(this.delay);
        this.down = true;
        this.clientX = e.clientX - this.water.offsetLeft;
        this.clientY = e.clientY - this.water.offsetTop;
        // let point = e.touches[0] || e;
        // console.log(point);
    };
    handleMove = e => {
        if (!this.down) {
            return;
        }
        this.water.style.left = e.clientX - this.clientX + "px";
        this.water.style.top = e.clientY - this.clientY + "px";
        // console.log(e.clientX);
        // console.log(e.clientY);
    };
    handleUp = e => {
        this.down = false;
        console.log("1");
        // this.delay = setTimeout(() => {

        // }, 10);
    };
    render() {
        return (
            <div
                ref={ele => (this.water = ele)}
                className={styles.waterMark}
                onMouseDown={this.handleDown}
                onMouseMove={this.handleMove}
                onMouseUp={this.handleUp}
            >
                text
            </div>
        );
    }
}
