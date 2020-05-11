import React, { Component } from 'react';
import { Avatar } from 'antd';

import statisStyle from './statis.scss';
import '../base.css';

class PanelSt extends Component {

    render () {
        return (
            <div className={"row"}>
                <div className={statisStyle.panelWrap + " row"}>
                    <div className={statisStyle.avatar}>
                        <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size={56}>
                            所有
                        </Avatar>
                    </div>
                    <div>
                        <h3 className={statisStyle.hd3 + " " + statisStyle.all}>
                            {this.props.totalDevice}
                        </h3>
                        <p className={statisStyle.ptxt}>所有设备数</p>
                    </div>
                </div>
                <div className={statisStyle.panelWrap + " row"}>
                    <div className={statisStyle.avatar}>
                        <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle' }} size={56}>
                            在线
                        </Avatar>
                    </div>
                    <div>
                        <h3 className={statisStyle.hd3 + " " + statisStyle.online}>
                            {this.props.totalOnLine}
                        </h3>
                        <p className={statisStyle.ptxt}>在线设备数</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PanelSt;