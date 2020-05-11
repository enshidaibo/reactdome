import React, { Component } from "react";
import { Button } from "antd";
import { httpRemoteImgsWaterMark } from '@/services/resource'

const ResourceManager = app.asyncComponent('ResourceManager')

import PicView from "./Components/PicView";
import PicList from "./Components/PicList";

import styles from "./MultiPic.scss";
export default class MultiPic extends Component {
    static defaultProps = {
        value: []
    };
    constructor(props) {
        super(props);
        this.state = {
            showServer: false,
            curIndex: 0,
            item: [0, 1, 2, 3, 4]
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let { value = [] } = nextProps;
        let { curIndex } = prevState;
        if (value.length - 1 < curIndex) {
            curIndex = 0;
        }
        return {
            curIndex
        };
    }
    /**
     * 打开服务器资源列表
     */
    handleShowSource = () => {
        this.setState({
            showServer: true
        });
    };
    /**
     * 隐藏列表
     */
    handleHideSource = () => {
        this.setState({
            showServer: false
        });
    };
    handleChange = async data => {
        let { onChange, name, value } = this.props;
        this.setState({
            showServer: false
        });
        let arr = this.props.mark === true ? await this.imgsFilter(data) : data;
        value = value.concat(arr);
        onChange && onChange(name, value);
    };

    imgsFilter = async (imgs) => {
        let arr = [];
        for (let i = 0, len = imgs.length; i < len; i++) {
            let res = await httpRemoteImgsWaterMark({ url: imgs[i].path, mark: true });
            if (res.success) {
                let t = {
                    ...imgs[i],
                }
                t.path = res.body;
                t.thumb = res.body;
                arr.push(t);
            }
        }
        return arr;
    }

    handleChangeTextarea = description => {
        let { curIndex } = this.state;
        let { onChange, name, value } = this.props;
        value[curIndex].description = description;
        onChange && onChange(name, value);
    };
    handleChangeToggle = curIndex => {
        this.setState({
            curIndex
        });
    };
    handleChangeDel = i => {
        let { onChange, name, value } = this.props;
        value.splice(i, 1);
        onChange && onChange(name, value);
    };
    handleChangeOrder = data => {
        let { onChange, name } = this.props;
        onChange && onChange(name, data);
    };
    render() {
        let { showServer, curIndex } = this.state;
        let { value } = this.props;
        let curItem = value[curIndex];
        return (
            <div className={styles.MultiPic}>
                {value.length == 0 ? (
                    <div className={styles.noPic}>
                        <Button type="primary" onClick={this.handleShowSource}>
                            添加图片
                        </Button>
                    </div>
                ) : (
                        <div className={styles.pics}>
                            <PicView data={curItem} count={480} onChange={this.handleChangeTextarea} />
                            <PicList
                                data={value}
                                curIndex={curIndex}
                                onClick={this.handleChangeToggle}
                                onAdd={this.handleShowSource}
                                onDel={this.handleChangeDel}
                                onChangeOrder={this.handleChangeOrder}
                            />
                        </div>
                    )}
                {showServer && (
                    <ResourceManager
                        onHide={this.handleHideSource}
                        onOk={this.handleChange}
                        multiple={true}
                        resourceType={"image"}
                    />
                )}
            </div>
        );
    }
}
