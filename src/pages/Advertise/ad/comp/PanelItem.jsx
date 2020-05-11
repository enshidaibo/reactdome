import React, { Component } from 'react';
import { Icon, Popconfirm } from "antd";
import { Link } from "react-router-dom";

import panelStyle from './panel.scss';
import "../../base.css";


class PanelItem extends Component{

    constructor(props) {
        super(props);
    }

    delAdver = async (id) => {
        typeof this.props.delAdver === "function" && this.props.delAdver(id);
    }

    render () {
        const icon = {
            fontSize: "18px",
            color: "#999"
        }
        let { data } = this.props;

        return (
            <li className={panelStyle.panel}>
                <div className={panelStyle.label + " " + (data.status === "Y" ? panelStyle.green : panelStyle.primary)}>
                    {data.status === "Y" ? "使用中" : "未使用"}
                </div>
                <div className={panelStyle.hd}>
                    <img src={data.thumb} alt=""/>
                    <div className={panelStyle.hdDesc + " row"}>
                        <div>
                            关联设备数: {data.deviceNum ? (data.deviceNum) : 0}
                        </div>
                        <div>
                            <span>{data.adsTime + "'"}</span>
                        </div>
                    </div>
                </div>
                <div className={panelStyle.bd}>
                    <div className={panelStyle.nameWrap}>
                        <h3 className={panelStyle.tit} title={data.adsName}>{data.adsName}</h3>
                        <div className={panelStyle.sub}>{data.merName}</div>
                        <div className={panelStyle.sub}>{data.createDate}</div>
                    </div>
                    <div className={panelStyle.btnWrap + " row"}>
                        <span>
                            <Link to={`/advertise/ad/entity/${data.id}`}>
                                <Icon type="eye" className={panelStyle.icon} title="查看"/>
                            </Link>
                        </span>
                        <span>
                            <Link to={`/advertise/ad/push/${data.id}`}>
                                <Icon type="import" className={panelStyle.icon} title="发布"/>
                            </Link>
                        </span>
                        <span>
                        {
                            data.status === "Y"
                            ?
                            <span>
                                <Icon type="form" className={panelStyle.icon} style={{color: "#ccc", cursor: "not-allowed"}} title="修改已禁用"/>
                            </span>
                            :
                            <Link to={`/advertise/ad/edit/${data.id}`}>
                            <Icon type="form" className={panelStyle.icon} title="修改"/>
                            </Link>
                        }
                        </span>
                        <span>
                            <Popconfirm title="你确定要删除吗?" onConfirm={() => this.delAdver(data.id)}>
                                <Icon type="delete" className={panelStyle.icon} title="删除"/>
                            </Popconfirm>
                        </span>
                    </div>
                </div>
            </li>
        )
    }
}

export default PanelItem;