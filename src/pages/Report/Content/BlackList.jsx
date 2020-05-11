/*
* 黑名单
* */

import React, { Component } from "react";
import { Modal, Table, Input, message } from "antd";
const Search = Input.Search;
import styles from "./BlackList.scss";

export default class BlackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 10,
            count: 0,
            data: [],
            selectedRowKeys: [],
            phone: ""
        };
    }

    componentDidMount() {
        let { pageNo, phone } = this.state;
        this.BlackList(pageNo, phone);
    }
    /*
 * 关闭弹窗
 * */
    handleClose = () => {
        this.props.BlackListClose();
    };
    /*
 * 保存
 * */
    handleSave = async () => {
        let { selectedRowKeys, phone } = this.state;
        if (selectedRowKeys.length <= 0) {
            message.error("您还未选择用户");
            return;
        }
        console.log(selectedRowKeys);

        let res = await app.yssjfetch.post("admin/web/black/delete", {
            // ids: selectedRowKeys.toString()
            ids: selectedRowKeys
        });
        if (res.code == "200") {
            message.success("移除成功");
            this.BlackList(1, phone);
        }
    };
    /*
 * 黑名单列表
 * */
    BlackList = async (page, phone) => {
        let { pageSize } = this.state;
        let res = await app.yssjfetch.post("admin/web/black/list", {
            pageSize: pageSize,
            pageNo: page,
            phone: phone
        });
        if (res.code == "200") {
            this.setState({
                data: res.body,
                count: res.totalCount
            });
        }
    };
    /*
     *多选
     * */
    onSelectChange = selectedRowKeys => {
        this.setState({
            selectedRowKeys: selectedRowKeys
        });
    };
    /*
    * 搜索
    * */
    handlePhoneChange = phone => {
        this.setState({
            phone: phone
        });
        this.BlackList(1, phone);
    };

    render() {
        let columns = [
            {
                title: "用户ID",
                dataIndex: "userId"
            },
            {
                title: "昵称",
                dataIndex: "userName"
            },
            {
                title: "用户名",
                dataIndex: "realName"
            },
            {
                title: "手机号",
                dataIndex: "phone"
            }
        ];
        let { count, data, selectedRowKeys } = this.state;
        return (
            <div>
                <Modal
                    visible={this.props.visible}
                    title="黑名单"
                    okText="移除黑名单"
                    cancelText="取消"
                    okType="primary"
                    width={750}
                    onCancel={this.handleClose}
                    onOk={this.handleSave}
                >
                    <div className={styles.search}>
                        <Search placeholder="输入手机号" enterButton="搜索" onSearch={this.handlePhoneChange} />
                    </div>
                    <div>
                        <Table
                            dataSource={data}
                            rowKey={record => record.id}
                            columns={columns}
                            bordered={true}
                            rowSelection={{
                                selectedRowKeys,
                                onChange: this.onSelectChange
                            }}
                            pagination={{
                                total: count,
                                onChange: page => {
                                    this.BlackList(page, this.state.phone);
                                }
                            }}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}
