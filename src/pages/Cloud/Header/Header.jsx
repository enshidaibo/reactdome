import React, { Component, useEffect } from "react";
import { Input, Button, Select, DatePicker, message } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;
import moment from "moment";
// import "moment/locale/zh-cn";
import styles from "./Header.scss";
import { getSiteList, getColumnList, getModelList, getShareList } from "@/services/cloud";
import useData from "@/hooks/useData";


const Header2 = ({ search, menuId, onSearch }) => {
    const [state, setState] = useData({
        data: search,
        siteList: [], //站点列表
        columnList: [], //栏目列表
        modelList: [], //模型列表
        shareList: [], //共享列表
    })

    let { siteList, columnList, modelList, shareList, data } = state;

    //  获取所有栏目列表
    const getColumnLists = async (site_id) => {
        let result = await getColumnList({ site_id });
        if (result.code == "200") {
            setState({ columnList: result.body });
        }
    };
    // 共享列表
    const getShareLists = async (siteId) => {
        let result = await getShareList({ siteId: siteId });
        if (result.code == "200") {
            setState({ shareList: result.body });
        }
    };
    useEffect(() => {
        // 获取站点列表
        const getSiteLists = async () => {
            let result = await getSiteList();
            if (result.code == "200") {
                setState({ siteList: result.body });
            }
        };
        // 模型列表
        const getModelLists = async () => {
            let result = await getModelList();
            if (result.code == "200") {
                setState({ modelList: result.body });
            }
        };
        getSiteLists()
        getModelLists()
    }, [])
    // 下拉框选择事件
    const handleSelectChange = (name, value) => {
        data[name] = value;
        if (menuId == "share") {
            if (name == "site_id") {
                data["share_id"] = "";
                getShareLists(value);

            } else {
                onSearch && onSearch(data);
            }
        } else {
            if (name == "site_id") {
                data["channel_id"] = "";
                getColumnLists(value)
            }
            onSearch && onSearch(data);
        }
        setState({ data: data });
    }
    /*
  * 标题change事件
  * */
    const handleTitleChange = (e) => {
        data["title"] = e.target.value;
        setState({ data: data });
        onSearch && onSearch(data);
    };
    /*
    * 时间change事件
    * */
    const handleTimeChange = (date, dateString) => {
        data["start_time"] = date.length <= 0 ? "" : dateString[0].toString() + " 00:00:00";
        data["end_time"] = date.length <= 0 ? "" : dateString[1].toString() + " 23:59:59";
        onSearch && onSearch(data);
        setState({ data: data });
    };

    return (
        <div className={styles.header}>
            <div className={styles.site}>
                站点:
           <Select
                    className={styles.ipnut}
                    allowClear={true}
                    value={data.site_id}
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={value => { handleSelectChange("site_id", value) }}  >
                    {siteList.length <= 0 ? "" :
                        siteList.map(site => {
                            return <Option key={site.id} value={site.id}>{site.name}</Option>
                        })
                    }
                </Select>
            </div>
            {menuId == "share" ?
                <div className={styles.Column}>
                    列表:
                   <Select className={styles.ipnut}
                        allowClear={true}
                        value={data.share_id}
                        showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        onChange={value => { handleSelectChange("share_id", value) }}
                    >
                        {shareList.length <= 0 ? "" :
                            shareList.map(share => {
                                return <Option key={share.id} value={share.id}>{share.name}</Option>
                            })
                        }
                    </Select>
                </div>
                :
                <div>
                    {/*  栏目  */}
                    <div className={styles.Column}>
                        栏目:
                       <Select className={styles.ipnut}
                            allowClear={true}
                            value={data.channel_id}
                            onChange={value => { handleSelectChange("channel_id", value) }}
                        >
                            {columnList.length <= 0 ? "" :
                                columnList.map(column => {
                                    return <Option key={column.id} value={column.id}>{column.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    {/*模型*/}
                    <div className={styles.modal}>
                        模型:
                       <Select className={styles.ipnut}
                            allowClear={true}
                            value={data.model_id}
                            onChange={value => { handleSelectChange("model_id", value) }}
                        >
                            {modelList.length <= 0 ? "" :
                                modelList.map(model => {
                                    return <Option key={model.id} value={model.id}>{model.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    {/*标题*/}
                    <div className={styles.title}>
                        标题:
                       <Input className={styles.ipnut} onChange={handleTitleChange} placeholder="输入标题" />
                    </div>
                    {/*时间*/}
                    <div className={styles.time}>
                        时间:
                       <RangePicker
                            className={styles.ipnut}
                            placeholder={["开始时间", "结束时间"]}
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default Header2

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.search,
            siteList: [], //站点列表
            columnList: [], //栏目列表
            modelList: [], //模型列表
            shareList: [], //共享列表
        };
    }
    componentDidMount() {
        this.handleSiteList();
        this.handleModelList();
    }

    /* 事件*/

    /*
    * 下拉框选择事件
    * */
    handleSelectChange = (name, value) => {
        let { data } = this.state;
        let { menuId, onSearch } = this.props;
        data[name] = value;
        if (name == "site_id" && menuId != "share") {
            data["channel_id"] = "";
            this.handleColumnList(value);
        }
        this.handleShareList(value);
        this.setState({ data: data });

        if (menuId == "share" && (data.share_id == undefined || data.share_id == "")) {
            return;
        }
        onSearch && onSearch(data);
    }
    /*
    * 标题change事件
    * */
    handleTitleChange = (e) => {
        let { data } = this.state;
        data["title"] = e.target.value;
        this.setState({ data: data });
        let { onSearch } = this.props;
        onSearch && onSearch(data);
    };
    /*
    * 时间change事件
    * */
    handleTimeChange = (date, dateString) => {
        let { data } = this.state;
        data["start_time"] = date.length <= 0 ? "" : dateString[0].toString() + " 00:00:00";
        data["end_time"] = date.length <= 0 ? "" : dateString[1].toString() + " 23:59:59";
        this.setState({ data: data });

        let { onSearch } = this.props;
        onSearch && onSearch(data);
    };
    /*
    * 所有站点列表
    * */
    handleSiteList = async () => {
        let result = await getSiteList();
        if (result.code == "200") {
            this.setState({ siteList: result.body });
        }
    };
    /*
    * 获取所有栏目列表
    * */
    handleColumnList = async (siteId) => {
        let result = await getColumnList({ site_id: siteId });
        if (result.code == "200") {
            this.setState({ columnList: result.body });
        }
    };

    /*
    * 模型列表
    * */
    handleModelList = async () => {
        let result = await getModelList();
        if (result.code == "200") {
            this.setState({ modelList: result.body });
        }
    };

    /*
    * 共享列表
    * */
    handleShareList = async (siteId) => {
        console.log(siteId)
        let result = await getShareList({ siteId: siteId });
        if (result.code == "200") {
            this.setState({ shareList: result.body });
        }
    };


    render() {
        let { menuId } = this.props;
        let { siteList, columnList, modelList, shareList } = this.state;
        return (
            <div className={styles.header}>
                {/*  站点  */}
                <div className={styles.site}>
                    站点:
               <Select className={styles.ipnut}
                        allowClear={true}
                        onChange={value => { this.handleSelectChange("site_id", value) }}
                    >
                        {siteList.length <= 0 ? "" :
                            siteList.map(site => {
                                return <Option value={site.id}>{site.name}</Option>
                            })
                        }
                    </Select>
                </div>
                {menuId == "share" ?
                    <div className={styles.Column}>
                        列表:
                       <Select className={styles.ipnut}
                            allowClear={true}
                            onChange={value => { this.handleSelectChange("share_id", value) }}
                        >
                            {shareList.length <= 0 ? "" :
                                shareList.map(share => {
                                    return <Option value={share.id}>{share.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    :
                    <div>
                        {/*  栏目  */}
                        <div className={styles.Column}>
                            栏目:
                           <Select className={styles.ipnut}
                                allowClear={true}
                                onChange={value => { this.handleSelectChange("channel_id", value) }}
                            >
                                {columnList.length <= 0 ? "" :
                                    columnList.map(column => {
                                        return <Option value={column.id}>{column.name}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        {/*模型*/}
                        <div className={styles.modal}>
                            模型:
                           <Select className={styles.ipnut}
                                allowClear={true}
                                onChange={value => { this.handleSelectChange("model_id", value) }}
                            >
                                {modelList.length <= 0 ? "" :
                                    modelList.map(model => {
                                        return <Option value={model.id}>{model.name}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        {/*标题*/}
                        <div className={styles.title}>
                            标题:
                           <Input className={styles.ipnut} onChange={this.handleTitleChange} placeholder="输入标题" />
                        </div>
                        {/*时间*/}
                        <div className={styles.time}>
                            时间:
                           <RangePicker
                                className={styles.ipnut}
                                placeholder={["开始时间", "结束时间"]}
                                onChange={this.handleTimeChange}
                            />
                        </div>
                    </div>
                }
            </div>
        )
    }
}