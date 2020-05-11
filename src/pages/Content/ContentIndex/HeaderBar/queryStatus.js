/**
 * 文档状态
 */

const queryStatus = [
    // {
    //     value: "all",
    //     title: "所有状态"
    // },
    // {
    //     value: "contribute",
    //     title: "已发"
    // },
    {
        value: "draft",
        title: "草稿"
    },
    {
        value: "prepared",
        title: "待审"
    },
    {
        value: "passed",
        title: "已审"
    },
    {
        value: "checked",
        title: "终审"
    },
    {
        value: "rejected",
        title: "退回"
    },
    {
        value: "pigeonhole",
        title: "下线"
    },
    {
        value: "recycle",
        title: "回收站"
    }
];

export default queryStatus;