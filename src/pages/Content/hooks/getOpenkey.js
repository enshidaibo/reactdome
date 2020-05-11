/**
 * 获取当前展开的栏目
 * @param {string} id 当前栏目id
 * @param {object} flattenChannel 栏目数据
 */
const getOpenkey = (id, flattenChannel) => {
    let openKey = []
    if (!id || id == 0) {
        return openKey
    }
    let parentChannel = flattenChannel.find(d => d.id == id * 1)
    if (parentChannel) {
        openKey.push(String(parentChannel.id))
        if (parentChannel.parentId != 0) {
            openKey = openKey.concat(getOpenkey(parentChannel.parentId, flattenChannel))
        }
    }
    return openKey
}

export default getOpenkey