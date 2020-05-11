import React, { useEffect } from 'react'
import styles from './styles.scss'

let timer = null

const debounce = (fn, delay) => {
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn();
        }, delay);
    }
}

const getUrlArray = (data) => {
    let type = typeof data
    let ret = ''
    if (type == 'string') {
        ret = `<script src="${data}"></script>`
    } else if (type == 'object') {
        data.map(d => {
            ret += `<script src="${d}"></script>`
        })
    }
    return ret
}

const Preview = ({ template, platesObject }) => {
    const openIframe = () => {
        let iframe = document.getElementById('iframe')
        let currentDoc = iframe.contentDocument || iframe.contentWindow.document
        currentDoc.open()
        let scr = getUrlArray(template.htmlUrl)
        let templateHtml = `${template.html}
        <script>
        var content = ${JSON.stringify(platesObject)}
        </script>
        ${scr}
        `
        currentDoc.write(templateHtml)
    }
    const openWindow = () => {
        let currentDoc = window.open('', '_blank')
        let scr = getUrlArray(template.htmlPcUrl)
        let templateHtml = `${template.htmlPc}
        <script>
        var content = ${JSON.stringify(platesObject)}
        </script>
        ${scr}
        `
        currentDoc.document.write(templateHtml)
    }
    useEffect(() => {
        let openWin = debounce(openIframe, 1000)
        openWin()
    }, [platesObject])
    return <div>
        <div className={styles.preview}>
            <span>专题预览</span>
            {template.htmlPc && <span className={`iconfont icon-yanjing ${styles.previewPc}`} onClick={openWindow} title='PC端预览'></span>}
        </div>
        <div className={styles.main}>
            <div className={styles.header}></div>
            <div className={styles.content}>
                <div className={styles.content_left}></div>
                <iframe id="iframe" frameBorder="0" className={styles.content_main}></iframe>
                <div className={styles.content_right}></div>
            </div>
            <div className={styles.footer}></div>
        </div>
    </div>
}

export default Preview