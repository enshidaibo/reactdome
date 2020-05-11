import styles from "./Warpper.scss";

const Warpper = ({ children, title = "文件上传" }) => {
    return (
        <div className={styles.UploadBox}>
            <div className={styles.warpper}>
                <div className={styles.title}>{title}</div>
                {children}
            </div>
        </div>
    );
};

export default Warpper;
