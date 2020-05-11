import React, { Component } from "react";
import { message } from "antd";
import Menubar from "./Menubar/Menubar";
import HeaderBar from "./HeaderBar/HeaderBar";
import TableList from "./TableList/TableList";
import TableListSelected from "./TableList/TableListSelected";
import { getChannelTree } from "@/services/channel";
import styles from "./ContentIndex.scss";

import { getContentList } from "@/services/content";

import { withRouter } from "react-router-dom";
@withRouter
export default class ContentIndex extends Component {
    constructor(props) {
        super(props);
        let { list = [] } = this.props
        let selectKeys = list.map(d => {
            return d.contentId
        })
        this.state = {
            channel: [],
            flattenChannel: [],
            openKeys: [],
            list: [],
            totalCount: 0,
            loading: false,
            selectedRows: [],
            selectKeys: selectKeys,
            query: {
                pageNo: 1,
                pageSize: 10,
                queryTopLevel: false, //置顶
                queryRecommend: false, //推荐
                queryShare: 0, //共享
                queryStatus: "checked", //状态
                cid: 0, //栏目id
                queryOrderBy: 4,
                queryTitle: "", //搜索标题
                queryInputUsername: "", //搜索发布人
                // isTopic: false
                sectionId: props.sectionId
            }
        };
    }
    componentDidMount() {
        this.getTree();
    }
    /**
     * 获取栏目数据
     * channel/select
     */
    getTree = async () => {
        let res = await getChannelTree();
        if (res.success) {
            let flattenChannel = this.flattenChannel(res.body);
            this.setState({
                channel: res.body,
                flattenChannel
            });
            this.getListData();
        }
    };
    /**
     * 栏目展开
     */
    handleOpenChange = openKeys => {
        this.setState({
            openKeys
        });
    };
    /**
     * 点击栏目
     */
    handleItemClick = e => {
        let { cid } = this.state.query;
        if (cid == e.key) {
            return;
        }
        this.getListData({
            cid: e.key,
            pageNo: 1,
            pageSize: 10,
            queryTopLevel: false, //置顶
            queryRecommend: false, //推荐
            queryShare: 0, //共享
            queryStatus: "checked", //状态
            queryOrderBy: 4,
            queryTitle: "", //搜索标题
            queryInputUsername: "" //搜索发布人
        });
    };

    /**
     * 选中的行
     */
    handleRowClick = data => {
        let { selectedRows, selectKeys } = this.state;
        if (selectKeys.includes(data.id)) {
            return message.warning('该条信息已经存在于列表中')
        }
        let isHave = selectedRows.filter(d => {
            return d.id == data.id;
        });
        if (isHave.length > 0) {
            return;
        }
        selectedRows = selectedRows.concat(data);
        this.setState({ selectedRows });
    };
    handleDelete = id => {
        let { selectedRows } = this.state;
        selectedRows = selectedRows.filter(d => {
            return d.id != id;
        });
        this.setState({ selectedRows });
    };
    handleChangeQuery = query => {
        this.setState({ query });
    };
    getListData = async (data = {}) => {
        this.setState({
            loading: true
        });
        let { query } = this.state;
        query = { ...query, ...data };
        let res = await getContentList(query);
        if (res.success) {
            this.setState({
                list: res.body,
                // selectedRows: [],
                totalCount: res.totalCount,
                loading: false,
                query
            });
        } else {
            this.setState({
                loading: false
            });
        }
    };
    render() {
        let { match, onClose, onOk } = this.props;
        let { channel, flattenChannel, openKeys, list, selectedRows, totalCount, loading, query } = this.state;
        return (
            <div className={styles.aticleList}>
                <Menubar
                    onOpenChange={this.handleOpenChange}
                    onClick={this.handleItemClick}
                    openKeys={openKeys}
                    channel={channel}
                    flattenChannel={flattenChannel}
                    selectedKeys={[String(query.cid)]}
                />
                <div className={styles.content}>
                    <HeaderBar
                        query={query}
                        match={match}
                        getListData={this.getListData}
                        onChangeQuery={this.handleChangeQuery}
                    />
                    <TableList
                        list={list}
                        selectedRows={selectedRows}
                        query={query}
                        totalCount={totalCount}
                        getListData={this.getListData}
                        onRowClick={this.handleRowClick}
                        match={match}
                        loading={loading}
                    />
                </div>
                <TableListSelected list={selectedRows} onClose={onClose} onOk={onOk} onDelete={this.handleDelete} />
            </div>
        );
    }
    flattenChannel = data => {
        return data.reduce((arr, { id, name, hasChild, parentId = 0, child = [] }) => {
            return arr.concat([{ id, name, hasChild, parentId }], this.flattenChannel(child));
        }, []);
    };
}
