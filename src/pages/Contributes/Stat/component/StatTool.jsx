import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';
import { Button, DatePicker, Input } from 'antd';
import moment from "moment";
import style from './styles.scss';
import basicfetch from '@/globalApp/yssjfetch/basicfetch'
import download from '@/utils/download';
class StatTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',
            type: '',
            updateBy: '',
            download: false,
        }
    }

    handleBtn = (name) => {
        this.setState({
            start: '',
            end: '',
            type: this.state.type === name ? "day" : name
        });
    }

    handleOnChangeDate = (moment, str) => {
        this.setState({ start: str[0], end: str[1], type: 'day' });
    }

    handleOnChangeText = (e) => {
        this.setState({ updateBy: e.target.value });
    }

    handleSearch = () => {
        let { start, end, type, updateBy } = this.state;
        this.props.onSearch && this.props.onSearch(start, end, type, updateBy);
    }

    handleDownload = async () => {
        if (this.state.download) return;
        this.setState({
            download: true
        });
        let { params } = this.props;
        let res = await basicfetch('hjztg/manuscript/excelStatistic', {
            responseType: 'blob',
            params: params
        });
        this.setState({
            download: false
        });
        download('excel.xlsx', res.data)
    }

    render() {
        let { start, end, type, exportUrl } = this.state;
        return (
            <div className={style.statTool}>
                <Button type={type === 'year' ? "primary" : 'default'} onClick={() => this.handleBtn("year")}>年统计</Button>
                <Button type={type === 'month' ? "primary" : 'default'} onClick={() => this.handleBtn("month")}>月统计</Button>
                <Button type={type === 'week' ? "primary" : 'default'} onClick={() => this.handleBtn("week")}>周统计</Button>
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
                    <Input onChange={this.handleOnChangeText} value={this.state.updateBy} placeholder="搜索名称" />
                </span>
                <Button onClick={this.handleSearch}>搜索</Button>
                <Button loading={this.state.download} onClick={this.handleDownload}>导出</Button>
            </div>
        );
    }
}

export default StatTool;