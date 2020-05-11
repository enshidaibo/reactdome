import React, { Component } from 'react';
import { Button, DatePicker, Input } from 'antd';
import qs from 'qs';
import moment from "moment";
import style from './styles.scss';
import basicfetch from '@/globalApp/yssjfetch/basicfetch'
import download from '@/utils/download';
class StatListTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',
            title: '',
            download: false,
        }
    }

    handleOnChangeDate = (moment, str) => {
        this.setState({ start: str[0], end: str[1], type: 'day' });
    }

    handleOnChangeText = (e) => {
        this.setState({ title: e.target.value });
    }

    handleSearch = () => {
        let { start, end, title } = this.state;
        this.props.onSearch && this.props.onSearch(start, end, title);
    }

    handleDownload = async () => {
        if (this.state.download) return;
        this.setState({
            download: true
        });
        let { params } = this.props;
        let res = await basicfetch('jztg/manuscript/excelList', {
            responseType: 'blob',
            params: params
        });
        this.setState({
            download: false
        });
        download('excel.xlsx', res.data)
    }

    render() {
        let { start, end, exportUrl } = this.state;
        return (
            <div className={style.statTool}>
                <span>
                    <DatePicker.RangePicker
                        value={
                            [
                                start ? moment(start, 'YYYY-MM-DD') : null,
                                end ? moment(end, "YYYY-MM-DD") : null
                            ]
                        }
                        onChange={this.handleOnChangeDate}
                        format={"YYYY-MM-DD"}
                    />
                </span>
                <span>
                    <Input onChange={this.handleOnChangeText} value={this.state.title} placeholder="搜索标题" />
                </span>
                <Button onClick={this.handleSearch}>搜索</Button>
                <Button loading={this.state.download} onClick={this.handleDownload}>导出</Button>
            </div>
        );
    }
}

export default StatListTool;