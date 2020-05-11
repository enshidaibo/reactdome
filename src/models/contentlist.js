import { getContentListData, getContentListHistorysData } from "@/services/contentlist";

/**
 * 获取内容列表列表数据
 * @param {*} state
 */
export const getListData = async (that, data = {}) => {
    that.setState({
        loading: true
    });
    let { sectionId } = that.props;
    let { query } = that.state;
    query = { ...query, ...data, id: sectionId };
    let res = await getContentListData(query);
    if (res.success) {
        let list = res.body;
        let sorts = list.map(d => d.sort);
        that.setState({
            list: res.body,
            sorts: sorts,
            loading: false,
            query: {
                ...query,
                totalCount: res.totalCount
            }
        });
    } else {
        that.setState({
            loading: false
        });
    }
};

export const getHistoryListData = async (that, data = {}) => {
    that.setState({
        historyloading: true
    });
    let { sectionId } = that.props;
    let { historysQuery } = that.state;
    historysQuery = { ...historysQuery, ...data, id: sectionId };
    let res = await getContentListHistorysData(historysQuery);
    if (res.success) {
        that.setState({
            historysList: res.body,
            historyloading: false,
            historysQuery: {
                ...historysQuery,
                totalCount: res.totalCount
            }
        });
    } else {
        that.setState({
            historyloading: false
        });
    }
};