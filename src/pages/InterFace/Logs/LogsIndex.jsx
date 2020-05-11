import { useEffect } from 'react'
import ContentLayout, { RightContent } from '@/pages/A_Layout/ContentLayout';
import { getOperatingLogs } from "@/services";
import useData from '@/hooks/useData';

import { Button, Select, Input, Table } from "antd";
const Option = Select.Option;
import styles from './styles.scss';

const LogsIndex = () => {
    const [data, setData] = useData({
        list: [],
        total: 0,
        pageNo: 1,
        queryUsername: "",
        queryTitle: "",
        queryIp: "",
        category: "",//日志类型：1：登录成功日志   2：登录失败日志  3：操作日志
        version: 0,
        loading: true,
    })
    let { pageNo, queryUsername, queryTitle, queryIp, category, version, loading } = data
    useEffect(() => {
        const getData = async () => {
            setData({ loading: true })
            let res = await getOperatingLogs({ pageNo, queryUsername, queryTitle, queryIp, category })
            if (res.success) {
                setData({ list: res.body, total: res.totalCount, loading: false })
            } else {
                setData({ loading: false })
            }
        }
        getData()
    }, [pageNo, category, version])
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "70px",
            align: "center"
        },
        {
            title: "用户名",
            dataIndex: "userName",
            key: "userName",
            width: 70,
            align: "center"
        },
        {
            title: "真实姓名",
            dataIndex: "realName",
            key: "realName",
            width: 70,
            align: "center"
        },
        {
            title: "IP",
            dataIndex: "ip",
            key: "ip",
            width: 70,
            align: "center"
        },
        {
            title: "时间",
            dataIndex: "time",
            key: "time",
            width: 70,
            align: "center"
        },
        {
            title: "操作",
            dataIndex: "title",
            key: "title",
            width: 70,
            align: "center"
        },
        {
            title: "具体参数数据",
            dataIndex: "content",
            key: "content",
            align: "center",
            width: 160
        }
    ];
    return <ContentLayout>
        <RightContent>
            <div className={styles.ac}>
                <div className={styles.ds}>用户名：</div>
                <Input className={styles.ipt} onChange={e => setData({ queryUsername: e.target.value })} />
                <div className={styles.ds}>标题：</div>
                <Input className={styles.ipt} onChange={e => setData({ queryTitle: e.target.value })} />
                <div className={styles.ds}>IP：</div>
                <Input className={styles.ipt} onChange={e => setData({ queryIp: e.target.value })} />
                <div className={styles.ds}>日志类型：</div>
                <Select className={styles.ipt} style={{ width: 130 }} placeholder="请选择" onChange={category => setData({ category })}>
                    <Option value={3}>操作日志</Option>
                    <Option value={1}>登录成功日志</Option>
                    <Option value={2}>登录失败日志</Option>
                </Select>
                <Button type={"primary"} onClick={() => setData({ version: Date.now() })} >
                    查询
                </Button>
                <div className="clear"></div>
            </div>
            <Table
                loading={loading}
                pagination={{
                    pageSize: 10,
                    total: data.total,
                    current: data.pageNo,
                    showTotal: (total, range) => `当前第${range[0]}-${range[1]}条，共${total}条数据`
                }}
                columns={columns}
                bordered
                dataSource={data.list}
                rowKey={record => record.id}
                onChange={({ current }) => setData({ pageNo: current })}
            />
        </RightContent>
    </ContentLayout>
}


export default LogsIndex