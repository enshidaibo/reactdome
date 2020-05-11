/*
* 审核状态
* */
import React, { Component } from "react";
import { Input, Radio } from "antd";

import styles from "./Header.scss";
const Search = Input.Search;
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.status,
            title: ""
        };
    }

    /*
   * 报料状态更改
   * */
    handleClick = e => {
        this.setState({ checked: e.target.value });
        this.props.ReportStatus(e.target.value);
    };
    /*
   * 搜索
   * */
    handleTitleChange = value => {
        this.setState({
            title: value
        });
        this.props.titleChange(value);
    };

    render() {
        let { checked } = this.state;
        let { type, reportCount } = this.props;
        return (
            <div>
                <div className={type == "1" ? styles.hide : styles.left}>
                    <Radio.Group value={checked} buttonStyle="solid" onChange={this.handleClick}>
                        <Radio.Button icon="audit" value="0" className={styles.btn}>
                            待审核
                            {reportCount && "(" + reportCount.dsh + ")"}
                        </Radio.Button>
                        <Radio.Button className={styles.btn} value="1" icon="file-search">
                            待回复
                            {reportCount && "(" + reportCount.dhf + ")"}
                        </Radio.Button>
                        <Radio.Button className={styles.btn} value="2" icon="file-done">
                            已回复
                            {reportCount && "(" + reportCount.clw + ")"}
                        </Radio.Button>
                        <Radio.Button className={styles.btn} value="3" icon="exception">
                            未通过
                            {reportCount && "(" + reportCount.bycl + ")"}
                        </Radio.Button>
                    </Radio.Group>
                </div>
                <div className={styles.search}>
                    <Search placeholder="搜索标题" enterButton="搜索" onSearch={this.handleTitleChange} />
                </div>
            </div>
        );
    }
}
