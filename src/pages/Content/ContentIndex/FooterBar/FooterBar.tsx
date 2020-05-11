import * as React from 'react';
import { Button, Modal, Input } from "antd";
const { TextArea } = Input;
import useData from '@/hooks/useData';
import Authorized from '@/components/Authorized'
import ChannelModal from "../ChannelModal/ChannelModal";
import SectionModal from "../SectionModal/SectionModal";
import DeleteButton from "./DeleteButton";
import ChildrenModal from "../ChildrenModal/SectionModal";
import * as styles from './FooterBar.scss';

const FooterBar = ({ selectedRows, channel, query, action }) => {
    let ids = selectedRows.map(d => {
        return d.id
    })
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

    let disabled = selectedRows.length == 0
    return (
        <div className={styles['footerBar']}>
            <Button type="primary" className={styles['btn']} onClick={() => action.getListData()}>
                刷新
            </Button>
            {queryStatus == "draft" && (
                <Button
                    type="primary"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpPublic(selectedRows)}
                >
                    发布
                </Button>
            )}
            {handleQueryStatus(["draft", "prepared", "checked"]) && (
                <ChannelModal channel={channel} onSelect={channels => action.httpMove(selectedRows, channels)}>
                    <Button type="primary" className={styles['btn']} disabled={disabled}>
                        移动
                    </Button>
                </ChannelModal>
            )}
            {handleQueryStatus(["draft", "rejected", "checked"]) && (
                <ChannelModal channel={channel} onSelect={channels => action.httpCopy(selectedRows, channels)}>
                    <Button type="primary" className={styles['btn']} disabled={disabled}>
                        复制
                    </Button>
                </ChannelModal>
            )}
            {/* {handleQueryStatus(["prepared"]) && [
                <Button
                    type="primary"
                    key="tg"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpCheck(selectedRows)}
                >
                    通过
                </Button>,
                <Button
                    type="primary"
                    key="th"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpReject(selectedRows)}
                >
                    退回
                </Button>
            ]} */}
            {handleQueryStatus(["rejected"]) && (
                <Button
                    type="primary"
                    key="ss"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpReview(selectedRows)}
                >
                    送审
                </Button>
            )}
            {handleQueryStatus(["pigeonhole"]) && (
                <Button
                    type="primary"
                    key="cd"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpUnpigeonhole(selectedRows)}
                >
                    出档
                </Button>
            )}
            {handleQueryStatus(["recycle"]) && (
                <Button
                    type="primary"
                    key="hy"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpRecycle(selectedRows)}
                >
                    还原
                </Button>
            )}
            {handleQueryStatus(["checked"]) && [
                <Button
                    type="primary"
                    key="bczd"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpPriority(selectedRows)}
                >
                    保存置顶
                </Button>,
                <Button
                    type="primary"
                    key="tj"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpRecommend(selectedRows, 1)}
                >
                    推荐
                </Button>,
                <Button
                    type="primary"
                    key="qxtj"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpRecommend(selectedRows, -1)}
                >
                    取消推荐
                </Button>,
                <Button
                    type="primary"
                    key="sc"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpStatic(selectedRows)}
                >
                    生成
                </Button>,
                <Button
                    type="primary"
                    key="gd"
                    className={styles['btn']}
                    disabled={disabled}
                    onClick={() => action.httpPigeonhole(selectedRows)}
                >
                    下线
                </Button>,
                <ChannelModal key="refer" channel={channel} onSelect={channels => action.httpRefer(selectedRows, channels)}>
                    <Button type="primary" className={styles['btn']} disabled={disabled}>引用</Button>
                </ChannelModal>,
                <ChildrenModal key="tssite" ids={ids}>
                    <Button type="primary" className={styles['btn']} disabled={disabled}>
                        推送到子站点
                  </Button>
                </ChildrenModal>,
                <Authorized key="ts" auth={'contentlist.list'}>
                    <SectionModal
                        channel={channel}
                        onSelect={channels => action.httpPush(selectedRows, channels)}
                    >
                        <Button type="primary" className={styles['btn']} disabled={disabled}>推送</Button>
                    </SectionModal>
                </Authorized>
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