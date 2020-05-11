import React, { Component } from "react";
import ContentLayout, { RightContent } from '@/pages/A_Layout/ContentLayout';

import Menubar from "./Menubar/Menubar";
import styles from "./ReportIndex.scss";
import Header from "./Content/Header";
import Content from "./Content/TableList";
import BlackList from "./Content/BlackList";

export default class ReportIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuId: "", //栏目id
            status: "0", //报料状态
            data: [],
            backlist: false, //是否选中黑名单
            visible: false, //黑名单弹框可见
            count: 0, //设置数据总条数
            page: 1, //当前页数
            pageSize: 10, //每页显示条数
            reportCount: null,
            title: ""
        };
    }

    componentDidMount() {
        let { menuId, status, page, title } = this.state;
        this.getBLList(menuId, status, page, title);
        this.handleReportCount(menuId);
    }
    /*
    * 选中栏目
    * */
    handleMenuIndex = menuId => {
        /*
       * 回收站 and 黑名单
       * */
        if (menuId == "黑名单") {
            this.setState({
                backlist: true,
                visible: true
            });
            return;
        }
        this.setState({
            menuId: menuId,
            backlist: false
        });
        this.getBLList(menuId, this.state.status);
        this.handleReportCount(menuId);
    };
    /*
    * 选中状态
    * */
    handleStatus = status => {
        this.setState({
            status: status
        });
        this.getBLList(this.state.menuId, status);
    };
    /*
    * 报料列表
    * */
    getBLList = async (menuId, status, page, title) => {
        let { data, pageSize } = this.state;
        let res = await app.yssjfetch.post("admin/web/bl/page", {
            columnId: menuId == "回收站" ? "" : menuId,
            status: menuId == "回收站" ? "4" : status,
            pageNo: page,
            pageSize: pageSize,
            title: title
        });
        data = [];
        if (res.code == "200") {
            data = res.body;
        }
        this.setState({
            data: data,
            count: res.totalCount
        });
    };

    /*
  * 各状态条数统计
  * */
    handleReportCount = async menuId => {
        if (menuId != "回收站") {
            let res = await app.yssjfetch.post("admin/web/bl/count", { columnId: menuId });
            if (res.code == "200") {
                this.setState({
                    reportCount: res.body
                });
            }
        }
    };

    /*
    * 黑名单弹框
    * */
    BlackListClose = () => {
        this.setState({
            visible: false
        });
    };

    changePage = page => {
        let { menuId, status } = this.state;
        this.getBLList(menuId, status, page);
    };
    handleRefresh = () => {
        let { menuId, status, page, title } = this.state;
        this.getBLList(menuId, status, page, title);
    };
    handleTitleChange = title => {
        this.setState({
            title: title
        });
        let { menuId, status } = this.state;
        this.getBLList(menuId, status, 1, title);
    };

    render() {
        let { menuId, status, data, backlist, visible, count, reportCount } = this.state;
        return (
            <ContentLayout>
                <Menubar query={menuId} MenuIndex={this.handleMenuIndex} />
                <RightContent>
                    <div>
                        <div className={styles.header}>
                            <Header
                                ReportStatus={this.handleStatus}
                                status={status}
                                menuId={menuId}
                                type={menuId == "回收站" ? "1" : "2"}
                                reportCount={reportCount}
                                titleChange={this.handleTitleChange}
                            />
                        </div>
                        <Content
                            data={data}
                            menuId={menuId}
                            Refresh={this.handleRefresh}
                            count={count}
                            changePage={this.changePage}
                        />
                    </div>
                    {backlist && <BlackList visible={visible} BlackListClose={this.BlackListClose} />}
                </RightContent>
            </ContentLayout>
        );
    }
}
