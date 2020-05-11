import React, { useEffect } from "react";
import { Select, Spin, Pagination, Input, Icon } from "antd";
const Option = Select.Option;
const Search = Input.Search;
import { getPushSiteList, getPushChannelAll, getPushModeList, getPushContentList } from "../services";
import useData from '@/hooks/useData';
import styles from "./Content.scss";

const Content = ({ onOk }) => {
    const [state, setState] = useData({
        loading: true,
        sites: [],
        channels: [],
        modes: [],
        list: [],
        totalCount: 0,
        pageSize: 10,
        pageNo: 1,
        siteId: localStorage._site_id_param,
        channelId: undefined,
        modeId: undefined,
        title: "",
        version: 0,
    })
    let { loading, sites, channels, modes, list, totalCount, pageSize, pageNo, siteId, channelId, modeId, title, version } = state
    const getSites = async () => {
        let res = await getPushSiteList();
        if (res.success) {
            let siteId = res.body[0].id;
            setState({ sites: res.body, siteId })
        }
    };
    const getModes = async () => {
        let res = await getPushModeList();
        if (res.success) {
            setState({ modes: res.body })
        }
    };
    useEffect(() => {
        getSites()
        getModes()
    }, [])
    useEffect(() => {
        const getChannels = async () => {
            if (siteId == 0) {
                return
            }
            let res = await getPushChannelAll({ siteId });
            if (res.success) {
                setState({ channels: res.body })
            }
        };
        getChannels()
    }, [siteId])

    useEffect(() => {
        const getData = async () => {
            if (siteId == 0) {
                return
            }
            setState({ loading: true })
            let res = await getPushContentList({ pageSize, pageNo, siteId, channelId, modeId, title });
            if (res.success) {
                setState({ loading: false, list: res.body, totalCount: res.totalCount })
            } else {
                setState({ loading: false })
            }
        };
        getData()
    }, [pageSize, pageNo, siteId, channelId, modeId, version])
    const handleChangeSite = siteId => setState({ siteId, channelId: undefined })
    const handleChangeChannel = channelId => setState({ channelId })
    const handleChangeMode = modeId => setState({ modeId })
    const handleChangeSearch = e => setState({ title: e.target.value })
    const handleSubmitSearch = () => setState({ version: Date.now() })
    const handleChangePage = pageNo => setState({ pageNo })
    return (
        <div>
            <div className={styles.filter}>
                <Select
                    placeholder="站点"
                    value={siteId}
                    className={styles.ect}
                    onChange={handleChangeSite}
                >
                    {sites.map(d => (
                        <Option value={d.id} key={d.id}>{d.name}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="栏目"
                    value={channelId}
                    className={styles.ect}
                    onChange={handleChangeChannel}
                >
                    {channels.map(d => (
                        <Option value={d.id} key={d.id}>{d.name}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="模型"
                    value={modeId}
                    className={styles.ect}
                    onChange={handleChangeMode}
                >
                    {modes.map(d => (
                        <Option value={d.id} key={d.id}>{d.name}</Option>
                    ))}
                </Select>
                <Search
                    value={title}
                    placeholder="搜索标题"
                    prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
                    onChange={handleChangeSearch}
                    onSearch={handleSubmitSearch}
                    enterButton
                    style={{ width: "200px" }}
                />
            </div>
            <Spin spinning={loading}>
                <div className={styles.list}>
                    {list.map(d => {
                        return (
                            <div className={styles.row} key={d.id} onClick={() => onOk(d)}>
                                <span>{d.title}</span>
                                <div className={styles.select}>选取</div>
                            </div>
                        );
                    })}
                </div>
                <Pagination
                    size="small"
                    pageSize={pageSize}
                    total={totalCount}
                    current={pageNo}
                    onChange={handleChangePage}
                    showTotal={(total, range) => `当前第${range[0]}-${range[1]}条，共${total}条数据`}
                />
            </Spin>
        </div>
    );
}
export default Content