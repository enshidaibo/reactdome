import { Spin } from 'antd';
import styles from './LoadSpin.scss';

const LoadSpin = ({ children, loading = false, delay = 0, ...rest }) => {
    return [
        loading && <div key='spin' className={styles.spin}>
            <Spin {...rest} delay={delay} />
        </div>,
        children
    ]
}

export default LoadSpin