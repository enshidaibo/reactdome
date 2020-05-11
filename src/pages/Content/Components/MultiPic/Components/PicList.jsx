import React, { Component } from "react";
import { DragDropBox, DragDropCard } from "Extended/react-dnd";

import styles from "./PicList.scss";
const PicList = ({ data, curIndex, onClick, onAdd, onDel, onChangeOrder }) => {
    return (
        <div className={styles.lists} onChange={onChangeOrder} data={data}>
            <DragDropBox onChange={onChangeOrder} data={data}>
                {data.map((d, i) => {
                    let cls = i == curIndex ? styles.clist : styles.list;
                    return (
                        <DragDropCard className={cls} key={d.path} index={i}>
                            <div
                                className={styles.img}
                                onClick={() => onClick(i)}
                                style={{ backgroundImage: `url(${d.thumb || d.path})` }}
                            />
                            <span className={styles.del} onClick={() => onDel(i)}>
                                ×
                            </span>
                        </DragDropCard>
                    );
                })}
            </DragDropBox>
            <div className={`iconfont icon-762bianjiqi_jietu ${styles.btnadd}`} onClick={onAdd} />
            <div className="clear" />
        </div>
    );
};

export default PicList;
