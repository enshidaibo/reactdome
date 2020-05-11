import { useState, useEffect } from "react";
import { Table, Modal, message } from 'antd';
import { getAppService } from "@/services/appchannel";
import useData from '@/hooks/useData';

const SelectService = ({ data, visible, setVisible, onOk }) => {
    const [state, setStateData] = useData({ services: [], selectedRowKeys: [], selectedRows: [] })
    useEffect(() => {
        const getData = async () => {
            setStateData({ selectedRowKeys: [], selectedRows: [] })
            if (!visible) {
                return
            }
            let res = await getAppService({
                pageNo: 1,
                pageSize: 1000
            })
            if (res.success) {
                data = data.map(d => d.id)
                let services = res.body.filter(d => {
                    return !data.includes(d.id)
                })
                setStateData({ services })
            }
        }
        getData()
    }, [visible])

    const rowSelection = {
        selectedRowKeys: state.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRowKeys.length + data.length > 8) {
                return message.error('绑定的服务总数不能超过8个！')
            }
            setStateData({ selectedRowKeys, selectedRows })
        }
    }
    const columns = [{
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
        align: 'center',
        render: (text) => {
            return <img style={{ width: '36px', height: '36px' }} src={text} />
        }
    }, {
        title: '服务名称',
        dataIndex: 'serviceName',
        key: 'serviceName',
        align: 'center',
    }];
    return <Modal title="服务列表"
        visible={visible}
        onOk={() => onOk(state.selectedRows)}
        onCancel={() => setVisible(false)}
        bodyStyle={{
            paddingBottom: 0,
        }}
    >
        <Table
            rowKey='id'
            rowSelection={rowSelection}
            dataSource={state.services}
            columns={columns}
            bordered={true}
            size='small'
        />
    </Modal>
}

export default SelectService