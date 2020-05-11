import React, { Component } from "react";
import { Button, Input } from "antd";
import style from "./search.scss";
import "../../base.css";

class SearchBar extends Component{
    constructor (props){
        super(props);
    }

    handleSearch = (v) => {
        typeof this.props.onSearch === "function" && this.props.onSearch(v);
    }

    render () { 

        return (
            <div className={style.scBarWrap + " row"}>
                <Input.Search placeholder="设备名称" 
                    onSearch={this.handleSearch} 
                    enterButton 
                    style={{width: '260px'}}
                />
            </div>
        );
    }
}

export default SearchBar;