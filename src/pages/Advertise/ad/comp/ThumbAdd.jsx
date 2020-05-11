import React, { Component } from "react"
import { Icon } from "antd";

import thumbStyle from "./thumb.scss";
import "../../base.css";

const ResourceManager = app.asyncComponent('ResourceManager')
class ThumbAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    handleDelClick = () => {
        typeof this.props.delClick === "function" && this.props.delClick();
    }

    handleVisible = (b) => {
        this.setState({
            visible: b
        });
    }

    handleOnOk = (data) => {
        if(data[0]){
            typeof this.props.thumbClick === "function" && this.props.thumbClick(data[0]);
        }
        this.handleVisible(false);
    }

    render(){
        let { thumb } = this.props;
        let { visible } = this.state;
        return (
            <div className={"row"}>
            {
                thumb
                ?
                <div className={thumbStyle.imgBtn} style={{background: `${"url("+thumb+") no-repeat"}`, backgroundSize: "cover"}}>
                    <div className={thumbStyle.delWrap}>
                        <Icon onClick={this.handleDelClick} className={thumbStyle.delIcon} type="delete" />
                    </div>
                </div>
                :
                <>
                <span className={thumbStyle.thumbBtn} onClick={() => this.handleVisible(true)}></span>
                {
                    visible && (
                        <ResourceManager
                            key={"source"}
                            onHide={() => this.handleVisible(false)}
                            onOk={this.handleOnOk}
                            multiple={false}
                            resourceType={"image"}
                            uploadConfig="me"
                        />
                    )
                }
                </>
            }
            </div>
        )
    }
}

export default ThumbAdd;