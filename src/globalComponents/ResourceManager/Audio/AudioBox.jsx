import React, { Component } from "react";
import { Box, Mask, Title, EditBtn } from "../Components/FilesBox";
import EditBox from "../Components/EditBox";
import audioImg from "./audio.jpg";
import styles from "./AudioBox.scss";
export default class AudioBox extends Component {
    state = {
        show: false
    };
    handleClick = () => {
        let { onClick, data } = this.props;
        onClick && onClick(data);
    };
    handleEditInfo = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            show: true
        });
    };
    handleHide = e => {
        // e.stopPropagation();
        // e.preventDefault();
        this.setState({
            show: false
        });
    };
    render() {
        let { selected, data, getData } = this.props;
        let { show } = this.state;
        return [
            <Box key="box" selected={selected} onClick={this.handleClick}>
                <img src={audioImg} className={styles.audioImg} />
                <Title>{data.name}</Title>
                <Mask />
                <EditBtn onClick={this.handleEditInfo}>编辑</EditBtn>
            </Box>,
            show && (
                <EditBox key="editbox" data={data} onHide={this.handleHide} getData={getData}>
                    <audio className={styles.img} controls src={data.path} />
                </EditBox>
            )
        ];
    }
}
