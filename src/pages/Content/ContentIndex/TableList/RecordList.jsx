import React, { useEffect } from "react";
import { Table } from "antd";
import useData from '@/hooks/useData'
import { getContentRecord } from '../../service'

const actions = {
    0: "新增",
    1: "修改",
    2: "审核",
    3: "退回",
    4: "移动",
    5: "生成静态页",
    6: "删除到回收站",
    7: "下线",
    8: "出档",
    9: "推送共享",
    10: "置顶"
}

const RecordList = ({ data }) => {
    const [state, setState] = useData({ dataSource: [] })
    useEffect(() => {
        const getData = async () => {
            let res = await getContentRecord({ contentId: data.id })
            if (res.success) {
                setState({ dataSource: res.body })
            }
        }
        getData()
    }, [])
    const columns = [{
        title: '操作类型',
        dataIndex: 'operateType',
        key: 'operateType',
        render: (text) => actions[text]

    }, {
        title: '操作人',
        dataIndex: 'realname',
        key: 'realname'
    }, {
        title: '操作时间',
        dataIndex: 'operateTime',
        key: 'operateTime'
    }];
    return <div style={{ padding: "0 10px" }}>
        <Table
            title={() => "操作记录"}
            columns={columns}
            size="small"
            dataSource={state.dataSource}
            pagination={false} />
    </div>
}

export default RecordList
