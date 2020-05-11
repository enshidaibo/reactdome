/**
 * 初始化用户信息
 */

import { getUserPerms, getTimestamp, heartbeat } from "@/services";
import useData from '@/hooks/useData'

import initCycleMenu from './initCycleMenu';
import flattenMenu from './flattenMenu';

const initUserInfo = (dispatch) => {
    const locale = app.globalRedux.getContext()
    let timedelay = null
    const initValue = {
        loading: true,
        error: false
    }
    const [data, setData] = useData(initValue)
    const initPermsMenu = perms => {
        perms = perms.split(",");
        let asyncRouters = []
        if (AppConfig.env == 'main') {
            let asyncModules = AppConfig.asyncModules || []
            asyncRouters = asyncModules.map(d => {
                return app.asyncRouters.find(r => {
                    return r.path == '/' + d.name
                })
            }).filter(d => d)
        } else {
            asyncRouters = app.asyncRouters
        }

        let routes = [].concat(app.inlineRouters, asyncRouters)
        let menus = initCycleMenu(routes, perms, perms == "*");
        let flattenMenus = flattenMenu(menus);
        return { menus, flattenMenus };
    };
    const handleKeep = async () => {
        heartbeat();
        clearTimeout(timedelay)
        timedelay = setTimeout(() => {
            if (!memoryStorage.getItem('sessionKey')) return;
            handleKeep();
        }, 1000 * 60 * 25);
    };
    const initFormatRudex = data => {
        let curWeb = data.sites.find(d => {
            return d.id == data.siteId;
        });
        curWeb = curWeb || data.sites[0]
        localStorages._site_id_param = curWeb.id;
        let { menus, flattenMenus } = initPermsMenu(data.perms);
        locale.dispatch.set({
            sessionKey: memoryStorage.getItem('sessionKey'),
            userInfo: data,
            curWeb,
            menus,
            flattenMenus,
            perms: data.perms
        });
        handleKeep();
    };
    const loadModule = async (perms) => {
        // let modules = await app.yssjfetch('http://192.168.60.109:3119/public/2.json')
        // if (modules.success) {
        // let asyncModules = (AppConfig.asyncModules || []).concat(modules.body);
        let asyncModules = AppConfig.asyncModules || []
        const promiseAll = asyncModules.map(d => {
            if (perms == "*" || perms.includes(d.name)) {
                let loadSrc = d[localStorage._site_id_param] || d.src
                return app.loadScripts(loadSrc)
            }
        }).filter(d => d)
        let values = await Promise.all(promiseAll)
        return values
        // }
    }
    const getInitUser = async () => {
        let res = await getUserPerms();
        if (res.success) {
            window.sitesConfig = res.body.config;
            window.app.sitesConfig = res.body.config;
            await loadModule(res.body.perms)
            initFormatRudex(res.body);
            setData({ loading: false });
        } else {
            setData({
                loading: false,
                error: true
            });
        }
    };
    const getInit = () => {
        if (memoryStorage.getItem('sessionKey')) {
            getInitUser();
        } else {
            setData({ loading: false })
        }
    }
    const getTimeCorrection = async () => {
        setData({
            loading: true,
            error: false
        });
        let res = await getTimestamp()
        if (res.success) {
            let timestamp = new Date().getTime()
            localStorages.timedifference = timestamp - res.body.timestamp
            getInit()
        } else {
            setData({
                loading: false,
                error: true
            });
        }
    }
    return [data, getTimeCorrection]
}

export default initUserInfo;

