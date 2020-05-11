import React from "react";
import { Menu } from "antd";
import Authorized from '@/components/Authorized'
import ChannelModal from "../ChannelModal/ChannelModal";
import SectionModal from "../SectionModal/SectionModal";
import ChildrenModal from "../ChildrenModal/SectionModal";
import styles from "./dropdownMenu.scss";

const handleQueryStatus = (arr = [], queryStatus) => {
    return arr.includes(queryStatus);
};

const dropdownMenu = (queryStatus, data, action, channel) => (
    <Menu className={styles.dropdownMenu}>
        {handleQueryStatus(["draft", "prepared", "checked"], queryStatus) && (
            <Menu.Item>
                <ChannelModal channel={channel} onSelect={channels => action.httpMove([data], channels)}>
                    <span>移动</span>
                </ChannelModal>
            </Menu.Item>
        )}
        {handleQueryStatus(["draft", "rejected", "checked"], queryStatus) && (
            <Menu.Item>
                <ChannelModal channel={channel} onSelect={channels => action.httpCopy([data], channels)}>
                    <span>复制</span>
                </ChannelModal>
            </Menu.Item>
        )}
        {handleQueryStatus(["prepared"], queryStatus) && [
            <Menu.Item>
                <span type="primary" key="tg" onClick={() => action.httpCheck([data])}>
                    通过
                </span>
            </Menu.Item>,
            <Menu.Item>
                <span key="th" onClick={() => action.httpReject([data])}>
                    退回
                </span>
            </Menu.Item>
        ]}
        {handleQueryStatus(["rejected"], queryStatus) && (
            <Menu.Item key="ss">
                <span onClick={() => action.httpReview([data])}>送审</span>
            </Menu.Item>
        )}
        {handleQueryStatus(["pigeonhole"], queryStatus) && (
            <Menu.Item key="cd">
                <span onClick={() => action.httpUnpigeonhole([data])}>出档</span>
            </Menu.Item>
        )}
        {handleQueryStatus(["recycle"], queryStatus) && (
            <Menu.Item>
                <span key="hy" onClick={() => action.httpRecycle([data])}>
                    还原
                </span>
            </Menu.Item>
        )}
        {handleQueryStatus(["checked"], queryStatus) && [
            <Menu.Item key="bczd">
                <span onClick={() => action.httpPriority([data])}>保存置顶</span>
            </Menu.Item>,
            data.recommend ? (
                <Menu.Item key="qxtj">
                    <span onClick={() => action.httpRecommend([data], -1)}>取消推荐</span>
                </Menu.Item>
            ) : (
                    <Menu.Item key="tj">
                        <span onClick={() => action.httpRecommend([data], 1)}>推荐</span>
                    </Menu.Item>
                ),
            <Menu.Item key="sc">
                <span onClick={() => action.httpStatic([data])}>生成</span>
            </Menu.Item>,
            <Menu.Item key="gd">
                <span onClick={() => action.httpPigeonhole([data])}>下线</span>
            </Menu.Item>,
            <Authorized key="ts" auth={'contentlist.list'}>
                <Menu.Item >
                    <SectionModal channel={channel} onSelect={channels => action.httpPush([data], channels)}>
                        <span>推送</span>
                    </SectionModal>
                </Menu.Item>
            </Authorized>,
            data.editAble && <Menu.Item key="tschildrenweb">
                <ChildrenModal channel={channel} ids={[data.id]}>
                    <span>推送到子站点</span>
                </ChildrenModal>
            </Menu.Item>
        ]}
    </Menu>
);

export default dropdownMenu;
