import React, { Component } from 'react';
import "../../base.css";
import pxadver from "./pxAdver.scss";

class PxAdver extends Component {

    handleBtnClick = (data) => {
        typeof this.props.btnClick === "function" && this.props.btnClick(data);
    }

    handleOnChange = (e) => {
        let { data } = this.props;
        typeof this.props.onChange === "function" && this.props.onChange(e.target.value, data);
    }

    render () {
        let { data } = this.props;
        return (
            <div className={pxadver.pxAdverWrap + " row"}>
                <div className={"fx row"}>
                    <div className={"row fx"}>
                        <span className={pxadver.labelSpan}>地址</span>
                        <input className={pxadver.adverInput + " fx"} 
                            type="text"
                            value={data.url}
                            placeholder="请输入广告地址"
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className={pxadver.pxInfo}>{data.name}({data.width}*{data.high})</div>
                </div>
                <div>
                    <span onClick={() => this.handleBtnClick(data)} className={pxadver.pxBtn}></span>
                </div>
            </div>
        );
    }
}

export default PxAdver;