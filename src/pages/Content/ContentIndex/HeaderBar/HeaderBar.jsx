
import React from "react";
import { Link } from "react-router-dom";
import { DatePicker, Icon, Menu, Button, Select, Input, Radio } from "antd";
const InputGroup = Input.Group;
const { SubMenu, Item } = Menu;
const { Option } = Select;
import Authorized from '@/components/Authorized'

import { stringify } from "qs";
// import queryStatus from "./queryStatus";
import queryStatus2 from "./queryStatus2";
import queryOrderBy from "./queryOrderBy";
import modelTypes from "./modelTypes";

import styles from "./HeaderBar.scss";
import ClearCache from './ClearCache';

import { fetchList$, setQuery$ } from '../../stream';


const HeaderBar = ({ query, match, siteUser, modelId, workflow = [] }) => {
    const locale = app.globalRedux.getContext()
    const { userInfo } = locale.context
    const handleChangeQuery = (name, value) => {
        setQuery$.next({ [name]: value })
    };
    const handleFormSubmit = e => {
        e.preventDefault();
        fetchList$.next({ pageNo: 1 });
    };
    return (
        <div className={styles.headerBar}>
            <Authorized auth={'content.add'}>
                <Menu mode="horizontal" className={styles.menu}>
                    <SubMenu
                        key={"article"}
                        title={<Button type="primary"><Icon type="plus" />新增内容</Button>}
                    >
                        {modelTypes.map(d => {
                            if (d.key == 7) {
                                return userInfo.gaFlag ? (
                                    <Item key={d.key}>
                                        {/* <Link
                                                title={d.title}
                                                to={{
                                                    pathname: match.url + "/add",
                                                    search: stringify({ modelId: d.key, cid: query.cid })
                                                }}
                                            >
                                                <i className={`iconfont ${d.icon}`} /> {d.title}
                                            </Link> */}
                                        <a
                                            href={`#${match.url}/add?${stringify({ modelId: d.key, cid: query.cid })}`}
                                            title={d.title}
                                            target="_blank"
                                        >
                                            <i className={`iconfont ${d.icon}`} /> {d.title}
                                        </a>
                                    </Item>
                                ) : null;
                            } else {
                                return (
                                    <Item key={d.key}>
                                        {/* <Link
                                                title={d.title}
                                                to={{
                                                    pathname: match.url + "/add",
                                                    search: stringify({ modelId: d.key, cid: query.cid })
                                                }}
                                            >
                                                <i className={`iconfont ${d.icon}`} /> {d.title}
                                            </Link> */}
                                        <a
                                            href={`#${match.url}/add?${stringify({ modelId: d.key, cid: query.cid })}`}
                                            title={d.title}
                                            target="_blank"
                                        >
                                            <i className={`iconfont ${d.icon}`} /> {d.title}
                                        </a>
                                    </Item>
                                );
                            }
                        })}
                    </SubMenu>
                </Menu>
            </Authorized>
            <Button.Group className={styles.btns}>
                <Button
                    type={query.queryTopLevel ? "primary" : "default"}
                    onClick={() => fetchList$.next({ queryTopLevel: !query.queryTopLevel, pageNo: 1 })}
                >
                    置顶
                </Button>
                <Button
                    type={query.queryRecommend ? "primary" : "default"}
                    onClick={() => fetchList$.next({ queryRecommend: !query.queryRecommend, pageNo: 1 })}
                >
                    推荐
                </Button>
            </Button.Group>
            <Radio.Group value={query.queryStatus}
                style={{ margin: "5px 5px 0 0", float: "left" }}
                onChange={e => fetchList$.next({ queryStatus: e.target.value, pageNo: 1 })} buttonStyle="solid">
                {query.cid == -1 && <Radio.Button value={'prepared'} key={'prepared'}>待审</Radio.Button>}
                {workflow.map((d, i) => <Radio.Button value={i} key={d.roleId}>{d.roleName}</Radio.Button>)}
                {queryStatus2.map(d => (
                    <Radio.Button value={d.value} key={d.value}>{d.title}</Radio.Button>
                ))}
            </Radio.Group>

            {/* 排序 */}
            <Select
                value={query.queryOrderBy}
                onChange={value => fetchList$.next({ queryOrderBy: value })}
                className={styles.select}
                style={{ width: "145px" }}
            >
                {queryOrderBy.map(d => (
                    <Option value={d.value} key={d.value}>
                        {d.title}
                    </Option>
                ))}
            </Select>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <InputGroup compact>
                    <Select
                        value={query.queryModelId}
                        onChange={value => fetchList$.next({ queryModelId: value, pageNo: 1 })}
                        style={{ width: 100 }}
                    >
                        {modelId.map((d, i) => (
                            <Option key={i} value={d.mid}>{d.mname}</Option>
                        ))}
                    </Select>
                    {/*搜索用户*/}
                    {query.cid != -1 &&
                        <Select
                            showSearch
                            style={{ width: 120 }}
                            placeholder="请选择发布人姓名"
                            optionFilterProp="children"
                            value={query.queryInputUsername}
                            onChange={value => fetchList$.next({ queryInputUsername: value, pageNo: 1 })}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="" key="0">选择发布人</Option>
                            {siteUser.map(obj => (
                                <Option value={obj.username} key={obj.id}>{obj.realname}</Option>
                            ))}
                        </Select>
                    }
                    <Input
                        className={styles.input}
                        placeholder={`请输入搜索标题`}
                        value={query.queryTitle}
                        onChange={e => handleChangeQuery("queryTitle", e.target.value)}
                    // onBlur={e => fetchList$.next({ queryTitle: e.target.value, pageNo: 1 })}
                    />
                    <Button type="primary" htmlType="submit">
                        <Icon type="search" />
                    </Button>
                </InputGroup>
            </form>
            <ClearCache />
            <div className="clear" />
        </div>
    );
}
export default HeaderBar