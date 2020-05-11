import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Table, Popconfirm, Button, message } from 'antd';
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import Authorized from '@/components/Authorized'
import useData from '@/hooks/useData'

import { getSubjectList, deleteSubject } from './services';
import actionStyles from '@/style/action.scss';

// import Slate from '@/globalComponents/SlateEditer'

function copyToClipBoard(text) {
    /**如果内容是界面的一个元素，可以直接读取元素getElementById()
       这里是因为界面没有input元素，所以自己创建一个元素来作为载体把内容复制到剪贴板
    **/
    let inputEle = document.createElement("input");//创建一个input元素
    //判断并控制整个HTML文档可编辑
    if (!(document.designMode == "on")) {
        document.designMode = "on";
    }
    inputEle.value = text;//把复制的内容赋给input的内容
    document.body.appendChild(inputEle);//把input元素绑定到document,不然操作不到
    // 判断元素是否能被选中
    if (inputEle && inputEle.select) {
        // 选择文本
        // inputEle.focus(); 
        inputEle.select(); //或： inputEle.setSelectionRange(0, inputEle.value.length);
        try {
            // 复制文本
            document.execCommand('copy');
        } catch (err) {
            alert('由于浏览器安全设置，不支持复制功能!!！');
        }
        inputEle.blur();//失去焦点
        inputEle.style.display = "none";//隐藏元素
        document.body.removeChild(inputEle);//删除元素
        document.designMode = "off";//文档设为不可编辑,否则界面的其他元素可能被影响
        message.success('复制链接成功！')
    }
}

const SubjectList = ({ history, match }) => {
    const [data, setData] = useData({ list: [], selectKeys: [], pageSize: 10, current: 1, total: 0 })
    let { list, selectKeys, pageSize, current, total } = data
    const getData = async () => {
        let res = await getSubjectList({ pageNo: current, pageSize })
        if (res.success) {
            setData({ list: res.body, selectKeys: [], total: res.totalCount })
        }
    }
    useEffect(() => { getData() }, [pageSize, current])
    const handleChangePage = ({ current }) => {
        setData({ current, selectKeys: [] })
    }
    const handleDelete = async subejctId => {
        let res = await deleteSubject({ subejctId })
        if (res.success) {
            getData()
        }
    }
    const handleDeleteBatch = () => {
        let ids = selectKeys.join(',')
        handleDelete(ids)
    }
    const rowSelection = {
        selectedRowKeys: selectKeys,
        onChange: (selectKeys, selectedRows) => {
            setData({ selectKeys })
        }
    };
    const columns = [{
        title: 'ID',
        dataIndex: 'subejctId',
        key: 'id',
    }, {
        title: '专题名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: "操作",
        key: "action",
        width: 180,
        align: "center",
        render: (text, record) => (
            <span className={actionStyles.action}>
                <a
                    href={record.link}
                    target="_blank"
                    className={`iconfont icon-yanjing ${actionStyles.yanjing}`}
                    title="预览"
                />
                <span
                    href={record.link}
                    onClick={() => copyToClipBoard(record.link)}
                    className={`iconfont icon-bianjiqichaolianjie ${actionStyles.yanjing}`}
                    title="复制链接地址"
                />
                <Link
                    className={`iconfont icon-bianji ${actionStyles.bianji}`}
                    title="编辑"
                    to={`${match.url}/${record.subejctId}`}
                />
                <Authorized auth={'subject.delete'}>
                    <Popconfirm
                        title={"确定删除？"}
                        onConfirm={() => handleDelete(record.subejctId)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span className={`iconfont icon-x ${actionStyles.delete}`} title="删除" />
                    </Popconfirm>
                </Authorized>
            </span>
        )
    }];
    return <RightContent>
        <div style={{ marginBottom: "15px" }}>
            {/* <Authorized auth={'subject.add'}> */}
            <Link
                className={'ant-btn ant-btn-primary'}
                to={`${match.url}/add`}
                style={{ marginRight: '10px' }}
            >新增专题</Link>
            {/* </Authorized> */}
            {/* <Authorized auth={'subject.delete'}>
                <Button
                    onClick={handleDeleteBatch}
                    disabled={selectKeys.length == 0}>批量删除</Button>
            </Authorized> */}
        </div>
        <Table style={{ margin: '15px 0' }}
            rowKey='subejctId'
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list}
            onChange={handleChangePage}
            pagination={{
                pageSize,
                current,
                total
            }}
        />
    </RightContent>
}

export default SubjectList