import React, { Component } from "react";
import { Icon, Button, Input } from "antd";
import styles from "./HeaderBar.scss";
export default class HeaderBar extends Component {
    handleChangeQuery = (name, value) => {
        let { query, onChangeQuery } = this.props;
        query[name] = value;
        onChangeQuery(query);
    };
    handleFormSubmit = e => {
        e.preventDefault();
        this.props.getListData();
    };
    render() {
        let { query } = this.props;
        return (
            <div className={styles.headerBar}>
                <form className={styles.form} onSubmit={this.handleFormSubmit}>
                    <Input
                        className={styles.input}
                        placeholder={`请输入搜索标题`}
                        value={query.queryTitle}
                        onChange={e => this.handleChangeQuery("queryTitle", e.target.value)}
                    />
                    <Input
                        className={styles.input}
                        placeholder={`请输入搜索发布人`}
                        value={query.queryInputUsername}
                        onChange={e => this.handleChangeQuery("queryInputUsername", e.target.value)}
                    />
                    <Button type="primary" htmlType="submit">
                        <Icon type="search" />
                        搜索
                    </Button>
                </form>
            </div>
        );
    }
}
