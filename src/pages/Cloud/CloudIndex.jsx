import React, { Component, useEffect } from "react";
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";

import Menubar from "./Menubar/Menubar";
import Header from "./Header/Header";
import TableList from "./TableList/TableList";
import styles from "./CloudIndex.scss";
import { getContentList, getSectionList } from "@/services/cloud";
import useData from "@/hooks/useData";


let reqCode

const CloudIndex = () => {
    const [state, setState] = useData({
        dataSource: [],
        totalCount: 0,
        pageSize: 10,
        search: {},
        selectIndex: "hot",
        loading: true
    })

    let { dataSource, totalCount, pageSize, search, selectIndex, loading } = state
    /*
    * 获取热点/最新列表
    * */
    const handleContentList = async (pageNo, selectIndex, search) => {
        let postData = {
            ...search,
            pageNo,
            pageSize,
            order: selectIndex == "hot" ? "0" : "1"
        };
        let code = JSON.stringify(postData)
        reqCode = code
        setState({ loading: true })
        let result = await getContentList(postData);
        if (result.code == "200" && reqCode == code) {
            setState({
                dataSource: result.body,
                totalCount: result.totalCount,
                loading: false
            });
        }
    }

    // 平台共享
    const handleSectionList = async (pageNo, search) => {
        let postData = {
            pageNo,
            pageSize,
            id: search.share_id
        };
        let code = JSON.stringify(postData)
        reqCode = code
        setState({ loading: true })
        let result = await getSectionList(postData);
        if (result.code == "200" && reqCode == code) {
            setState({
                dataSource: result.body,
                totalCount: result.totalCount,
                loading: false
            });
        }
    }

    // 菜单切换
    const handleSelectChange = (selectIndex) => {
        if (selectIndex == "share") {
            setState({ selectIndex, dataSource: [], totalCount: 0 });
        }
        else {
            setState({ selectIndex });
            handleContentList(1, selectIndex, search);
        }
    };

    /*
 * 翻页
 * */
    const handlePageChange = (page) => {
        if (selectIndex == "share") {
            handleSectionList(1, search);
        }
        else {
            handleContentList(page, selectIndex, search)
        }
    };
    /*
    * 搜索
    * */
    const handleSearch = (search) => {
        setState({ search });
        if (selectIndex == "share") {
            handleSectionList(1, search);
        }
        else {
            handleContentList(1, selectIndex, search);
        }
    };
    useEffect(() => {
        handleContentList(1, selectIndex, search)
    }, [])

    return (
        <div className={styles.aticleIndex}>
            <BreadcrumbCmp />
            <div className={styles.aticleList}>
                <Menubar selectKey={selectIndex} SelectChange={handleSelectChange} />
                <div className={styles.content}>
                    <Header menuId={selectIndex} search={search} onSearch={handleSearch} />
                    <TableList data={dataSource}
                        loading={loading}
                        changePage={handlePageChange}
                        totalCount={totalCount} />
                </div>
            </div>
        </div>
    )
}

export default CloudIndex