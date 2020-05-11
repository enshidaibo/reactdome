import React, { Component } from "react";
import styles from "./Search.scss";

const Search = ({ getData, onChange, value }) => {
    const handleSubmit = e => {
        e.preventDefault();
        getData({
            pageNo: 1,
            version: Date.now()
        });
    };
    return (
        <div className={styles.search}>
            <form className={styles.searchs} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="请输入搜索关键字"
                    className={styles.ipt}
                    value={value}
                    onChange={onChange}
                />
                <button type="submit" className={styles.sbtn}>
                    搜索
                </button>
            </form>
        </div>
    );
}

export default Search