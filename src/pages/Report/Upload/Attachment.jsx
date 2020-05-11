import React, { Component } from "react";
import { Button, Icon } from "antd";

import styles from "./Attachment.scss";

import uploadAttachments from "@/libs/Hoc/uploadAttachments/ReportUpload";
@uploadAttachments
export default class Attachment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleFileChange = e => {
        let { onChange } = this.props;
        onChange && onChange(e);
        this.inputfile.value = "";
    };
    render() {
        let { attachments, onDel, image } = this.props;
        let ext = {};
        if (image) {
            ext.accept = "image/gif,image/jpeg,image/jpg,image/png";
        }
        return (
            <div className={styles.Attachments}>
                <div className={styles.time}>
                    <span className={styles.t} />
                    <Button className={styles.uploadbtn} type="primary">
                        上传logo
                        <input
                            ref={ele => (this.inputfile = ele)}
                            className={styles.filebtn}
                            type="file"
                            onChange={this.handleFileChange}
                            {...ext}
                        />
                    </Button>
                </div>
                {attachments.length > 0 && (
                    <div className={styles.lists}>
                        {attachments.map(d => {
                            return (
                                <a
                                    href={d.bloburl}
                                    target="_blank"
                                    className={styles.list + " " + styles["list" + d.state]}
                                    key={d.uid}
                                    title={d.name}
                                >
                                    {d.state == 1 ? (
                                        <Icon className={styles.icon} type="loading" />
                                    ) : (
                                        <Icon className={styles.icon} type="paper-clip" />
                                    )}
                                    <span className={styles.name}>{d.name}</span>
                                    <span onClick={onDel} data-uid={d.uid} className={styles.del} title={"删除"}>
                                        ×
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}
