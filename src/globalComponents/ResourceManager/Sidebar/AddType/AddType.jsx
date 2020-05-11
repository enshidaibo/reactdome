import { message, Modal, Input } from "antd";
import { httpFilesTypeSave } from "@/services/resource";
import useData from '@/hooks/useData'
import styles from "./AddType.scss";

const AddType = ({ global = false, type = 0, getFilesCat }) => {
    const [data, setData] = useData({ visible: false, name: "" })
    const { visible, name } = data
    const handleTypeSave = async () => {
        let res = await httpFilesTypeSave({ name, sortNum: 1, global, type });
        if (res.success) {
            message.success('新增分类成功！')
            setData({ visible: false });
            getFilesCat();
        }
    };
    return [
        <div className={styles.addbtn} key="addType" onClick={() => setData({ visible: true })}>
            新增分类
        </div>,
        <Modal
            key={"modal"}
            title="请输入分类名称"
            cancelText="取消"
            okText="确认"
            visible={visible}
            onOk={handleTypeSave}
            onCancel={() => setData({ visible: false })}
        >
            <Input onChange={e => setData({ name: e.target.value })} value={name} />
        </Modal>
    ];
}

export default AddType