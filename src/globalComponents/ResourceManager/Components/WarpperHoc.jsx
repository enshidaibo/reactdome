import React, { Component } from "react";
import { message } from "antd";

import { httpFilesDelete, getFilesList, getFilesMyList } from "@/services/resource";

const WarpperHoc = Component =>
    class extends Component {
        constructor(props) {
            super(props);
            let { onOk } = props;
            this.state = {
                isSelect: !!onOk,
                filesList: [],
                select: [],
                query: {
                    pageNo: 1,
                    pageSize: 36,
                    totalCount: 0,
                    typeId: null,
                    tag: ""
                }
            };
        }
        componentDidMount() {
            this.getData();
        }
        /**
         * 修改搜索
         */
        handleChangetag = e => {
            let { query } = this.state;
            query.tag = e.target.value;
            this.setState({
                query
            });
        };
        /**
         * 选中图片
         */
        handleSelect = d => {
            let { multiple } = this.props;
            if (multiple) {
                this.handleSelectMultiple(d);
            } else {
                this.handleSelectSingle(d);
            }
        };
        /**
         * 单选
         */
        handleSelectSingle = d => {
            let { select } = this.state;
            if (select.includes(d)) {
                select = [];
            } else {
                select = [d];
            }
            this.setState({
                select
            });
        };
        /**
         * 多选
         */
        handleSelectMultiple = d => {
            let { select } = this.state;
            if (select.includes(d)) {
                select = select.filter(data => {
                    return data != d;
                });
            } else {
                select = select.concat(d);
            }
            this.setState({
                select
            });
        };
        /**
         * 选中图片确定
         */
        handleOk = () => {
            let { onOk } = this.props;
            let { select } = this.state;
            onOk && onOk(select);
        };
        /**
         * 删除
         */
        handleDelete = async () => {
            let { select } = this.state;
            let filePaths = select.map(d => {
                return d.path;
            });
            let res = await httpFilesDelete({ filePaths: filePaths.join(",") });
            if (res.success) {
                message.success(res.message);
                this.getData();
            }
        };
        render() {
            return (
                <Component
                    {...this.props}
                    {...this.state}
                    handleChangetag={this.handleChangetag}
                    handleOk={this.handleOk}
                    handleSelect={this.handleSelect}
                    handleDelete={this.handleDelete}
                    getData={this.getData}
                />
            );
        }
        getData = async (data = {}) => {
            let { query } = this.state;
            query = {
                ...query,
                ...data
            };
            this.setState({ query });
            this.httpGetList(query);
        };
        httpGetList = async query => {
            let { type } = this.props;
            let { typeId } = query;
            query = {
                type,
                ...query
            };
            let res;
            if (typeId == -1) {
                res = await getFilesMyList(query);
            } else {
                res = await getFilesList(query);
            }
            if (res.success) {
                query.totalCount = res.totalCount;
                this.setState({
                    filesList: res.body,
                    totalPage: res.totalPage,
                    query,
                    select: []
                });
            }
        };
    };

export default WarpperHoc;
