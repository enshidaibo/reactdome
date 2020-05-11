/**
 * 对菜单进行扁平化
 * @param {Object[]} data 菜单数据
 */
const flattenMenu = data => {
    return data.reduce((arr, d) => {
        let { routes = [], path, ...rest } = d
        let hasChildren = routes.length > 0;
        routes = routes.map(d => ({ ...d, parentPath: path }));
        return arr.concat([{ ...rest, path, hasChildren }], flattenMenu(routes));
    }, []);
};

export default flattenMenu