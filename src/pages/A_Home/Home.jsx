import React, { useState, useEffect } from "react";
import dayjs from 'dayjs'
import styles from "./Home.scss";
import { getContentList } from "@/services/content";

const Home = () => {
    const locale = app.globalRedux.getContext()
    const { userInfo } = locale.context
    const [list, setList] = useState([])
    useEffect(() => {
        const getListData = async () => {
            let res = await getContentList({
                pageNo: 1,
                pageSize: 2,
                queryTopLevel: false,
                queryRecommend: false,
                queryShare: 0,
                queryOrderBy: 4,
                queryStatus: "checked",
                cid: window.AppConfig.tzchannelId,
            });
            if (res.success) {
                setList(res.body);
            }
        };
        if (window.AppConfig.tzchannelId) {
            getListData()
        }
    }, [])
    const setSiteId = (val) => {
        localStorages._site_id_param = val;
        localStorages.removeItem('contentcid')
        // window.location.reload()
        window.location.href = AppConfig.homeUrl || "/"; //重新处理请求
    }
    return <div className={styles.home}>
        <div className={styles.userinfo}>
            <img className={styles.avatar} src="./public/images/avatar/1.jpg" alt="" />
            <div className={styles.username}>
                <div>{userInfo.realname}</div>
                <div className={styles.userwh}>您好！</div>
            </div>
        </div>
        <div className={styles.notice}>
            <div className={styles.notice_title}>
                系统通知
            </div>
            <div className={styles.notice_list}>
                {list.map(d => {
                    return <div className={styles.aa} key={d.id}>
                        <a className={styles.a} target="_blank" href={d.url}>{d.title}</a>
                        <span className={styles.time}>{dayjs(d.releaseDate).format("YYYY-MM-DD")}</span>
                    </div>
                })}
            </div>
        </div>
        <div className={styles.sites}>
            <div className={styles.site}>当前可访问站点数：{userInfo.sites.length}个</div>
        </div>
        <div className={styles.helps}>
            <div className={styles.title}>在线帮助</div>
            <div className={styles.helpmenu}>
                <a className={styles.helpa} target="_blank" href="https://rmy.estv.com.cn/helps/%E5%86%85%E5%AE%B9%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.html">内容管理</a>
                <a className={styles.helpa} target="_blank" href="https://rmy.estv.com.cn/helps/%E6%8A%A5%E6%96%99%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.html">爆料</a>
                <a className={styles.helpa} target="_blank" href="https://rmy.estv.com.cn/helps/%E6%8A%95%E7%A8%BF%E7%B3%BB%E7%BB%9F%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.html">投稿</a>
                <a className={styles.helpa} target="_blank" href="https://rmy.estv.com.cn/helps/网络问政操作手册.html">网络问政</a>
            </div>
        </div>
        <div className={styles.entrance}>
            <div className={styles.title}>快速入口</div>
            <div className={styles.site}>
                {userInfo.sites.map(d => {
                    if (d.id == localStorage._site_id_param) {
                        return null
                    }
                    return <span className={styles.a} key={d.id} onClick={() => setSiteId(d.id)}>{d.name}</span>
                })}
            </div>
        </div>
        <div className={styles.notice}>
            <div className={styles.notice_title}>
                联系我们
            </div>
            <div className={styles.notice_list}>
                <div className={styles.lxwm}>
                    <img className={styles.lxwmimg} src="./public/images/2257167310.jpg" alt="" />
                    <div className={styles.lxwmt}>QQ：2257167310</div>
                </div>
            </div>
        </div>
        <div className="clear" />
    </div>
}

export default Home
// export default class Home extends Component {
//     static defaultProps = {
//         data: {}
//     };
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     componentDidMount() {
//         // this.getD()
//         setTimeout(() => {
//             this.sourceChart = echarts.init(this.source);
//             this.pvChart = echarts.init(this.pv);
//             window.addEventListener("resize", this.createChart);
//             this.httpSource();
//             this.httpPv();
//         }, 0);
//     }

//     getD = async () => {
//         let res = await app.loadScripts('./public/index-337c77f4bedd19caf7df.js')
//         console.log(res);

//     }
//     createChart = () => {
//         this.sourceChart.resize();
//         this.pvChart.resize();
//     };
//     httpSource = async () => {
//         let res = await getFlowSource();
//         if (res.success) {
//             let { keys, totalMap } = res.body;
//             let data = [];
//             Object.keys(totalMap).map(d => {
//                 data.push({
//                     name: d,
//                     value: totalMap[d]
//                 });
//             });
//             let option = sourceChart(keys, data);
//             this.sourceChart.setOption(option);
//         }
//     };
//     httpPv = async () => {
//         let res = await getFlowPv();
//         if (res.success) {
//             let option = lineChart(res.body.list);
//             this.pvChart.setOption(option);
//         }
//     };
//     render() {
//         return (
//             <div className={styles.home}>
//                 <div className={styles.userinfo}>
//                     <img src="./" alt=""/>
//                 </div>
//                 <div className={styles.charts}>
//                     <div className={styles.title}>来源分析</div>
//                 </div>
//                 <div className="clear" />
//             </div>
//         );
//     }
// }
