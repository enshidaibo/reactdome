import React, { Component } from 'react';
import { Table } from 'antd';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";

import style from './styles.scss';
class Statis extends Component{
    

    render(){
        return (
            <div className={style.page}>
                <BreadcrumbCmp />
                <div className={style.pageBody}>
                    <div className={style.pageStatis}>
                        <div className={style.pageHd}>
                            sfsf
                        </div>
                        <div className={style.pageMain}>
                            <div className={style.pageScroll}>
                                <Table />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Statis