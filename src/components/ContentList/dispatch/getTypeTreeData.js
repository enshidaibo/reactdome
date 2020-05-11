/**
 * 获取内容列表分类及列表
 */

import { getContentListType } from "@/services/contentlist";

const flattenChannel = data => {
    let res = [];
    data.map(d => {
        res = res.concat(d.sections);
    });
    return res;
};

const getTypeTreeData = async dispatch => {
    let res = await getContentListType();
    if (res.success) {
        console.log(res)
        let flattens = flattenChannel(res.body);
        dispatch.set({
            contentlist: res.body,
            flattens
        });
    }
};

export default getTypeTreeData;