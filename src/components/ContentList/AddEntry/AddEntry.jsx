import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Button } from "antd";
import ContentIndex from "./ContentIndex"; 
import styles from "./AddEntry.scss";
export default class AddEntry extends Component {
    state = {
        visible: false
    };
    handleShow = e => {
        this.setState({ visible: true });
    };
    handleHide = () => {
        this.setState({ visible: false });
    };
    handleOk = async data => {
        let { id, list, onChangeList } = this.props;
        if (id == 0) {
            return;
        }
        let sort = Date.now();
        data = data.map(d => {
            sort = sort - 1;
            return {
                contentId: d.id,
                contentImg: d.contentImg,
                mode: d.mode,
                title: d.title,
                titleImg: d.titleImg,
                top: false,
                typeImg: d.typeImg,
                sort,
                description: d.description,
                topicAppStyle: d.topicAppStyle
            };
        });
        list = list.concat(data);
        onChangeList(list);
        this.setState({ visible: false });
    };
    render() {
        let { query, list } = this.props;
        let { id } = query;
        let { visible } = this.state;
        return [
            <Button type="primary" key="add" disabled={id == 0} className={styles.addentry} onClick={this.handleShow}>
                选取内容
            </Button>,
            visible &&
            ReactDOM.createPortal(
                <Ct onClose={this.handleHide} onOk={this.handleOk} sectionId={id} list={list} />,
                document.getElementById(rootDom)
            )
        ];
    }
}
const Ct = props => {
    return (
        <div className={styles.ct}>
            <div className={styles.cbox}>
                <ContentIndex {...props} />
            </div>
        </div>
    );
};
