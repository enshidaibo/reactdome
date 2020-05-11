import React, { Component } from "react";
import wrap from "./wrap.scss";

export default class PageWrap extends Component{
    render () {
        return (
            <div className={wrap.pageWrap + " col"}>
                {this.props.children}
            </div>
        );
    }
}