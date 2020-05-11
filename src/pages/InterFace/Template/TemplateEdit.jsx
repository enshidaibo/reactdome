import { useState, useEffect } from "react";
import { Button, Input, message } from 'antd';
import Authorized from '@/components/Authorized'
import { getTemplateDetail, updateTemplateDetail } from "@/services/template";
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import styles from './TemplateEdit.scss';
import useEditor from './hooks/useEditor'

const TemplateEdit = ({ locale }) => {
    const { eventKey } = locale.context.selectInfo
    const [loading, setLoading] = useState(false)
    const [editEl, editor] = useEditor()
    const isEdit = editor == undefined
    useEffect(() => {
        if (isEdit) {
            return
        }
        const getData = async () => {
            let res = await getTemplateDetail({ name: eventKey })
            if (res.success) {
                editor.setValue(res.body)
            }
        }
        getData()
    }, [eventKey, isEdit])
    const handleSave = async () => {
        setLoading(true)
        let res = await updateTemplateDetail({
            filename: eventKey,
            source: editor.getValue()
        })
        setLoading(false)
        if (res.success) {
            message.success('保存成功！')
        }
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