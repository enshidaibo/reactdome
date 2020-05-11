import React, { useState } from 'react';
import { Modal, Input, Button, Select, InputNumber, message } from 'antd';
const Option = Select.Option
import FormItem from '@/components/Form/FormItem';
import useData from '@/hooks/useData';
import SelectChannel from './SelectChannel';

const initValue = { isAuto: false, channelId: null, limit: 10, title: "", siteId: localStorage._site_id_param }

const EditCpt = ({ setVisible, data, onChange }) => {
    const [state, setState] = useData(data || initValue)
    const handleChange = (value) => {
        setState(value)
    }
    const handleOk = () => {
        if (!state.title) {
            return message.warning('板块标题不能为空！')
        }
        setVisible(false)
        onChange(state)
    }
    return <Modal
        title="栏目列表"
        key="modal"
        visible={true}
        onOk={handleOk}
        // footer={null}
        onCancel={() => setVisible(false)}
    >
        <FormItem label="名称" style={{ borderTop: "none" }}>
            <Input value={state.title} onChange={e => handleChange({ title: e.target.value })} />
        </FormItem>
        <FormItem label="类型">
            <Select
                placeholder="请选择"
                showArrow={true}
                value={state.isAuto}
                style={{ width: '100%' }}
                onChange={isAuto => handleChange({ isAuto })}
            >
                <Option value={false}>手动</Option>
                <Option value={true}>自动</Option>
            </Select>
        </FormItem>
        {state.isAuto == true &&
            [<FormItem label="绑定栏目" key='channelId'>
                <SelectChannel value={state.channelId} onChange={channelId => handleChange({ channelId })}></SelectChannel>
            </FormItem>,
            <FormItem label="限制条数" key='limit'>
                <InputNumber style={{ width: '100%' }} value={state.limit} min={1} max={100} onChange={limit => handleChange({ limit })} />
            </FormItem>]
        }
    </Modal>
}

const ModalCpt = ({ data, onChange, children }) => {
    const [visible, setVisible] = useState(false)
    return [React.cloneElement(children, {
        key: "children",
        onClick: () => setVisible(true)
    }), visible && <EditCpt key='modal' setVisible={setVisible} data={data} onChange={onChange}></EditCpt>]
}

export default ModalCpt