import react, { useEffect } from "react";
import { Button, Input } from "antd";
import ContentLayout from '@/pages/A_Layout/ContentLayout';
import FormItem from '@/components/Form/FormItem';
const ResourceManager = app.asyncComponent('ResourceManager')
import styles from "./styles.scss";
import useData from '@/hooks/useData';
import { getBootMap, updateBootMap } from './services'

const BootMapIndex = () => {
    const [data, setData] = useData({ initPage: "", link: "", showTime: "", visible: false, loading: false })
    let { initPage, link, showTime, visible, loading } = data
    const handleShow = () => setData({ visible: true })
    const handleHide = () => setData({ visible: false })
    const handleChange = (data) => {
        setData({ visible: false })
        let initPage = data[0].thumb
        setData({ visible: false, initPage })
    };
    useEffect(() => {
        const getData = async () => {
            let res = await getBootMap()
            console.log(res);
        }
        getData()
        console.log('1');
    }, [])
    const handleSubmit = async () => {
        setData({ loading: true })
        let res = await updateBootMap({ initPage, link, showTime })
        console.log(res);
    }
    return (
        <ContentLayout>
            <div className={styles.bootmap}>
                <FormItem label="开机图片" style={{ borderTop: 'none' }}>
                    <div className={styles.image} onClick={handleShow}>
                        {initPage
                            ? <img className={styles.i} src={initPage} />
                            : <div className={"iconfont icon-tianjiatupian " + styles.iconfont} />}
                    </div>
                    <Button className={styles.btn} onClick={handleShow}>重新选择</Button>
                    <div>图片尺寸大小建议为720*1000px，200k以内！</div>
                </FormItem>
                <FormItem label="跳转连接">
                    <Input style={{ maxWidth: '400px' }} value={link}  onChange={e=>setData({link:e.target.value})}/>
                </FormItem>
                <FormItem label="展示时间">
                    <Input style={{ maxWidth: '400px' }} type='number' value={showTime} min={0} max={999999} onChange={e=>setData({showTime:e.target.value})} />
                </FormItem>
                <FormItem label="">
                    <Button type="primary" loading={loading} onClick={handleSubmit}>保存</Button>
                </FormItem>
                {visible && (
                    <ResourceManager
                        onHide={handleHide}
                        onOk={handleChange}
                        multiple={false}
                        image={false}
                        curTab={"image"}
                    />
                )}
            </div>
        </ContentLayout>
    )
}

export default BootMapIndex
