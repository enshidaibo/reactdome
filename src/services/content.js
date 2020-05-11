/**
 * 内容管理接口
 */
/* global app */

const { yssjfetch } = app

//获取文章模板数据
export const getTplData = async data => yssjfetch.post("admin/tpl/model_list", data);

//获取文章热门标签
export const getHotTagsData = async () => yssjfetch.post("admin/tag/hot");

//获取机构信息
export const getOrgsData = async () => yssjfetch.post("admin/dictionary/org");

//获取专题列表数据
export const getTopicListData = async () => yssjfetch.post("admin/contentSection/topicList");

//获取领导数据
export const getLeaderData = async () => yssjfetch.post("admin/dictionary/leader");

//获取文章列表数据
export const getContentList = async data => yssjfetch.post("admin/content/list", data);

//获取内容统计数据
export const getCountData = async () => yssjfetch.post("admin/content/count");

//文章还原
export const httpRecycle = async data => yssjfetch.post("admin/content/cycle_recycle", data);

//文章复制
export const httpCopy = async data => yssjfetch.post("admin/content/copy", data);

//文章发布
export const httpPublic = async data => yssjfetch.post("admin/content/submit", data);

//文章送审
export const httpReview = async data => yssjfetch.post("admin/content/submit", data);

//文章出档
export const httpUnpigeonhole = async data => yssjfetch.post("admin/content/unpigeonhole", data);

//文章下线
export const httpPigeonhole = async data => yssjfetch.post("admin/content/pigeonhole", data);

//文章移动
export const httpMove = async data => yssjfetch.post("admin/content/move", data);

//文章审核通过
export const httpCheck = async data => yssjfetch.post("admin/content/check", data);

//文章退回
export const httpReject = async data => yssjfetch.post("admin/content/reject", data);

//生成静态页面
export const httpStatic = async data => yssjfetch.post("admin/content/static", data);

//推荐/取消推荐
export const httpRecommend = async data => yssjfetch.post("admin/content/recommend", data);

//置顶
export const httpPriority = async data => yssjfetch.post("admin/content/priority", data);

//文章删除
export const httpDelete = async data => yssjfetch.post("admin/content/delete", data);

//文章彻底删除
export const httpCycleDelete = async data => yssjfetch.post("admin/content/cycle_delete", data);

//文章推送
export const httpPush = async data => yssjfetch.post("admin/contentSection/push", data);

//获取文章详情
export const getContentDetail = async data => yssjfetch.post("admin/content/getByModel", data);

//新增文章
export const httpContentAdd = async data => yssjfetch.post("admin/content/saveByModel", data);

//新增政务公开
export const httpGoverDocAdd = async data => yssjfetch.post("admin/content/gaSave", data);

//编辑文章
export const httpContentUpdate = async data => yssjfetch.post("admin/content/updateByModel", data);

//编辑政务公开
export const httpGoverDocUpdate = async data => yssjfetch.post("admin/content/gaUpdate", data);

//新增专栏
export const httpTopicAdd = async data => yssjfetch.post("admin/content/topicSave", data);

//编辑专栏
export const httpTopicUpdate = async data => yssjfetch.post("admin/content/topicUpdate", data);

//获取当前站点所有用户
export const getSiteUser = async () => yssjfetch.post("admin/user/local_list");

//获取子站点列表
export const getChildrenSites = async data => yssjfetch.post("admin/site/tree", data);

//获取子站点栏目
export const getChildrenChannel = async data => yssjfetch.post("admin/channel/select", data);

//推送到子站点
export const postChildrenPush = async data => yssjfetch.post("admin/content/sitePush", data);