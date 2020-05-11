import React, { Component } from "react";
import { Button, Input } from "antd";
import style from "./search.scss";
import "../../base.css";

class SearchBar extends Component{
    constructor (props){
        super(props);
        this.state = {
            number: "",
            adsName: ""
        }
    }

    handleSearch = () => {
        let { number, adsName } = this.state;
        typeof this.props.onSearch === "function" && this.props.onSearch(number, adsName);
    }

    handleTextChange = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    render () { 

        let { number, adsName } = this.state;

        return (
            <div className={style.scBarWrap + " row"}>
                <div style={{marginRight: '15px'}}>
                    <Input 
                        value={number}
                        onChange={(e) => this.handleTextChange("number", e)}
                        style={{width: 200}}
                        placeholder="设备号"
                    />
                </div>
                <div style={{marginRight: '15px'}}>
                    <Input 
                        value={adsName}
                        onChange={(e) => this.handleTextChange("adsName", e)}
                        style={{width: 200}}
                        placeholder="广告名称"
                    />
                </div>
                <div style={{marginRight: '15px'}}>
                    <Button type="primary" onClick={this.handleSearch}>搜索</Button>
                </div>
            </div>
        );
    }
}

export default SearchBar;