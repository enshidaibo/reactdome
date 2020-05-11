import React, { Component } from "react";
import { Button, Modal, Input } from "antd";
const { TextArea } = Input;
import useData from '@/hooks/useData';
import ChannelModal from "../ChannelModal/ChannelModal";
import SectionModal from "../SectionModal/SectionModal";
import DeleteButton from "./DeleteButton.tsx";

import styles from "./FooterBar.scss";

const FooterBar = ({ selectedRows, channel, query, action }) => {
    const [state, setState] = useData({ visible: false, checkOpinion: '' })
    let { queryStatus } = query;
    const handleQueryStatus = (arr = []) => {
        return arr.includes(queryStatus);
    };
    const handleChangeCheckOpinion = (e) => {
        setState({ checkOpinion: e.target.value })
    }
    const handleOk = () => {
        let { selectedKey, checkOpinion } = state
        setState({ visible: false, checkOpinion: "" })
        action.httpReject(selectedKey, checkOpinion)
    }
    return (
        <div className={styles.footerBar}>
            <Button type="primary" className={styles.btn} onClick={() => action.getListData()}>
                刷新
            </Button>
            {queryStatus == "draft" && (
                <Button
                    type="primary"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpPublic(selectedRows)}
                >
                    发布
                </Button>
            )}
            {handleQueryStatus(["draft", "prepared", "checked"]) && (
                <ChannelModal channel={channel} onSelect={channels => action.httpMove(selectedRows, channels)}>
                    <Button type="primary" className={styles.btn} disabled={selectedRows.length == 0}>
                        移动
                    </Button>
                </ChannelModal>
            )}
            {handleQueryStatus(["draft", "rejected", "checked"]) && (
                <ChannelModal channel={channel} onSelect={channels => action.httpCopy(selectedRows, channels)}>
                    <Button type="primary" className={styles.btn} disabled={selectedRows.length == 0}>
                        复制
                    </Button>
                </ChannelModal>
            )}
            {/* {handleQueryStatus(["prepared"]) && [
                <Button
                    type="primary"
                    key="tg"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpCheck(selectedRows)}
                >
                    通过
                </Button>,
                <Button
                    type="primary"
                    key="th"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpReject(selectedRows)}
                >
                    退回
                </Button>
            ]} */}
            {handleQueryStatus(["rejected"]) && (
                <Button
                    type="primary"
                    key="ss"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpReview(selectedRows)}
                >
                    送审
                </Button>
            )}
            {handleQueryStatus(["pigeonhole"]) && (
                <Button
                    type="primary"
                    key="cd"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpUnpigeonhole(selectedRows)}
                >
                    出档
                </Button>
            )}
            {handleQueryStatus(["recycle"]) && (
                <Button
                    type="primary"
                    key="hy"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpRecycle(selectedRows)}
                >
                    还原
                </Button>
            )}
            {handleQueryStatus(["checked"]) && [
                <Button
                    type="primary"
                    key="bczd"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpPriority(selectedRows)}
                >
                    保存置顶
                </Button>,
                <Button
                    type="primary"
                    key="tj"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpRecommend(selectedRows, 1)}
                >
                    推荐
                </Button>,
                <Button
                    type="primary"
                    key="qxtj"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpRecommend(selectedRows, -1)}
                >
                    取消推荐
                </Button>,
                <Button
                    type="primary"
                    key="sc"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpStatic(selectedRows)}
                >
                    生成
                </Button>,
                <Button
                    type="primary"
                    key="gd"
                    className={styles.btn}
                    disabled={selectedRows.length == 0}
                    onClick={() => action.httpPigeonhole(selectedRows)}
                >
                    下线
                </Button>
                // <SectionModal
                //     key="ts"
                //     channel={channel}
                //     onSelect={channels => action.httpPush(selectedRows, channels)}
                // >
                //     <Button type="primary" className={styles.btn} disabled={selectedRows.length == 0}>
                //         推送
                //     </Button>
                // </SectionModal>
            ]}
            <DeleteButton selectedRows={selectedRows} action={action} query={query} />
            <Modal
                key='modal'
                title="退回理由"
                visible={state.visible}
                onOk={handleOk}
                onCancel={() => setState({ visible: false })}
            >
                <TextArea
                    placeholder="请输入退回理由"
                    autosize={{ minRows: 2, maxRows: 6 }}
                    value={state.checkOpinion}
                    onChange={handleChangeCheckOpinion}
                />
            </Modal>
        </div>
    );
}

export default FooterBar