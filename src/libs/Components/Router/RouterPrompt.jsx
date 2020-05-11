import React, { Component } from "react";
import { Prompt, withRouter } from "react-router";
@withRouter
export default class RouterPrompt extends Component {
    static defaultProps = {
        when: false
    };
    handleConfirm = location => {
        console.log(location);
        let res = confirm("还有内容未保存，确定离开吗？");
        if (res) {
            window.removeEventListener("beforeunload", this.handleBeforeunload);
        }
        return res;
    };
    render() {
        let { when } = this.props;
        return <Prompt when={when} message={this.handleConfirm} />;
    }
}
