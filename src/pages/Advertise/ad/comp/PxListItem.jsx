import React, { Component } from 'react';

import pxItem from "./pxItem.scss";

class PxListItem extends Component {

    handleAddClick = (data) => {
        typeof this.props.btnOnClick === "function" && this.props.btnOnClick(data);
    }

    render () {
        let { data, select } = this.props;
        let status = false;
        select.find(f => {
            if(data.id === f.id){
                status = true;
                return
            }
        });
        return status === false ? (
            <div className={pxItem.pxitem}>
                <span>{data.name}({data.width}*{data.high})</span>
                <span className={pxItem.itemBtn} onClick={() => this.handleAddClick(data)}>添加</span>
            </div>
        ) : null;
    }
}

export default PxListItem;