import React, { Component } from "react";
import { message } from "antd";

import Modal from "Components/Modal/Modal";
const { Warpper } = Modal;

import Step1 from "@/pages/ContentList/ContentListAdd/Step1";
import Step2 from "@/pages/ContentList/ContentListAdd/Step2";
import Step3 from "@/pages/ContentList/ContentListAdd/Step3";

import styles from "./SpecialtyEditContent.scss";

export default class SpecialtyEditContent extends Component {
    constructor(props) {
        super(props);
    }
    handleNextStep = () => {
        let { data, onChangeStep, onChangeState } = this.props;
        if (data.name.length == 0) {
            message.error("请输入内容列表名称！");
            return;
        }
        if (data.classify == 0) {
            onChangeState({ edit: false });
        } else if (data.classify == 1) {
            onChangeStep(2);
        } else if (data.classify == 2) {
            onChangeStep(3);
        }
    };
    render() {
        let { step, data, onChangeStep, onChange, onChangeData, onChangeState, action = "add" } = this.props;
        return (
            <Modal className={styles.addbox}>
                <Warpper title={"创建内容"} onClick={() => onChangeState({ edit: false })}>
                    {step == 1 && (
                        <Step1 data={data} action={action} onChange={onChange} onNextStep={this.handleNextStep} />
                    )}
                    {step == 2 && (
                        <Step2
                            data={data}
                            action={action}
                            onChange={onChangeData}
                            onChangeStep={onChangeStep}
                            onSave={() => onChangeState({ edit: false })}
                        />
                    )}
                    {step == 3 && (
                        <Step3
                            data={data}
                            action={action}
                            onChange={onChangeData}
                            onChangeStep={onChangeStep}
                            onSave={() => onChangeState({ edit: false })}
                        />
                    )}
                </Warpper>
            </Modal>
        );
    }
}
