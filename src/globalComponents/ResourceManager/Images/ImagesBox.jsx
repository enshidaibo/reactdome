import React, { useState } from "react";
import { Box, Mask, Title, EditBtn } from "../Components/FilesBox";
import EditBox from "../Components/EditBox";

import styles from "./ImagesBox.scss";
import Mt from '@/globalComponents/Mtxx'

const FilesBox = ({ onClick, data, selected, getData }) => {
    const [visible, setVisible] = useState(false)
    const handleClick = () => {
        onClick && onClick(data);
    };
    const handleEditInfo = e => {
        e.stopPropagation();
        e.preventDefault();
        setVisible(true)
    };
    const handleHide = e => {
        setVisible(false)
    };
    return [
        <Box key="box" selected={selected} onClick={handleClick}>
            <img src={data.path} className={styles.img} />
            <Title>{data.name}</Title>
            <Mask />
            <Mt url={data.path}>
                <EditBtn>编辑</EditBtn>
            </Mt>
        </Box>,
        visible && (
            <EditBox key="editbox" data={data} onHide={handleHide} getData={getData}>
                <img className={styles.detail} src={data.path} />
            </EditBox>
        )
    ];
}

export default FilesBox