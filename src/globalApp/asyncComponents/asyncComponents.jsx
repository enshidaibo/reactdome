import React from "react";
import Loadable from "react-loadable";

import styles from "./asyncComponents.scss";

const LoadingComponent = ({ error, timedOut, pastDelay, retry, ...rest }) => {
    if (error) {
        return <LoadingError onClick={retry} title={"模块加载失败，点击重试"} />;
    } else if (timedOut) {
        return <LoadingError onClick={retry} title={"模块加载超时，点击重试"} />;
    } else if (pastDelay) {
        return <Loading />;
    }
    return null;
};

const LoadingError = ({ onClick, title }) => (
    <div className={styles.loading}>
        <div className={styles.loadingTitle} onClick={onClick}>
            {title}
        </div>
    </div>
);

const Loading = () => (
    <div className={styles.loading}>
        <div className={styles.loadingTitle}>模块加载中...</div>
    </div>
);

const asyncComponent = importComponent =>
    Loadable({
        loader: () => importComponent(),
        loading: props => <LoadingComponent {...props} />,
        delay: 200,
        timeout: 15000
    });

export default asyncComponent;
