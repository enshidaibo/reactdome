import { useState, useEffect } from "react";
import { Button, Input, message } from 'antd';
import Authorized from '@/components/Authorized'
import { getResourceDetail, updateResourceDetail } from "@/services/infaceresource";
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import LoadSpin from '@/pages/A_Layout/LoadSpin';
import styles from './TemplateEdit.scss';
import useEditor from './hooks/useEditor'

const TemplateEdit = ({ locale }) => {
    const { eventKey } = locale.context.selectInfo
    const [loading, setLoading] = useState(false)
    const [editEl, editor] = useEditor()
    const isEdit = editor == undefined
    useEffect(() => {
        const getData = async () => {
            if (isEdit) {
                return
            }
            setLoading(true)
            let res = await getResourceDetail({ name: eventKey })
            if (res.success) {
                editor.setValue(res.body)
            }
            setLoading(false)
        }
        getData()
    }, [eventKey, isEdit])
    const handleSave = async () => {
        let source = editor.getValue()
        if (source.length == 0) {
            message.error('文件内容不能为空')
            return
        }
        setLoading(true)
        let res = await updateResourceDetail({
            filename: eventKey,
            source
        })
        if (res.success) {
            message.success('保存成功！')
        }
        setLoading(false)
    }
    return (
        <RightContent className={styles.content}>
            <div className={styles.header}>
                <Input value={eventKey} disabled onChange={() => { }} />
                <Authorized auth={'interface.template.update'}>
                    <Button type='primary' loading={loading} className={styles.btn} onClick={handleSave}>保存</Button>
                </Authorized>
            </div>
            <div className={styles.editor}>
                <textarea rows="5" ref={editEl} style={{ height: '100%' }}></textarea>
            </div>
        </RightContent>
    )
}

export default TemplateEdit