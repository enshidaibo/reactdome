import React from 'react'
import styles from './styles.scss';
const FormItem = ({ label, children }) => {
    return <div className={styles.form_item}>
        <div className={styles.form_label}>{label}</div>
        <div className={styles.form_ipt}>{children}</div>
    </div>
}

export default FormItem