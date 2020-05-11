import React, { useState, useEffect, useRef } from 'react';

const loadImg = (url, callback) => {
    let img = new Image();
    img.onload = function () {
        callback(img)
    };
    img.onerror = function () {
        console.log('图片' + url + '加载出错了');
    };
    img.src = url
}

const LazyImg = ({ url, dom = 'span', ...props }) => {
    const imgEl = useRef(null);
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        let io = new IntersectionObserver((entries) => {
            entries.forEach((entrie) => {
                if (entrie.isIntersecting) {
                    loadImg(url, () => setVisible(true))
                    io.unobserve(imgEl.current);
                }
            });
        });
        io.observe(imgEl.current);
    }, [])
    let imgUrl = visible ? url : "https://r.estv.com.cn/u/cms/www/2019/07/08/image/08081209joo0.jpg"
    let Cpt = dom
    return dom == 'img' ?
        <img ref={imgEl}  {...props} src={imgUrl} />
        : <Cpt ref={imgEl}  {...props} style={{ backgroundImage: `url("${imgUrl}")` }}></Cpt>
}

export default LazyImg