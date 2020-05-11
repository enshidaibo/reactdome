/**
 * 扁平化栏目数据
 * @param {树形数据} data
 * @param {父级Id} parentId
 */

const flattenChannels = (data, parentId = 0) => {
    return data.reduce((arr, { id, name, hasChild, child = [] }) => {
        return arr.concat([{ id, name, hasChild, parentId }], flattenChannels(child, id));
    }, []);
};

export default flattenChannels;