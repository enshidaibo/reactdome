import localRedux from './localRedux'

const initValue = {
    channel: [],
    flattenChannel: [],
    openKeys: [],
    version: 0,
    query: {
        pageNo: 1,
        pageSize: 10,
        cid: localStorage.contentcid || 0,
        queryTopLevel: false, //置顶
        queryRecommend: false, //推荐
        queryShare: 0, //共享
        queryStatus: "checked", //状态
        queryOrderBy: 2,
        queryTitle: "", //搜索标题
        queryInputUsername: "",//搜索发布人
        queryModelId: ''
    },
}

const ContentIndex = ({ children }) => {
    return (
        <localRedux.localRudexProvider value={initValue}>
            {children}
        </localRedux.localRudexProvider>
    )
}

export default ContentIndex
