/**
 * 按权限对路由进行筛选
 * @param {Object[]} list 路由配置数据
 * @param {Object[]} perms 权限数据
 * @param {Boolean} admin 是否是超管
 */

const orderList = (a, b) => {
    if (!a.order && !b.order) {
        return 0
    }
    if (a.order && b.order) {
        return b.order - a.order
    }
    if (a.order) {
        return -1
    }
    return 1
}

const initCycleMenu = (list, perms, admin = false) => {
    // list = list.sort(orderList)
    if (admin) {
        return list
    }
    let menus = list.filter(d => {
        if (!d.auth) {
            return true;
        }
        return perms.includes(d.auth);
    });
    menus = menus.map(m => {
        if (m.routes) {
            m.routes = initCycleMenu(m.routes, perms);
        }
        return m;
    });
    return menus;
};

export default initCycleMenu