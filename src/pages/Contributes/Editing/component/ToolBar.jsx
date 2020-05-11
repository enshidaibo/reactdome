import React, { Component } from 'react';
import { Button, Input, DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import style from './styles.scss';
class ToolBar extends Component
{
    constructor(props){
        super(props);
        this.state = {
            startTime: '',
            endTime: '',
            title: ''
        }
    }

    handleNavBtnOnClick = status => {
        this.props.statusClick && this.props.statusClick(status);
    }

    //时间范围选择器
    handleRangeDateOnChange = (moments, dateStrs) => {
        this.setState({
            startTime: dateStrs[0],
            endTime: dateStrs[1]
        });
    }

    //标题搜索onchange
    handleInputOnChange = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    handleSearch = () => {
        let { startTime, endTime, title } = this.state;
        this.props.onSearch && this.props.onSearch(startTime, endTime, title);
    }

    render () {
        let { status } = this.props;
        let { startTime, endTime, title } = this.state;
        return (
            <div className={style.pageHd}>
                <Button type={status === '0' ? 'primary' : 'default'} onClick={() => this.handleNavBtnOnClick('0')}>待采用</Button>
                <Button type={status === '1' ? 'primary' : 'default'} onClick={() => this.handleNavBtnOnClick('1')}>待发表</Button>
                <Button type={status === '2' ? 'primary' : 'default'} onClick={() => this.handleNavBtnOnClick('2')}>已发表</Button>
                <Button type={status === '3' ? 'primary' : 'default'} onClick={() => this.handleNavBtnOnClick('3')}>已退稿</Button>
                <Button type={status === '5' ? 'primary' : 'default'} onClick={() => this.handleNavBtnOnClick('5')}>单计稿</Button>
                <Input
                    className={style.input} 
                    placeholder={"文章标题"}
                    onChange={this.handleInputOnChange}
                    value={title === undefined ? null : title}
                />
                <DatePicker.RangePicker
                    className={style.rangeDate}
                    value={[
                        startTime ? moment(startTime, 'YYYY-MM-DD') : null,
                        endTime ? moment(endTime, 'YYYY-MM-DD') : null,
                    ]}
                    onChange={this.handleRangeDateOnChange}
                    placeholder={['开始时间', '结束时间']}
                />
                <Button onClick={this.handleSearch} type="primary">搜索</Button>
            </div>
        );
    }
}

export default ToolBar;