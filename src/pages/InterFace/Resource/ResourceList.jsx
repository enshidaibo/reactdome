import { useState, useEffect, useContext, useRef } from "react";
import { Table, Button, Input, message, Popconfirm, Modal, Icon } from 'antd';
import Authorized from '@/components/Authorized'
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import { getResourceList, uploadResource, addResourceDir, updateResourceReName, deleteResource } from "@/services/infaceresource";
import useData from '@/hooks/useData'
import localRedux from './localRedux'
import ResourceEdit from './ResourceEdit'
import ResourceAdd from './ResourceAdd'
import actionStyles from '@/style/action.scss';
import styles from './styles.scss';

const exts = ['css', 'js', 'html']
const ResourceList = ({ locale }) => {
    const { selectInfo, version, flattenTrees, addDirLoading } = locale.context
    let root = selectInfo.isEditable ? selectInfo.parent : selectInfo.path
    const { eventKey } = selectInfo
    const addDir = useRef(null);
    const [selectKeys, setSelectKeys] = useState([])
    const [list, setList] = useState([])
    useEffect(() => {
        const getData = async () => {
            setSelectKeys([])
            if (eventKey == 0) {
                return
            }
            let res = await getResourceList({ root: eventKey })
            if (res.success) {
                setList(res.body)
            }
        }
        getData()
    }, [eventKey, version])
    const rowSelection = {
        selectedRowKeys: selectKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectKeys(selectedRowKeys)
        }
    };
    const deleteTemplates = async (names) => {
        let res = await deleteResource({ names })
        if (res.success) {
            message.success('删除成功！')
            setSelectKeys([])
            locale.dispatch.set({ version: Date.now() })
        }
    }
    const deleteTemplatespatch = () => {
        const names = selectKeys.join(',')
        deleteTemplates(names)
    }
    const handleClick = record => {
        const selectRow = flattenTrees.find(d => d.path == record.name)
        locale.dispatch.set({ selectInfo: { eventKey: record.name, ...selectRow }, action: 'edit' })
    }
    const uploadFiles = async (root, files, length, i) => {
        if (length == i) {
            locale.dispatch.set({ version: Date.now() })
            return
        }
        await uploadResource({ root, uploadFile: files[i] })
        i += 1
        uploadFiles(root, files, length, i)
    }
    const handleUploads = e => {
        let files = e.target.files
        let length = files.length
        uploadFiles(root, files, length, 0)
    }
    const handleAddDir = async () => {
        if (addDirLoading) {
            return
        }
        let dirName = addDir.current.input.value
        if (!dirName) {
            message.error('文件夹名称不能为空')
            return
        }
        locale.dispatch.set({ addDirLoading: true })
        let res = await addResourceDir({ dirName, root })
        if (res.success) {
            message.success('新增文件夹成功！')
            locale.dispatch.set({ version: Date.now(), addDirLoading: false })
        } else {
            locale.dispatch.set({ addDirLoading: false })
        }
    }
    const [data, setData] = useData({
        visible: false,
        item: {}
    })
    const handleOk = async () => {
        let res = await updateResourceReName({
            root: data.item.path,
            origName: data.item.name,
            distName: data.item.distName,
        })
        if (res.success) {
            setData({ visible: false, item: {} })
            locale.dispatch.set({ version: Date.now() })
        }
    }
    const columns = [{
        title: '文件名',
        dataIndex: 'filename',
        render: (text, record) => {
            let icon = "icon-wendangx"
            if (record.isDirectory) {
                icon = "icon-wenjianjia"
            } else if (record.ext == 'css') {
                icon = "icon-css"
            } else if (record.ext == 'js') {
                icon = "icon-js"
            } else if (record.ext == 'png') {
                icon = "icon-iconset0390"
            }
            return <div>
                <span style={{ fontSize: '20px', position: 'relative', top: '2px', margin: "2px 4px 0 0" }} className={'iconfont ' + icon}></span>
                {exts.includes(record.ext) || record.isDirectory ? <span onClick={() => handleClick(record)}>{text}</span> : <span>{text}</span>}
            </div>
        }
    }, {
        title: '大小',
        dataIndex: 'size',
        render: (text) => `${text}KB`
    }, {
        title: '最后修改时间',
        dataIndex: 'lastModifiedDate',
    }, {
        title: '操作',
        dataIndex: 'address',
        align: 'center',
        render: (text, record) => (
            <span className={actionStyles.action}>
                <Authorized auth={'interface.template.rename'}>
                    <span className={`iconfont icon-bianji ${actionStyles.bianji}`} onClick={() => setData({ visible: true, item: { ...record, distName: record.name } })}>
                        重命名
                </span>
                </Authorized>
                <Authorized auth={'interface.template.delete'}>
                    <Popconfirm
                        title={'删除'}
                        onConfirm={() => deleteTemplates(record.name)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span className={`iconfont icon-x ${actionStyles.delete}`} title="删除" />
                    </Popconfirm>
                </Authorized>

            </span>
        ),
    }];
    return (
        <RightContent>
            <div className={styles.header}>
                <div className={styles.curDir}>当前目录：{root}</div>
                <Authorized auth={'interface.template.add'}>
                    <Button type='primary' className={styles.btn} onClick={() => locale.dispatch.set({ action: 'add' })}>新建文件</Button>
                </Authorized>
                <Authorized auth={'interface.template.uploads'}>
                    <Button type='primary' className={styles.btn}>
                        <span>上传文件</span>
                        <input type='file' onChange={handleUploads} multiple className={styles.uploadbtn}></input>
                    </Button>
                </Authorized>
                <Authorized auth={'interface.template.createdir'}>
                    <div className={styles.addbtns}>
                        <Input ref={addDir} addonAfter={<span className={styles.addbtn} onClick={handleAddDir}>{addDirLoading && <Icon type="loading" />}新增文件夹</span>} />
                    </div>
                </Authorized>
                <Authorized auth={'interface.template.delete'}>
                    <Button onClick={deleteTemplatespatch}>批量删除</Button>
                </Authorized>
            </div>
            <Table bordered
                rowKey='name'
                pagination={false}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={list}
                size='small'
            />
            <Modal
                title="重命名"
                visible={data.visible}
                onOk={handleOk}
                onCancel={() => setData({ visible: false, item: {} })}
            >
                <Input value={data.item.distName} onChange={e => setData({ item: { ...data.item, distName: e.target.value } })} />
            </Modal>
        </RightContent>
    )
}

const ResourceLayout = () => {
    const locale = useContext(localRedux.context);
    return (
        locale.context.action == 'add' ?
            <ResourceAdd locale={locale} /> :
            !locale.context.selectInfo.isEditable ?
                <ResourceList locale={locale} /> :
                <ResourceEdit locale={locale} />
    )
}

export default ResourceLayout