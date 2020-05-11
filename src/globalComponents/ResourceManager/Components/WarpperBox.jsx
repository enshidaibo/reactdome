import React from "react";
import { Button, Pagination, message } from "antd";
import { useEffect } from "react";
import { httpFilesDelete, getFilesList, getFilesMyList } from "@/services/resource";
import useData from '@/hooks/useData'
import Sidebar from "../Sidebar/Sidebar";
import Search from "../Search/Search";
import styles from "./WarpperBox.scss";
import localRedux from '../localRedux'

const WarpperBox = ({
    type = 0,  //图片
    resourceType = 'image',
    multiple = false,
    UploadFilesBox,
    DetailBox,
    uploadConfig,
    onOk }) => {
    const isSelect = !!onOk
    const [data, setData] = useData({
        filesList: [],
        select: [],
        pageNo: 1,
        pageSize: 36,
        totalCount: 0,
        typeId: null,
        tag: "",
        version: 0,
        loading: null
    })
    const { filesList, select, pageNo, pageSize, totalCount, typeId, tag, version } = data
    useEffect(() => {
        const getData = async () => {
            const getFilesData = (typeId == -1 || uploadConfig == 'me') ? getFilesMyList : getFilesList
            let res = await getFilesData({ pageNo, pageSize, typeId, type, tag })
            if (res.success) {
                setData({
                    totalCount: res.totalCount,
                    filesList: res.body,
                    totalPage: res.totalPage,
                    select: []
                })
            }
        }
        getData()
    }, [pageNo, pageSize, typeId, version])
    /**
    * 单选
    */
    const handleSelectSingle = d => {
        let selectRow = select.includes(d) ? [] : [d]
        setData({ select: selectRow })
    };
    /**
     * 多选
     */
    const handleSelectMultiple = d => {
        let selectRow = []
        if (select.includes(d)) {
            selectRow = select.filter(data => {
                return data != d;
            });
        } else {
            selectRow = select.concat(d);
        }
        setData({ select: selectRow })
    };
    /**
    * 选中图片
    */
    const handleSelect = d => {
        if (multiple) {
            handleSelectMultiple(d);
        } else {
            handleSelectSingle(d);
        }
    };

    /**
    * 选中图片确定
    */
    const handleOk = () => {
        onOk && onOk(select);
    };

    const handleDirectInsertion = data => {
        let value = data.map(d => {
            return {
                thumb: d.thumb,
                path: d.uploadPath,
                name: d.fileName
            }
        })
        onOk && onOk(value);
    }
    /**
     * 删除
     */
    const handleDelete = async () => {
        setData({ loading: 'delete' })
        let filePaths = select.map(d => {
            return d.path;
        });
        let res = await httpFilesDelete({ filePaths: filePaths.join(",") });
        setData({ loading: null })
        if (res.success) {
            message.success(res.message);
            setData({ version: Date.now() })
        }
    };
    return (
        <div className={styles.images}>
            <Sidebar type={type} typeId={typeId} getData={setData} uploadConfig={uploadConfig} />
            <div className={styles.content}>
                <div className={styles.operate}>
                    <Search value={tag} onChange={e => setData({ tag: e.target.value })} getData={setData} />
                    <div className={styles.action}>
                        {isSelect && (
                            <Button
                                onClick={handleOk}
                                className={styles.btn}
                                size="large"
                                type="primary"
                                disabled={select.length == 0}
                            >
                                确定
                            </Button>
                        )}
                        <Button
                            type="primary"
                            loading={data.loading == 'delete'}
                            className={styles.btn}
                            onClick={handleDelete}
                            disabled={select.length == 0}
                        >
                            批量删除
                        </Button>
                        <UploadFilesBox
                            type={resourceType}
                            onOk={() => setData({ pageNo: 1, version: Date.now() })}
                            handleDirectInsertion={handleDirectInsertion}
                            isDirect={multiple && onOk}
                            typeId={typeId}
                        >
                            <Button type="primary" className={styles.btn}>
                                本地上传
                            </Button>
                        </UploadFilesBox>
                    </div>
                </div>
                <div className={styles.list}>
                    {filesList.map(d => {
                        return (
                            <DetailBox
                                data={d}
                                onClick={handleSelect}
                                getData={() => setData({ version: Date.now() })}
                                key={d.path}
                                selected={select.includes(d)}
                            />
                        );
                    })}
                    <div className="clear" />
                    {totalCount != 0 && (
                        <div className={styles.Pagination}>
                            <Pagination
                                current={pageNo}
                                total={totalCount}
                                pageSize={pageSize}
                                onChange={pageNo => setData({ pageNo })}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const initValue = {
    fileTypes: []
}
const Warp = (props) => {
    return (
        <localRedux.localRudexProvider value={initValue}>
            <WarpperBox {...props} />
        </localRedux.localRudexProvider>
    )
}

export default Warp