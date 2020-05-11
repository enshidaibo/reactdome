import React, { Component } from "react";
import { getListData, getHistoryListData } from "@/models/contentlist";
import { sortNumber, sortList } from "./function";

import Sorts from "./Sorts/Sorts";
import AddEntry from "./AddEntry/AddEntry";
import TableList from "./TableList/TableList";
import HistoryTableList from "./TableList/HistoryTableList";

import styles from "./styles.scss";

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sorts: [],
            isSort: false,
            loading: false,
            query: {
                pageNo: 1,
                pageSize: 100,
                totalCount: 0
            },
            historysList: [],
            historysloading: false,
            historysQuery: {
                pageNo: 1,
                pageSize: 10,
                totalCount: 0
            }
        };
    }
    componentDidMount() {
        let { sectionId } = this.props;
        if (sectionId) {
            this.getListData({
                id: sectionId,
                pageNo: 1
            });
            this.getHistoryListData({
                id: sectionId,
                pageNo: 1
            });
        }
    }
    handleChangeState = state => {
        this.setState(state);
    };
    handleChangeSorts = list => {
        console.log(list);
        let { sorts } = this.state;
        list = list.map((d, i) => {
            return {
                ...d,
                sort: sorts[i]
            };
        });
        this.setState({ list, isSort: true });
    };
    handleChangeList = list => {
        this.setState(() => sortList(list));
    };
    getListData = data => getListData(this, data);
    getHistoryListData = data => getHistoryListData(this, data);
    render() {
        let { curItem } = this.props;
        let { list, loading, query, historysList, historyloading, historysQuery, isSort } = this.state;
        return (
            <div>
                {curItem.classify == 0 && [
                    <div key="addentry">
                        <AddEntry
                            curItem={curItem}
                            list={list}
                            onChangeList={this.handleChangeList}
                            getListData={this.getListData}
                            query={query}
                            getHistoryListData={this.getHistoryListData}
                        />
                        <Sorts
                            list={list}
                            isSort={isSort}
                            query={query}
                            getListData={this.getListData}
                            getHistoryListData={this.getHistoryListData}
                            onChangeState={this.handleChangeState}
                        />
                    </div>,
                    <TableList
                        key="tablelist"
                        loading={loading}
                        list={list}
                        onChangeList={this.handleChangeList}
                        onChangeSorts={this.handleChangeSorts}
                        getListData={this.getListData}
                        getHistoryListData={this.getHistoryListData}
                        curItem={curItem}
                    />,
                    <div key="lsjl" className={styles.historys}>
                        历史记录
                    </div>
                ]}
                <HistoryTableList
                    historysList={historysList}
                    list={list}
                    onChangeList={this.handleChangeList}
                    loading={historyloading}
                    query={historysQuery}
                    onChangeState={this.handleChangeState}
                    getListData={this.getListData}
                    getHistoryListData={this.getHistoryListData}
                    curItem={curItem}
                />
            </div>
        );
    }
}
