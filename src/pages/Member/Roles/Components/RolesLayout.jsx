import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import ContentLayout, { LeftContent, RightContent } from '@/pages/A_Layout/ContentLayout';
import { Menu, Checkbox, Input, Button, message } from 'antd';
const Search = Input.Search;

import { getRoleListBySiteId, deleteRole } from "@/services/roles";
import Authorized from '@/components/Authorized'
import styles from './RolesLayout.scss';
import localRedux from '../localRedux'

const RolesLayout = ({ children, history, match }) => {
    const locale = localRedux.getContext()
    let { dispatch, context } = locale
    let { list, selectKeys, searchValue, version } = context
    useEffect(() => {
        const getData = async () => {
            let res = await getRoleListBySiteId()
            if (res.success) {
                dispatch.setIn(['list'], res.body)
            }
        }
        getData()
    }, [version])
    const handleClick = (e) => {
        history.replace(`/member/roles/${e.key}`)
    }
    const handleClickBox = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let value = parseInt(e.target.value)
        if (selectKeys.includes(value)) {
            selectKeys = selectKeys.filter(d => {
                return d != value
            })
        } else {
            selectKeys = selectKeys.concat([value])
        }
        dispatch.setIn(['selectKeys'], selectKeys)
    }
    const handleDelete = async () => {
        let res = await deleteRole({ ids: selectKeys.join(',') })
        if (res.success) {
            message.success('删除成功！')
            history.replace('/member/roles')
            dispatch.set({ version: Date.now(), selectKeys: [] })
        }
    }
    const handleSearchChange = (e) => {
        dispatch.set({ selectKeys: [], searchValue: e.target.value.trim() })
    }
    if (searchValue) {
        list = list.filter(d => {
            return d.name.indexOf(searchValue) > -1
        })
    }
    return (
        <ContentLayout>
            <LeftContent>
                <div className={styles.header}>
                    <div className={styles.action}>
                        <Authorized auth={'member.roles.add'}>
                            <Button type="primary" className={styles.btn}>
                                <Link to={`/member/roles/add`}>新增</Link>
                            </Button>
                        </Authorized>
                        <Authorized auth={'member.roles.delete'}>
                            <Button className={styles.btn} onClick={handleDelete} disabled={selectKeys.length == 0}>删除</Button>
                        </Authorized>
                    </div>
                    <Search
                        placeholder="搜索"
                        onChange={handleSearchChange}
                        className={styles.search}
                    />
                </div>
                <Menu mode="inline" defaultSelectedKeys={[match.params.id || 0]} onClick={handleClick} style={{ borderRight: 'none' }}>
                    {list.map(d => {
                        return <Menu.Item key={d.id}>
                            <Checkbox onClick={handleClickBox} checked={selectKeys.includes(d.id)} value={d.id}></Checkbox>
                            <span className={styles.name}>{d.name}</span>
                        </Menu.Item>
                    })}
                </Menu>
            </LeftContent>
            <RightContent style={{ padding: '0 15px' }}>
                {children}
            </RightContent>
        </ContentLayout>
    )
}

export default RolesLayout