import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Popconfirm, Modal, notification, Button } from 'antd';

import { columnList, columnDel, columnAdd, columnEdit } from '@/services/contribute';
import style from './styles.scss';
const contextConsumers = app.globalRedux.localRudexConsumers

@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class AsideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnData: [],
            params: {
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                pageNo: 1,
                pageSize: 10000
            }
        }
    }

    componentWillMount = () => {
        this.httpGetColumn();
    }

    //栏目列表
    httpGetColumn = async () => {
        let { params } = this.state;
        let res = await columnList(params);
        if (res.success) {
            this.setState({
                columnData: res.body
            });
        }
    }

    handleMenuOnClick = id => {
        this.props.onMenuClick && this.props.onMenuClick(id);
    }

    //请求错误提示
    handleErrorMsg = (msg = '') => {
        notification.error({
            message: '错误提示',
            description: msg ? msg : ''
        });
    }

    render() {
        let { columnId } = this.props;
        return (
            <div className={style.pageAside}>
                <div className={style.pageAsideHd}>
                    <span>投稿箱</span>
                </div>
                <div className={style.pageAsideBd}>
                    <div className={style.pageAsideBdWrap}>
                        <div className={style.pageAsideScroll}>
                            <div className={style.pageAsideMenu}>
                                <Menu className={style.menu}
                                    selectedKeys={[columnId ? columnId + '' : "all"]}
                                >
                                    <Menu.Item key="all" onClick={() => this.handleMenuOnClick("")} className={style.menuItem}>
                                        <Link to={`/contribute/index`}>全部</Link>
                                        {/* <span>全部</span> */}
                                    </Menu.Item>
                                    {
                                        this.state.columnData.map(d => {
                                            return (
                                                <Menu.Item key={d.id} onClick={() => this.handleMenuOnClick(d.id)} className={style.menuItem}>
                                                    <Link to={`/contribute/index/${d.id}`}>
                                                        <span className={style.menuSpan}>{d.columnName}</span>
                                                    </Link>
                                                    {/* <span>{d.columnName}</span> */}
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AsideBar;