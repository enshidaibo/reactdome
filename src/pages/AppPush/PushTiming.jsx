import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import { Table, Icon, Popconfirm, message } from "antd";
import { getPushList, deletePushContent } from "./services";
import { useTitle } from '@/hooks/global'
import actionStyles from '@/style/action.scss';
import Platform from './Components/Platform'
import useData from '@/hooks/useData'

const PushTiming = () => {
    const [data, setData] = useData({ list: [], selectKeys: [], pageSize: 10, current: 1, total: 0 })
    let { list, selectKeys, pageSize, current, total } = data
    const getData = async () => {
        let res = await getPushList({ pageNo: current, pageSize, status: 0 })
        if (res.success) {
            setData({ list: res.body.list, selectKeys: [], total: res.body.totalCount })
        }
    }
    useEffect(() => { getData() }, [pageSize, current])
    useTitle('定时推送')
    const handleChangePage = ({ current }) => {
        setData({ current, selectKeys: [] })
    }
    const handleDelete = async (id) => {
        let res = await deletePushContent({ id })
        if (res.success) {
            message.success('取消成功！')
            getData()
        }
    }
    const rowSelection = {
        selectedRowKeys: selectKeys,
        onChange: (selectKeys, selectedRows) => {
            setData({ selectKeys })
        }
    };
    const columns = [
        {
            title: "推送内容",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "计划时间",
            dataIndex: "timing",
            key: "timing"
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
        }, {
            title: "操作",
            key: "action",
            width: 180,
            align: "center",
            render: (text, record) => (
                <span className={actionStyles.action}>
                    <Link
                        className={`iconfont icon-bianji ${actionStyles.bianji}`}
                        title="编辑"
                        to={`/apppush/${record.id}`}
                    />
                    <Popconfirm
                        title={"取消推送？"}
                        onConfirm={() => handleDelete(record.id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span className={`iconfont icon-x ${actionStyles.delete}`} title="取消推送" />
                    </Popconfirm>
                </span>
            )
        }
    ];
    return <RightContent>
        <Table rowKey={"id"} bordered
            dataSource={list}
            columns={columns}
            // rowSelection={rowSelection}
            dataSource={list}
            onChange={handleChangePage}
            pagination={{
                pageSize,
                current,
                total
            }} />
    </RightContent>
}

export default PushTiming