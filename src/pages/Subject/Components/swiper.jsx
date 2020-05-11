import { Button, Tooltip, Icon } from 'antd';
import ArticleList from './common/ArticleList'
import Image from './Image';

import styles from './swiper.scss';
const swiper = ({ name, value = [], onChange }) => {
    const handleOk = (d) => {
        let newData = d.concat(value)
        onChange({ [name]: newData })
    }
    const handleDelete = (i) => {
        let newvalue = value.filter((d, index) => {
            return index !== i
        })
        onChange({ [name]: newvalue })
    }
    const handleChange = (n, v, i) => {
        let newvalue = value.setIn([i, n], v)
        onChange({ [name]: newvalue })
    }
    const handleChangeOrder = (key, pre = -1) => {
        key = parseInt(key)
        let startIndex = key + pre
        let start = value[startIndex]
        let end = value[key]
        if (!start || !end) {
            return
        }
        let value1 = value.set(startIndex, end)
        let value2 = value1.set(key, start)
        onChange({ [name]: value2 })
    }
    return <div>
        <ArticleList onOk={handleOk}>
            <Button type="primary">选择</Button>
        </ArticleList>
        <div>
            {value.map((d, i) => {
                return <div key={d.id} className={styles.list}>
                    <Image name={'titleImg'} value={d.titleImg} onChange={data => handleChange('titleImg', data.titleImg, i)} />
                    <div className={styles.ipts}>
                        <input className={styles.iptUrl} value={d.url} onChange={e => handleChange('url', e.target.value, i)} type="text" />
                        <input className={styles.iptTitle} value={d.title} onChange={e => handleChange('title', e.target.value, i)} type="text" />
                    </div>
                    <div className={styles.action}>
                        <Tooltip placement="right" title={'删除'}>
                            <Icon type="close" className={styles.delete} onClick={() => handleDelete(i)} />
                        </Tooltip>
                        <Tooltip placement="right" title={'上移'}>
                            <Icon className={styles.up} onClick={() => handleChangeOrder(i)} type="arrow-up" />
                        </Tooltip>
                        <Tooltip placement="right" title={'下移'}>
                            <Icon className={styles.up} onClick={() => handleChangeOrder(i, 1)} type="arrow-down" />
                        </Tooltip>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default swiper