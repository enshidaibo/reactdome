import React, { Component } from 'react'
import styles from './FormItem.scss';
const FormItem = ({ label, children, style = {} }) => {
    return <div className={styles.form_item} style={style}>
        <div className={styles.form_label}>{label}</div>
        <div className={styles.form_ipt}>{children}</div>
    </div>
}

export default FormItem