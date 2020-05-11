/*
*  菜单列表
* */
import React, { useState } from "react";
import { Icon, message, Popconfirm } from "antd";
import { deleteReportColumn } from '@/services/report';
import styles from "./MenuList.scss";
import Edit from "./Edit";

const MenuList2 = ({ callBack, menuData }) => {
    const [visibile, setVisibile] = useState(false)
    /*
  * 编辑
  * */
    const handleEdit = () => setVisibile(true)
    /*
    * 删除
    * */
    const handleDetele = async id => {
        let result = await deleteReportColumn({ id });
        if (result.success) {
            message.success("删除成功", 1);
            callBack();
        }
    };
    /*
    * 关闭
    * */
    const onClose = () => setVisibile(false)
    return (
        <div className={styles.header} onClick={e => {
            if (visibile) {
                e.stopPropagation()
                e.preventDefault()
            }
        }}>
            <span className={styles.name}>{menuData.columnName}</span>
            {menuData.columnName != "黑名单" &&
                menuData.columnName != "回收站" && (
                    <span className={styles.acts}>
                        <Icon
                            type="edit"
                            title={"编辑"}
                            className={styles.icon}
                            onClick={handleEdit}
                        />
                        <Popconfirm
                            title="您确定删除该栏目吗?"
                            okText="删除"
                            cancelText="取消"
                            okType="primary"
                            onCancel=""
                            onConfirm={() => handleDetele(menuData.id)}
                        >
                            <Icon
                                type="delete"
                                title={"删除"}
                                className={styles.icon}
                            />
                        </Popconfirm>
                        {visibile && (
                            <Edit
                                initValue={menuData}
                                callBackData={callBack}
                                visible={visibile}
                                onClose={onClose}
                            />
                        )}
                    </span>
                )}
        </div>
    );
}
export default MenuList2