import React from 'react'
import BreadcrumbCmp from "@/Libs/Components/BreadcrumbCmp/BreadcrumbCmp";
import ErrorBoundary from '@/libs/ErrorBoundary'

import styles from './ContentLayout.scss'

const ContentLayout = ({ children }) => {
    return (
        <div className={styles.content_outer}>
            <BreadcrumbCmp />
            <ErrorBoundary>
                <ContentInline>
                    {children}
                </ContentInline>
            </ErrorBoundary>
        </div>
    )
}

export default ContentLayout

export const ContentInline = ({ className = '', children, ...rest }) => {
    let cls = `${styles.content_inline} ${className}`
    return <div className={cls} {...rest} >{children}</div>
}

export const LeftContent = ({ className = '', children, ...rest }) => {
    let cls = `${styles.left_content} ${className}`
    return <div className={cls} {...rest} >{children}</div>
}

export const RightContent = ({ className = '', children, ...rest }) => {
    let cls = `${styles.right_content} ${className}`
    return <div className={cls} {...rest} >{children}</div>
}

