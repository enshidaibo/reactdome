import { useState, useEffect } from 'react'

import ContentLayout, { RightContent } from '@/pages/A_Layout/ContentLayout';

import { updateStaticIndex, deleteStaticIndex, updateStaticChannel, updateStaticContent } from "@/services/static";
import { getChannelTree } from "@/services/channel";
import FormItem from '@/components/Form/FormItem';
import { Button, TreeSelect, Radio, DatePicker, message } from 'antd';
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;
import styles from './styles.scss';

const StaticIndex = () => {
    const [channels, setChannels] = useState([])
    const [channelId, setChannel] = useState("0")
    const [containChild, setContainChild] = useState(true)

    const [content, setContent] = useState("0")
    const [startDate, setStartDate] = useState()
    const handleChangeData = (data, str) => {
        setStartDate(str)
    }
    useEffect(() => {
        const getData = async () => {
            let res = await getChannelTree()
            if (res.success) {
                setChannels(res.body)
            }
        }
        getData()
    }, [])

    const renderTreeNode = (list = []) => {
        return list.map(d => {
            return <TreeNode title={d.name} key={d.id} value={d.id}>
                {d.hasChild && renderTreeNode(d.child)}
            </TreeNode>
        })
    }

    const handleStaticIndex = async () => {
        let res = await updateStaticIndex()
        if (res.success) {
            message.success("生成成功！")
        }
    }
    const handleStaticIndexDelete = async () => {
        let res = await deleteStaticIndex()
        if (res.success) {
            message.success("删除成功！")
        }
    }
    const handleUpdateStaticChannel = async () => {
        let data = {
            containChild
        }
        if (channelId != 0) {
            data.channelId = channelId
        }
        let res = await updateStaticChannel(data)
        if (res.success) {
            message.success("生成成功！")
        }
    }
    const handleUpdateStaticContent = async () => {
        let data = {}
        if (startDate) {
            data.startDate = startDate
        }
        if (content != 0) {
            data.channelId = content
        }
        let res = await updateStaticContent(data)
        if (res.success) {
            message.success("生成成功！")
        }
    }
    return (
        <ContentLayout>
            <RightContent>
                <div className={styles.sction}>
                    <div className={styles.title}>首页静态化</div>
                    <FormItem>
                        <Button type="primary" onClick={handleStaticIndex}>生成首页html</Button>
                        <Button type="danger" style={{ marginLeft: "15px" }} onClick={handleStaticIndexDelete}>删除首页html</Button>
                    </FormItem>
                </div>
                <div className={styles.sction}>
                    <div className={styles.title}>栏目静态化</div>
                    <FormItem label="选择栏目">
                        <TreeSelect
                            showSearch
                            style={{ width: 300 }}
                            value={channelId}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择栏目"
                            treeDefaultExpandAll
                            onChange={value => setChannel(value)}
                        >
                            <TreeNode title="根目录" key={0} value={"0"}></TreeNode>
                            {renderTreeNode(channels)}
                        </TreeSelect>
                    </FormItem>
                    <FormItem label="更新子栏目">
                        <RadioGroup value={containChild} onChange={(e) => setContainChild(e.target.value)}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={handleUpdateStaticChannel}>生成栏目页html</Button>
                    </FormItem>
                </div>
                <div className={styles.sction}>
                    <div className={styles.title}>内容静态化</div>
                    <FormItem label="选择栏目">
                        <TreeSelect
                            showSearch
                            style={{ width: 300 }}
                            value={content}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择栏目"
                            treeDefaultExpandAll
                            onChange={value => setContent(value)}
                        >
                            <TreeNode title="根目录" key={0} value={"0"}></TreeNode>
                            {renderTreeNode(channels)}
                        </TreeSelect>
                    </FormItem>
                    <FormItem label="开始时间">
                        <DatePicker onChange={handleChangeData} />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={handleUpdateStaticContent}>生成内容页html</Button>
                    </FormItem>
                </div>
            </RightContent>
        </ContentLayout>
    )
}

export default StaticIndex