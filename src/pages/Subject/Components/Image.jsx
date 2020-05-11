import React, { useState } from 'react'
const ResourceManager = app.asyncComponent('ResourceManager')

import styles from './Image.scss'
const BaseImage = ({ name, value, onChange }) => {
    const [visible, setVisible] = useState(false)
    const handleChange = (data) => {
        setVisible(false)
        if (data.length > 0) {
            onChange({ [name]: data[0].path })
        }
    };
    let style = value ? { backgroundImage: `url(${value})` } : {}
    return (
        <div className={styles.image} style={style}>
            {!value && <div className={"iconfont icon-tianjiatupian " + styles.iconfont} />}
            <div className={styles.uploadBtn} onClick={() => setVisible(true)} />
            {visible && (
                <ResourceManager
                    onHide={() => setVisible(false)}
                    onOk={handleChange}
                    multiple={false}
                    image={false}
                    curTab={"image"}
                />
            )}
        </div>
    )
}

export default BaseImage
