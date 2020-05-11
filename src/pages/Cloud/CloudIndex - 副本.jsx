import React, { Component } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";

import Menubar from "./Menubar/Menubar";
import Header from "./Header/Header";
import TableList from "./TableList/TableList";
import styles from "./CloudIndex.scss";
import { getContentList, getSectionList } from "@/services/cloud";

export default class CloudIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            totalCount: 0,
            pageSize: 10,
            search: {},
            selectIndex: "hot",
        };
    }

    componentDidMount() {
        let { selectIndex, search } = this.state;
        this.handleContentList(1, selectIndex, search)
    }

    /*
    * 获取热点/最新列表
    * */
    handleContentList = async (page, selectIndex, search) => {
        let { pageSize } = this.state;
        let postData = {
            ...search,
            pageNo: page,
            pageSize: pageSize,
            order: selectIndex == "hot" ? "0" : "1"
        };
        let result = await getContentList(postData);
        if (result.code == "200") {
            this.setState({
                dataSource: result.body,
                totalCount: result.totalCount
            });
        }
    }

    /*
    * 平台共享
    * */
    handleSectionList = async (page, search) => {
        let { pageSize } = this.state;
        let postData = {
            pageNo: page,
            pageSize: pageSize,
            id: search.share_id
        };
        let result = await getSectionList(postData);
        if (result.code == "200") {
            this.setState({
                dataSource: result.body,
                totalCount: result.totalCount
            });
        }
    }
    /*s
    * 菜单切换
    * */
    handleSelectChange = (selectIndex) => {
        this.setState({ selectIndex: selectIndex });
        let { search } = this.state;
        this.setState({ search: {} });
        if (selectIndex == "share") {
            this.setState({
                dataSource: [],
                totalCount: 0
            });
        }
        else {
            this.handleContentList(1, selectIndex, search);
        }
    };
    /*
    * 翻页
    * */
    handlePageChange = (page) => {
        let { selectIndex, search } = this.state;
        if (selectIndex == "share") {
            this.handleSectionList(1, search);
        }
        else {
            this.handleContentList(page, selectIndex, search)
        }
    };
    /*
    * 搜索
    * */
    handleSearch = (data) => {
        console.log(data)
        let { selectIndex } = this.state;
        this.setState({ search: data });
        if (selectIndex == "share") {
            this.handleSectionList(1, data);
        }
        else {
            this.handleContentList(1, selectIndex, data);
        }
    };

    render() {
        let { selectIndex, dataSource, totalCount, search } = this.state;
        return (
            <div className={styles.aticleIndex}>
                <BreadcrumbCmp />
                <div className={styles.aticleList}>
                    <Menubar selectKey={selectIndex} SelectChange={this.handleSelectChange} />
                    <div className={styles.content}>
                        <Header menuId={selectIndex} search={search} onSearch={this.handleSearch} />
                        <TableList data={dataSource}
                            changePage={this.handlePageChange}
                            totalCount={totalCount} />
                    </div>
                </div>
            </div>
        )
    }
}