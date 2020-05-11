import React, { Component } from "react";
import styles from "../../Toolbar/Toolbar.scss";
import hstyles from "./H.scss";
export default class H extends Component {
    handleClickBlock = (event, type) => {
        event.preventDefault();
        const change = this.props.value.change().setBlocks(type);
        this.props.onChange(change);
    };
    renderBlockButton = (type, { title, icon, fontSize = '14px' }) => {
        let isActive = this.hasBlock(type);
        let cls = isActive ? hstyles.item_active : hstyles.item;
        let style = {
            fontSize: fontSize,
            lineHeight: fontSize
        }
        return (
            <div className={cls} title={title} onMouseDown={event => this.handleClickBlock(event, type)}>
                {icon ? <span className={"iconfont icon-" + icon} style={style} /> : <span style={style}>{title}</span>}
            </div>
        );
    };
    hasBlock = type => {
        const { value } = this.props;
        return value.blocks.some(node => node.type == type);
    };
    render() {
        return (
            <div className={styles.btn + " " + hstyles.btn}>
                <span className={"iconfont icon-dabiaoti1"} title={"标题"} />
                <div className={hstyles.list}>
                    <div className={hstyles.inline}>
                        {this.renderBlockButton("h1", { title: "标题一", icon: "biaoti1", fontSize: '30px' })}
                        {this.renderBlockButton("h2", { title: "标题二", icon: "biaoti2", fontSize: "26px" })}
                        {this.renderBlockButton("paragraph", { title: "正文" })}
                    </div>
                </div>
            </div>
        );
    }
}
