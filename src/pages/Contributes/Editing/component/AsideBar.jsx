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
            modal: false,
            modalType: true,
            form: {
                id: '',
                columnName: ''
            },
            params: {
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                pageNo: 1,
                pageSize: 10000
            },
            saveLoading: false
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

    //modal对话框取消
    handleModalCancel = () => {
        //重置表单数据, 模式改为默认的新增项
        let { form } = this.state;
        form.id = '';
        form.columnName = '';
        this.setState({
            modal: false,
            modalType: true,
            form
        });
    }

    //新增栏目modal显示
    handleCreateColumn = () => {
        let { form } = this.state;
        form.id = '';
        form.columnName = '';
        this.setState({
            form,
            modal: true,
            modalType: true
        });
    }

    //修改栏目modal显示
    handleUpdateColumn = (column) => {
        if (!column) {
            return;
        }
        if (!column.id || !column.columnName) {
            return;
        }
        let { form } = this.state;
        form.id = column.id;
        form.columnName = column.columnName;
        this.setState({
            form,
            modal: true,
            modalType: false
        });
    }

    //modal input onchange
    handleOnChangeText = (e) => {
        let { form } = this.state;
        if (e.target.value.length < 20) {
            form.columnName = e.target.value;
        } else {
            form.columnName = e.target.value.substring(0, 20);
        }
        this.setState({
            form
        });
    }

    //栏目保存及更新
    handleColumnSave = async () => {
        this.setState({
            saveLoading: true
        });
        if (this.state.modalType) {
            //新增栏目处理
            let { form } = this.state;
            let data = {
                columnName: form.columnName,
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                realName: this.props.userInfo.realname
            }
            let res = await columnEdit(data);
            if (res.success) {
                this.httpGetColumn();
            }
        } else {
            //修改栏目处理
            let { form } = this.state;
            let data = {
                id: form.id,
                columnName: form.columnName,
                siteId: this.props.userInfo.siteId,
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                realName: this.props.userInfo.realname
            }
            let res = await columnEdit(data);
            if (res.success) {
                this.httpGetColumn();
            }
        }
        this.setState({
            modal: false,
            modalType: true,
            saveLoading: false
        });
    }

    //栏目删除
    handleColumnDel = async (id) => {
        let data = {
            id: id,
            siteId: this.props.userInfo.siteId,
            userName: this.props.userInfo.username,
            token: sessionStorage.token,
            realName: this.props.userInfo.realname
        }
        let res = await columnDel(data);
        if (res.success) {
            this.httpGetColumn();
        }
    }

    //到栏目
    handleToColumn = id => {
        this.props.onClick && this.props.onClick(id);
        this.props.history.push(`/contribute/editing/${id}`);
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
                    <span>审稿箱</span>
                    <i className={`iconfont icon-add`} onClick={this.handleCreateColumn}></i>
                </div>
                <div className={style.pageAsideBd}>
                    <div className={style.pageAsideBdWrap}>
                        <div className={style.pageAsideScroll}>
                            <div className={style.pageAsideMenu}>
                                <Menu className={style.menu}
                                    selectedKeys={[columnId ? columnId + '' : "all"]}
                                >
                                    <Menu.Item key="all" className={style.menuItem}>
                                        <Link to={`/contribute/editing`}>全部</Link>
                                    </Menu.Item>
                                    {
                                        this.state.columnData.map(d => {
                                            return (
                                                <Menu.Item key={d.id} className={style.menuItem}>
                                                    <div className={style.menuItemBox}>
                                                        <span className={style.menuSpan} onClick={() => this.handleToColumn(d.id)}>{d.columnName}</span>
                                                        <Icon onClick={() => this.handleUpdateColumn(d)} type="edit" title={"编辑"} />
                                                        <Popconfirm
                                                            title="您确定删除该栏目吗?"
                                                            okText="删除"
                                                            cancelText="取消"
                                                            okType="primary"
                                                            onCancel=""
                                                            onConfirm={() => this.handleColumnDel(d.id)}
                                                        >
                                                            <Icon type="delete" title={"删除"} />
                                                        </Popconfirm>
                                                    </div>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <Modal
                        visible={this.state.modal}
                        title={<div style={{ textAlign: 'center' }}>{this.state.modalType ? '创建栏目' : '修改栏目'}</div>}
                        onOk={this.handleColumnSave}
                        centered
                        onCancel={this.handleModalCancel}
                        bodyStyle={{ background: '#f0f2f5', borderRadius: '0 0 4px 4px' }}
                        footer={null}
                    >
                        <div className={style.formItem}>
                            <label>栏目名称</label>
                            <input value={this.state.form.columnName} onChange={this.handleOnChangeText} placeholder="请输入栏目名称,保持在10字以内" />
                        </div>
                        <div className={style.btnGroup}>
                            <Button type="primary" loading={this.state.saveLoading} onClick={this.handleColumnSave}>保存</Button>
                            <Button onClick={this.handleModalCancel}>取消</Button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default AsideBar;