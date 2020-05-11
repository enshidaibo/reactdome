import { useState, useEffect } from "react";
import { Carousel, Button, message } from 'antd';
import { getContentListData } from "@/services/contentlist";
import styles from './PreviewCarousel.scss'

const PreviewCarousel = ({ id }) => {
    const [data, setData] = useState([])
    useEffect(()=>{
        const getData = async () => {
            if (!id) {
                return setData([])
            }
            let res = await getContentListData({ id })
            if (res.success) {
                setData(res.body)
            }
        }
        getData()
    }, [id])
    return <Carousel className={styles.carousel}>
        {data.map(d => {
            return <div className={styles.slide} key={d.id}>
                <img className={styles.img} src={d.titleImg}></img>
                <div className={styles.title}>{d.title}</div>
            </div>
        })}
    </Carousel>
}

export default PreviewCarousel
