
import React from 'react';
import { Input, Radio, Select, Button, Row, Col } from "antd";
import style from './style.scss'

const WorkFlow = ({ name, value, schema, uischem, onChange, error }) => {
    const roles = [{
        name: '管理员',
        id: 1
    }, {
        name: '测试管理员',
        id: 2
    }]
    const handleChange = (key, eName, eValue) => {
        value[key][eName] = eValue
        onChange({ [name]: value });
    }
    const handleAdd = () => {
        value = value.concat({ roleId: roles[0].id, countersigns: false })
        onChange({ [name]: value });
    }
    const handleDelete = (key) => {
        let eValue = value.filter((d, dk) => {
            return dk !== key
        })
        console.log(eValue);
        onChange({ [name]: eValue });
    }
    return <div className={style.workflow}>
        {value.map((d, key) => {
            return <Row gutter={24} key={key} className={style.row}>
                <Col span={3}>第{key + 1}步：</Col>
                <Col span={7}>
                    {/* 第{key + 1}步： */}
                    <Select value={d.roleId} onChange={e => handleChange(key, 'roleId', e)}>
                        {roles.map(d => {
                            return <Select.Option key={d.id} value={d.id} >{d.name}</Select.Option>
                        })}
                    </Select>
                </Col>
                <Col span={8} offset={2}>
                    <Radio.Group value={d.countersigns} onChange={e => handleChange(key, 'countersigns', e.target.value)}>
                        <Radio value={true}>会签</Radio>
                        <Radio value={false}>普通流转</Radio>
                    </Radio.Group>
                </Col>
                <Col span={4}>
                    <Button type='danger' shape="circle" icon="close" onClick={() => handleDelete(key)}></Button>
                </Col>
            </Row>
        })}
        <Button type='primary' disabled={roles.length == 0} onClick={handleAdd}>新增</Button>
    </div>
}

export default WorkFlow;