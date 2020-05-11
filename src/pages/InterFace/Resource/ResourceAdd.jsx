import { useState } from "react";
import { Button, Input, message } from 'antd';
import { addResourceDetail } from "@/services/infaceresource";
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import styles from './TemplateEdit.scss';
import useEditor from './hooks/useEditor'

const TemplateEdit = ({ locale }) => {
    const { selectInfo } = locale.context
    const [filename, setFileName] = useState('')
    const [loading, setLoading] = useState(false)
    const [editEl, editor] = useEditor()
    const handleSave = async () => {
        if (filename == '') {
            message.error('文件名不能为空')
            return
        }
        let source = editor.getValue()
        if (source.length == 0) {
            message.error('文件内容不能为空')
            return
        }
        setLoading(true)
        let root = selectInfo.isDirectory ? selectInfo.path : selectInfo.parent
        let res = await addResourceDetail({
            filename: filename,
            source: source,
            root
        })
        if (res.success) {
            message.success('新增成功！')
            locale.dispatch.set({ version: Date.now(), action: 'edit' })
        }
        setLoading(false)
    }
    return (
        <RightContent className={styles.content}>
            <div className={styles.header}>
                <Input value={filename} onChange={e => setFileName(e.target.value)} />
                <Button type='primary' loading={loading} className={styles.btn} onClick={handleSave}>保存</Button>
            </div>
            <div className={styles.editor}>
                <textarea rows="5" ref={editEl} style={{ height: '100%' }}></textarea>
            </div>
        </RightContent>
    )
}

export default TemplateEdit