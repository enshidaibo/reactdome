import React, { useEffect } from "react";
import { Button, Modal, Table, message } from "antd";
import { getAppChannelList, clearCache } from '@/services/appchannel';
import useData from '@/hooks/useData';

const ClearCache = () => {
    const [state, setState] = useData({
        cacheModal: false,
        appChannelData: []
    })
    let { cacheModal, appChannelData } = state;
    const httpGetAppChannel = async () => {
        let res = await getAppChannelList();
        if (res.success) {
            setState({
                appChannelData: res.body
            });
        } else {
            message.error(res.message);
        }
    }
    useEffect(() => {
        httpGetAppChannel();
    }, [])
    const handleCacheBtn = () => {
        setState({
            cacheModal: true,
        });
    }
    const hideCacheModal = () => {
        setState({
            cacheModal: false
        });
    }
    const handleClearCache = async (id) => {
        let res = await clearCache({ id });
        if (res.success) {
            message.success("清除成功");
        } else {
            message.error(res.message);
        }
    }
    const columns = [
        {
            title: "频道ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "频道名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "清除缓存",
            dataIndex: "",
            align: "right",
            key: "",
            render: (rext, record) => {
                return <Button size="small" onClick={() => handleClearCache(record.id)} type="primary">清除缓存</Button>
            }
        }
    ]
    return [
        <Button onClick={handleCacheBtn} type="primary" htmlType="submit" key='btn' style={{ marginLeft: '15px', float: 'left', margin: '5px 5px 0 0' }}>清除缓存</Button>,
        <Modal
            key='modal'
            title="清除频道缓存"
            visible={cacheModal}
            onOk={hideCacheModal}
            onCancel={hideCacheModal}
            footer={null}
        >
            <Table

                rowKey={(row) => row.id}
                columns={columns}
                size={"small"}
                dataSource={appChannelData}
            />
        </Modal>
    ]
}
export default ClearCache