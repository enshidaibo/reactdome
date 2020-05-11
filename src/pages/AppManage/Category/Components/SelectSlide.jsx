import React, { useEffect, useState } from 'react'
import { Modal, Button, Table, Input } from 'antd';
const Search = Input.Search;
import { getAppChannelSlideList } from "@/services/appchannel";
import { getContentListDetail } from "@/services/contentlist";
import styles from './SelectSlide.scss';
import PreviewCarousel from './PreviewCarousel';

const TableList = ({ id, onClick }) => {
    const [list, setList] = useState([])
    const [initlist, setInitList] = useState([])
    const [loading, setLoading] = useState(true)
    const getUserList = async () => {
        let query = {
            pageSize: 10000
        }
        setLoading(true)
        let res = await getAppChannelSlideList(query)
        setLoading(false)
        if (res.success) {
            let data = res.body.filter(d => {
                return id != d.id
            })
            setList(data)
            setInitList(data)
        }
    }
    useEffect(() => { getUserList() }, [])
    const handleSearch = value => {
        let filterList = initlist.filter(d => {
            return d.name.includes(value)
        })
        setList(filterList)
    }
    let timer
    const handleChange = e => {
        clearTimeout(timer);
        let value = e.target.value
        timer = setTimeout(() => {
            handleSearch(value)
        }, 300);
    }
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '幻灯片名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '限制条数',
        dataIndex: 'limitRows',
        key: 'limitRows',
    }];
    return <div>
        <div style={{ marginBottom: "15px", display: 'flex' }}>
            <Search
                placeholder="请输入搜索用户名或姓名"
                onSearch={handleSearch}
                onChange={handleChange}
                style={{ width: 220, marginRight: '10px' }}
            />
        </div>
        <Table
            rowKey={'id'}
            size='middle'
            dataSource={list}
            onRow={(record) => {
                return {
                    onClick: () => onClick(record.id),
                };
            }}
            bordered
            columns={columns}
            loading={loading} />
    </div>
}

const SelectSlide = ({ onOk, id }) => {
    const [visible, setVisible] = useState(false)
    const [detail, setDetail] = useState({})
    useEffect(() => {
        const getData = async () => {
            if (!id) {
                return setDetail({})
            }
            let res = await getContentListDetail({ id })
            if (res.success) {
                setDetail(res.body)
            }
        }
        getData()
    }, [id])
    const handleClick = id => {
        setVisible(false)
        onOk(id)
    }
    return <div>
        <div className={styles.header}>
            <div className={styles.header_title}>幻灯片绑定:</div>
            <div className={styles.name}>{detail.name}</div>
            <Button className={styles.btn} type='primary' onClick={() => setVisible(true)}>{id ? "重新选择" : "选择幻灯片"}</Button>
            {id && <Button onClick={() => onOk('')}>清除选择</Button>}
        </div>
        <PreviewCarousel id={id}></PreviewCarousel>
        <Modal
            title="幻灯片列表"
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={false}
            width={800}
            bodyStyle={{ width: '800px' }}
        >
            {visible && <TableList id={id} onClick={handleClick} />}
        </Modal>
    </div>
}

export default SelectSlide