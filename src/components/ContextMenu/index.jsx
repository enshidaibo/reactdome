import React, { useState, useEffect, useRef } from "react";
import styles from './style.scss';

const ContextMenu = ({ children, menu }) => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState({})
    const uc = useRef()

    const contextmenu = env => {
        let e = env || window.event;
        e.preventDefault();
        setVisible(true)
        setData({ left: e.clientX, top: e.clientY })
        return false;
    }
    useEffect(() => {
        document.addEventListener("click", (e) => {
            setVisible(false)
        });
        uc.current.addEventListener("contextmenu", contextmenu);
    }, [])

    let style = visible ? data : {
        ...data,
        left: 100000
    }
    return [
        React.cloneElement(children, { ref: uc, key: "children" }),
        <div className={styles.menu} style={style} key={menu}>
            {menu}
        </div>
    ]
}

export default ContextMenu