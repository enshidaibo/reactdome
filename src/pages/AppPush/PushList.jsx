import React, { useEffect } from "react";
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import { Table } from "antd";
import { getPushList } from "./services";
import { useTitle } from '@/hooks/global'
import useData from '@/hooks/useData'

import Platform from './Components/Platform'

const columns = [
    {
        title: "时间",
        dataIndex: "pushTime",
        key: "pushTime"
    },
    {
        title: "推送内容",
        dataIndex: "title",
        key: "title"
    },
    {
        title: "推送人",
        dataIndex: "createRealname",
        key: "createRealname"
    },
    {
        title: "推送平台",
        dataIndex: "dest",
        key: "dest",
        render: record => {
            return <Platform dest={record} />;
        }
    }
];

const PushList = () => {
    const [data, setData] = useData({ list: [], selectKeys: [], pageSize: 10, current: 1, total: 0 })
    let { list, selectKeys, pageSize, current, total } = data
    const getData = async () => {
        let res = await getPushList({ pageNo: current, pageSize, status: 1 })
        if (res.success) {
            setData({ list: res.body.list, selectKeys: [], total: res.body.totalCount })
        }
    }
    useEffect(() => { getData() }, [pageSize, current])
    const handleChangePage = ({ current }) => {
        setData({ current, selectKeys: [] })
    }
    useTitle('推送历史')
    return <RightContent>
        <Table rowKey={"id"} bordered
            columns={columns}
            dataSource={list}
            onChange={handleChangePage}
            pagination={{
                pageSize,
                current,
                total
            }} />
    </RightContent>
}

export default PushList