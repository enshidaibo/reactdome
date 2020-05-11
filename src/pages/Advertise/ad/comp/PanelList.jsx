import React, { Component } from 'react';
import { Pagination, Icon, Popconfirm } from 'antd';

import PanelItem from "./PanelItem";
import Empty from "./Empty";
import { deleteAdver } from "@/services/advertise";

import panelStyle from './panel.scss';
import "../../base.css";

class PanelList extends Component {

    constructor (props) {
        super(props);
    }

    delAdver = (id) => {
        typeof this.props.delAdver === "function" && this.props.delAdver(id);
    }

    render () {

        let { dataSource } = this.props;

        return (
            <div>
                {
                    dataSource.length > 0
                    ?
                    <>
                        <ul className={panelStyle.ul + " row"}>
                        {
                            dataSource.map(d => {
                                return (
                                    <PanelItem data={d} key={d.id} delAdver={this.delAdver}/>
                                )
                            })
                        }
                        </ul>
                    </>
                    :
                    <Empty />
                }           
            </div>
        )
    }
}

export default PanelList;