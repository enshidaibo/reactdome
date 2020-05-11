import React, { Component } from "react";
import ReactDOM from "react-dom";
import Warpper from "./Warpper/Warpper";
import Groups from "./Groups/Groups";
import Input from "./Input/Input";
import Btns from "./Btns/Btns";
import ItemLabel from "./ItemLabel/ItemLabel";

import styles from "./Modal.scss";
export default class Modal extends Component {
    static Warpper = Warpper;
    static Groups = Groups;
    static Input = Input;
    static Btns = Btns;
    static ItemLabel = ItemLabel;
    render() {
        let { children } = this.props;
        return ReactDOM.createPortal(
            <div className={styles.modalbox}>{children}</div>,
            document.getElementById(rootDom)
        );
    }
}
