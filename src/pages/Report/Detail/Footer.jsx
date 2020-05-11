/*
* 爆料人信息
* */

import React, { Component } from "react";
import styles from "./Footer.scss";
import { Icon, Modal } from "antd";
import { Map, Marker } from "react-amap";
export default class Footer extends Component {
    constructor(props) {
        super(props);
        let { data } = this.props;
        this.state = {
            position:{ longitude: data.longitude,latitude: data.latitude},
            visible: false,
        };
    }
    /*
    * 查看地图
    * */
    handlePosition = () => {
        this.setState({
            visible: true
        });
    };
    /*
    *关闭
    * */
    handleClose = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        let { data } = this.props;
        let { position, visible } = this.state;
        return (
            <div className={styles.footer}>
                <div className={styles.blr}>报料人信息</div>
                <div className={styles.detail}>
                    <table className={styles.info}>
                        <tbody>
                            <tr className={styles.border}>
                                <td>
                                    <Icon type="user" />
                                </td>
                                <td>
                                    报料人:
                                    {data.userName}
                                </td>
                                <td>
                                    <Icon type="phone" />
                                </td>
                                <td>
                                    手机:
                                    {data.phone}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Icon type="calendar" />
                                </td>
                                <td>
                                    时间:
                                    {data.reportDate}
                                </td>
                                <td>
                                    <Icon type="environment" />
                                </td>
                                <td>
                                    位置:
                                    {data.address}
                                    {
                                        (!data.latitude || !data.longitude) ?
                                        <span style={{background: '#ccc', cursor: 'not-allowed',whiteSpace: 'nowrap'}} className={data.isShow=="0"?styles.map:styles.hide}>
                                            查看地图
                                        </span>
                                        :
                                        <span style={{whiteSpace: 'nowrap'}} onClick={this.handlePosition} className={data.isShow=="0"?styles.map:styles.hide}>
                                            查看地图
                                        </span>
                                    }
                                </td>
                            </tr>
                        <tr>
                            <td><Icon type="alert" /></td>
                            <td>报料信息：{data.isOpen=="0"?"公开":"不公开"}</td>
                            <td><Icon type="safety"/></td>
                            <td>报料人昵称：{data.isAnonymous=="0"?"匿名":"不匿名"}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <Modal
                            visible={visible}
                            maskClosable={false}
                            onCancel={this.handleClose}
                            footer={null}
                            width={630}
                        >
                            <div className={styles.mapShow}>
                                <Map amapkey={"960da4302360a088a226dbfcaef30ed3"} center={position} zoom={14}>
                                    <Marker position={position} />
                                </Map>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}
