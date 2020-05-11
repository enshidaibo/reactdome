import React, { Component } from 'react';
import style from "./back.scss";

class Back extends Component {

    goBack = () => {
        this.props.history.goBack();
    }

    render () {
        return (
            <span className={style.back} onClick={this.goBack}>
                返回
            </span>
        )
    }
}

export default Back;