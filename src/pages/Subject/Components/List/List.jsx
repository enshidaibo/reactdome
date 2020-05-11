import React, { useState } from 'react';
import { Button, Tabs, Icon } from 'antd';
import ModalCpt from './ModalCpt'
import styles from './List.scss'
import ExpandedRowRender from './expandedRowRender';
import ArticleList from '../common/ArticleList'

const { TabPane } = Tabs;

const List = ({ name, value = [], onChange }) => {
    const [activeKey, setActiveKey] = useState('0')
    let list = value.map((d, i) => {
        return {
            ...d,
            index: i + 1
        };
    });
    const handleAdd = (data) => {
        value = value.concat(data)
        onChange({ [name]: value })
    }
    const handleChangeOrder = (key, pre = -1) => {
        key = parseInt(key)
        let startIndex = key + pre
        let start = list[startIndex]
        let end = list[key]
        if (!start || !end) {
            return
        }
        let list1 = list.set(startIndex, end)
        let list2 = list1.set(key, start)
        setActiveKey(`${startIndex}`)
        onChange({ [name]: list2 })
    }
    const handleChangeTabs = key => {
        setActiveKey(`${key}`)
    }
    const handleRemove = (key) => {
        let value = list.filter(d => {
            return d.index != key
        })
        onChange({ [name]: value })
    }
    const handleEdit = (record) => {
        if (record.isAuto == true) {
            record.data = []
        }
        let value = list.setIn([record.index - 1], record)
        onChange({ [name]: value })
    }
    const handleEditData = (record, data) => {
        let value = list.setIn([record.index - 1, 'data'], data)
        onChange({ [name]: value })
    }
    const handleAddData = (record, data) => {
        let newData = data.concat(record.data || [])
        let value = list.setIn([record.index - 1, 'data'], newData)
        onChange({ [name]: value })
    }
    return <div>
        <ModalCpt onChange={handleAdd}>
            <Button type="primary" style={{ marginBottom: '10px' }}>新增栏目列表</Button>
        </ModalCpt>
        {list.length > 0 ? <Tabs activeKey={activeKey} animated={false} onChange={handleChangeTabs}>
            {list.map((record, index) => {
                const handleOk = (d) => {
                    setVisible(false)
                    onClick(record, d)
                }
                return <TabPane tab={record.title} key={index}>
                    <div className={styles.action}>
                        {!record.isAuto &&
                            <ArticleList onOk={d => handleAddData(record, d)}>
                                <Button type="primary" style={{ marginRight: '5px' }}>选取内容</Button>
                            </ArticleList>
                        }
                        <ModalCpt onChange={handleEdit} data={record} >
                            <Button type="primary" style={{ marginRight: '5px' }}>编辑</Button>
                        </ModalCpt>
                        <Button type="primary" style={{ marginRight: '5px' }} onClick={() => handleChangeOrder(index)}>前移</Button>
                        <Button type="primary" style={{ marginRight: '5px' }} onClick={() => handleChangeOrder(index, 1)}>后移</Button>
                        <Button type="danger" onClick={() => handleRemove(record.index)}>删除</Button>
                    </div>
                    <ExpandedRowRender record={record} handleEditData={handleEditData} />
                </TabPane>
            })}
        </Tabs> : null}
    </div>
}
export default List
