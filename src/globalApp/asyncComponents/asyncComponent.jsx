import React, { Component, useState, useEffect } from "react";
import loadScripts from '../loadScripts'
const Loading = () => {
    return <div>组件加载中...</div>;
};

const errors = (loadComponent) => () => {
    return <div onClick={loadComponent}>模块加载出错了...</div>;
};

const asyncComponent2 = (cptCode) => {
    let Cpt = null
    let error = false
    let asyncCpts = AppConfig.asyncCpts || {}
    let urlInfo = asyncCpts[cptCode]
    if (!urlInfo) {
        return props => <div>加载的组件不存在</div>;
    }
    let cptUrl = urlInfo[localStorage._site_id_param] || urlInfo.src
    return props => {
        const [viseion, setVision] = useState(0)
        const loadComponent = () => {
            if (AppConfig.asyncCpts[cptCode].isload) {
                Cpt = window[cptCode].default
                setVision(Date.now())
                return
            }
            if (Cpt && !error) {
                return
            }
            loadScripts(cptUrl).then(res => {
                if (!res.success) {
                    error = true
                    Cpt = errors(loadComponent)
                } else {
                    AppConfig.asyncCpts[cptCode].isload = true
                    error = false
                    Cpt = window[cptCode].default
                }
                setVision(Date.now())
            })
        }
        useEffect(() => { loadComponent() }, [])
        return Cpt ? <Cpt {...props} /> : <Loading />;
    }
}

export default asyncComponent2