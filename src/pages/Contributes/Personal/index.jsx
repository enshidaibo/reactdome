import React, { Component } from 'react';
import BreadcrumbCmp from "Components/BreadcrumbCmp/BreadcrumbCmp";
import { contributeStat } from '@/services/contribute';
import style from './styles.scss';
const contextConsumers = app.globalRedux.localRudexConsumers

@contextConsumers(state => ({
    userInfo: state.userInfo || $obj,
}))
class Statis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                userName: this.props.userInfo.username,
                token: sessionStorage.token,
                siteId: this.props.userInfo.siteId,
                pageNo: 1,
                pageSize: 10,
                orderBy: '',
                orderDesc: '',
                startTime: '',
                endTime: '',
                timeType: '',
                updateBy: '',
                userId:this.props.userInfo.username,
            },
            data: [],
            total: 0,
            loading: false,
        }
    }

    componentDidMount = () => {
        this.httpGetStat();
    }

    httpGetStat = async () => {
        if (this.state.loading) return;
        this.setState({ loading: true });
        let { params } = this.state;
        let res = await contributeStat(params);
        if (res.success) {
            console.log(res.body.list)
            this.setState({
                loading: false,
                data: res.body.list,
                total: res.body.totalCount
            });
        } else {
            this.setState({ loading: false });
        }
    }
    render() {
        return (
            <div className={style.page}>
                <BreadcrumbCmp />
                <div className={style.pageBody}>
                    <div className={style.pageStatis}>

                        <div className={style.pageMain}>
                            <div className={style.pageScroll}>
                                <div className={style.topdiv}>
                                    <div className={style.itemboxs} >
                                        <div className={style.itemtitle} style={{ color: 'blue' }}>投稿篇数</div>
                                        <div className={style.itemdata}>{this.state.data && this.state.data.length > 0 ? this.state.data[0].total : '0'}</div>
                                    </div>
                                    <div className={style.itemboxs} >
                                        <div className={style.itemtitle} style={{ color: 'green' }}>采用篇数</div>
                                        <div className={style.itemdata}>{this.state.data && this.state.data.length > 0 ? this.state.data[0].caiyong : '0'}</div>
                                    </div>
                                    <div className={style.itemboxs} >
                                        <div className={style.itemtitle} style={{ color: 'red' }}>发表量</div>
                                        <div className={style.itemdata}>{this.state.data && this.state.data.length > 0 ? this.state.data[0].publish : '0'}</div>
                                    </div>
                                    <div className={style.itemboxs} >
                                        <div className={style.itemtitle} style={{ color: 'gray' }}>单记稿篇数</div>
                                        <div className={style.itemdata}>{this.state.data && this.state.data.length && this.state.data[0].djg > 0 ? this.state.data[0].djg : '0'}</div>
                                    </div>
                                </div>
                                <div className={style.downdiv}>
                                    <h3 >评分等级：</h3>
                                    <div className={style.zongling}>
                                        <div className={style.itemboxs} >
                                            <div className={style.itemtitle} >A</div>
                                            <div className={style.itemdata}>{this.state.data && this.state.data.length > 0 ? this.state.data[0].a : ''}</div>
                                        </div>
                                        <div className={style.itemboxs} >
                                            <div className={style.itemtitle} >B</div>
                                            <div className={style.itemdata}>{this.state.data && this.state.data.length > 0 ? this.state.data[0].b : ''}</div>
                                        </div>    
                                        <div className={style.itemboxs} >
                                            <div className={style.itemtitle} >C</div>
                                            <div className={style.itemdata}>{this.state.data && this.state.data.length > 0 ? this.state.data[0].c : ''}</div>
                                        </div>    
                                        <div className={style.itemboxs} >
                                            <div className={style.itemtitle} >D</div>
                                            <div className={style.itemdata}>{this.state.data && this.state.data.length > 0 ? this.state.data[0].d : ''}</div>
                                        </div>        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Statis