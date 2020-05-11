import React from "react";
import { Link } from "react-router-dom";
import { Table, Dropdown, Popconfirm, Menu, Modal, Input, Tooltip } from "antd";
const { TextArea } = Input;
import useData from '@/hooks/useData';
import ModelView from "./ModelView";
import styles from "./TableList.scss";
import dropdownMenu from "./dropdownMenu";
import { mergeState$ } from "../../stream";
import RecordList from "./RecordList";

// const checkSteps = ['通过', '一审', '二审', '三审', '四审', '五审']

const TableList = ({ list, totalCount, loading, selectedRows, query, match, action, channel, workflow = [] }) => {
    const globalRedux = app.globalRedux.getContext()
    const { userInfo } = globalRedux.context
    let userRoles = userInfo.roleIds
    const [state, setState] = useData({ visible: false, checkOpinion: '', selectedKey: [] })
    /**
     * 修改置顶
     */
    const handleChangeTopLevel = (record, value) => {
        let index = list.findIndex(d => {
            return d.id == record.id;
        });
        list = list.setIn([index, 'topLevel'], value)
        mergeState$.next({ list });
    };

    const handleChangeCheckOpinion = (e) => {
        setState({ checkOpinion: e.target.value })
    }
    const handleOk = () => {
        let { selectedKey, checkOpinion } = state
        setState({ visible: false, checkOpinion: "" })
        action.httpReject(selectedKey, checkOpinion)
    }
    let columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 70,
            align: "center"
        },
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <span>
                    <ModelView modelId={record.modelId} />
                    {record.topLevel > 0 && (
                        <span style={{ color: "#ff6c04" }}>
                            [顶{record.topLevel}]
                        </span>
                    )}
                    {record.recommend && (
                        <span style={{ color: "#4590f5" }}>
                            [推荐 {record.recommendLevel}]
                        </span>
                    )}
                    <span>[{record.channelName}]</span>
                    <a href={record.url} target="_blank" title="预览" >{text}</a>
                </span>
            )
        },
        {
            title: "置顶",
            dataIndex: "topLevel",
            key: "topLevel",
            width: 60,
            align: "center",
            render: (text, record) => (
                <input
                    className={styles.topLevel}
                    onChange={e => handleChangeTopLevel(record, e.target.value)}
                    value={record.topLevel}
                />
            )
        },
    ];
    let queryStatusColumns = (typeof query.queryStatus == 'number' || query.queryStatus == "prepared") ? [{
        title: "操作",
        dataIndex: "checkStep",
        key: "action",
        width: 180,
        align: "center",
        render: (text, record) => {
            // let hasPrem = userRoles.includes(workflow[text-1].roleId)
            let queryStep = 0
            let workflows = []
            if (query.queryStatus == "prepared") {
                queryStep = text - 1
                workflows = record.checkNodes
            } else {
                queryStep = query.queryStatus
                workflows = workflow
            }
            let queryId = workflows[queryStep].roleId
            let isFrist = workflows[0].roleId == queryId
            let isLast = userRoles.includes(workflows[workflows.length - 1].roleId)
            let hasPrem = userRoles.includes(queryId)
            return <span className={styles.action}>
                {record.checkOpinion && <Tooltip title={record.checkOpinion}>
                    <span className={`iconfont icon-pinglun ${styles.yanjing}`} title="退回理由"></span>
                </Tooltip>}
                {record.modelId != 5 ?
                    <a
                        href={record.url}
                        target="_blank"
                        className={`iconfont icon-yanjing ${styles.yanjing}`}
                        title="预览"
                    /> :
                    <span className={`iconfont icon-yanjing ${styles.disable}`} title="预览" />
                }
                {(isFrist || hasPrem) && <a
                    href={`#${match.url}/${record.id}`}
                    target="_blank"
                    className={`iconfont icon-bianji ${styles.bianji}`}
                    title="编辑"
                />
                }
                {(isFrist || hasPrem) && <Popconfirm
                    title={"确定删除？"}
                    onConfirm={() => action.httpDelete([record], query.queryStatus == "recycle")}
                    okText="确定"
                    cancelText="取消"
                >
                    <span className={`iconfont icon-x ${styles.delete}`} title="删除" />
                </Popconfirm>}
                {hasPrem && <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item><span type="primary" key="tg" onClick={() => action.httpCheck([record])}>通过</span></Menu.Item>
                            {/* <Menu.Item><span key="th" onClick={() => action.httpReject([record])}>退回</span></Menu.Item> */}
                            <Menu.Item><span key="th" onClick={() => setState({ visible: true, selectedKey: [record] })}>退回</span></Menu.Item>
                        </Menu>
                    }
                    trigger={["click"]}
                >
                    <span className={`iconfont icon-gengduo ${styles.gengduo}`} title="更多" />
                </Dropdown>}
            </span>
        }
    }] : [{
        title: "操作",
        key: "action",
        width: 180,
        align: "center",
        render: (text, record) => (
            <span className={styles.action}>
                {record.checkOpinion && <Tooltip title={record.checkOpinion}>
                    <span className={`iconfont icon-pinglun ${styles.yanjing}`} title="退回理由"></span>
                </Tooltip>}
                {record.modelId != 5 ?
                    <a
                        href={record.url}
                        target="_blank"
                        className={`iconfont icon-yanjing ${styles.yanjing}`}
                        title="预览"
                    /> :
                    <span className={`iconfont icon-yanjing ${styles.disable}`} title="预览" />
                }
                {record.editAble ? <a
                    href={`#${match.url}/${record.id}`}
                    target="_blank"
                    className={`iconfont icon-bianji ${styles.bianji}`}
                    title="编辑"
                /> :
                    <span className={`iconfont icon-bianji ${styles.disable}`} title="编辑" />
                }
                <Popconfirm
                    title={query.queryStatus == "recycle" ? "确定彻底删除？" : "确定删除？"}
                    onConfirm={() => action.httpDelete([record], query.queryStatus == "recycle")}
                    okText="确定"
                    cancelText="取消"
                >
                    <span className={`iconfont icon-x ${styles.delete}`} title="删除" />
                </Popconfirm>
                <Dropdown
                    overlay={dropdownMenu(query.queryStatus, record, action, channel)}
                    trigger={["click"]}
                >
                    <span className={`iconfont icon-gengduo ${styles.gengduo}`} title="更多" />
                </Dropdown>
            </span>
        )
    }]
    if (query.queryStatus == "prepared") {
        queryStatusColumns = queryStatusColumns.concat([{
            title: "状态",
            dataIndex: "checkStep",
            key: "checkStepStatus",
            align: "center",
            render: (text, record) => {
                let checkNode = record.checkNodes[text - 1] || {}
                return <span className={styles.action}>
                    {checkNode.roleName}
                </span>
            }
        }])
    }
    let columns2 = queryStatusColumns.concat([
        {
            title: "点击",
            dataIndex: "views",
            key: "views",
            width: 60,
            align: "center"
            // sorter: (a, b) => a.views - b.views
        },
        {
            title: "发布人",
            dataIndex: "realname",
            key: "realname",
            align: "center",
            width: 110
        },
        {
            title: "发布时间",
            dataIndex: "releaseDate",
            key: "releaseDate",
            align: "center",
            width: 160
        }])
    columns = columns.concat(columns2)

    let selectedRowKeys = selectedRows.map(d => d.id);
    const rowSelection = {
        selectedRowKeys: Immutable.asMutable(selectedRowKeys),
        onSelect: (record, selected, selectedRows) => mergeState$.next({ selectedRows }),
        onSelectAll: (selected, selectedRows, changeRows) => mergeState$.next({ selectedRows })
    };
    return [<Table
        key='table'
        rowKey={`id`}
        columns={columns}
        dataSource={list}
        rowSelection={rowSelection}
        bordered
        size="middle"
        loading={loading}
        expandedRowRender={record => <RecordList data={record} />}
        onChange={({ current, pageSize }) => action.getListData({ pageNo: current, pageSize })}
        pagination={{
            pageSize: query.pageSize,
            total: totalCount,
            current: query.pageNo,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['5', '10', '20', '50'],
            showTotal: (total, range) => `当前第${range[0]}-${range[1]}条，共${total}条数据`
        }}
    />,
    <Modal
        key='modal'
        title="退回理由"
        visible={state.visible}
        onOk={handleOk}
        onCancel={() => setState({ visible: false })}
    >
        <TextArea
            placeholder="请输入退回理由"
            autosize={{ minRows: 2, maxRows: 6 }}
            value={state.checkOpinion}
            onChange={handleChangeCheckOpinion}
        />
    </Modal>]
}

export default TableList