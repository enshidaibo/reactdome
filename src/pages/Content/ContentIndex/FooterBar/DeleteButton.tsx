import * as React from 'react';
import { Button, Modal } from "antd";
import * as styles from './FooterBar.scss';

interface Props {
    selectedRows: [];
    query: {};
    action: {};
}

const DeleteButton: any = ({ selectedRows, query, action }: Props) => {
    const [visible, setVisible] = React.useState(false)
    const handleDelete = async () => {
        setVisible(false)
        action['httpDelete'](selectedRows, query['queryStatus'] == "recycle");
    };
    return [
        <Button type="danger" key="button" className={styles['btn']} disabled={selectedRows.length == 0} onClick={() => setVisible(true)}
        >
            {query['queryStatus'] == "recycle" ? "彻底删除" : "删除"}
        </Button>,
        <Modal
            key="modal"
            title="删除"
            cancelText="取消"
            okText="确认"
            visible={visible}
            onOk={handleDelete}
            onCancel={() => setVisible(false)}
        >
            <p>是否确认删除</p>
        </Modal>
    ]
}

export default DeleteButton