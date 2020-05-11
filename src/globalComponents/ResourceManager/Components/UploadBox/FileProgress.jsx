import { Progress } from "antd";
import styles from "./FileProgress.scss";
const FileProgress = ({ state, progress }) => {
    let status = "active";
    switch (state) {
        case 2:
            status = "exception";
            break;
        case 3:
            status = "success";
            break;
        default:
            break;
    }
    let percent = Math.floor((progress.start * 100) / progress.filesize);
    return (
        <div className={styles.state}>
            <Progress
                percent={percent}
                status={status}
                showInfo={false}
                strokeLinecap="square"
                className={styles.progress}
            />
            {state == 1 && progress.start / progress.filesize}
        </div>
    );
};

export default FileProgress;
