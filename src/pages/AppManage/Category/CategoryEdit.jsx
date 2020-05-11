import { useState, useEffect } from "react";
import { Button, message } from 'antd';
import useData from '@/hooks/useData';
import LoadSpin from '@/pages/A_Layout/LoadSpin';
import { RightContent } from '@/pages/A_Layout/ContentLayout';
import { getAppChannelDetail, UpdateAppService } from "@/services/appchannel";
import SelectService from './Components/SelectService';
import SelectSlide from './Components/SelectSlide';
import ServiceList from './Components/ServiceList';
import styles from './CategoryEdit.scss'

const CategoryEdit = ({ match }) => {
    const { id } = match.params
    const [data, setData] = useData({})
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            let res = await getAppChannelDetail({ id })
            setLoading(false)
            if (res.success) {
                setData(res.body)
            }
        }
        getData()
    }, [id])
    const handleOk = contentSectionId => {
        setData({ contentSectionId })
    }
    const onOk = (v) => {
        setVisible(false)
        setData({ services: [].concat(data.services, v) })
    }
    const deleteService = id => {
        let services = data.services.filter(d => {
            return d.id != id
        })
        setData({ services })
    }
    const handleChangeSorts = services => {
        setData({ services })
    }

    const [saveloading, setSaveLoading] = useState(false)
    const httpSubmit = async () => {
        setSaveLoading(true)
        let services = data.services.map(d => d.id).join(',')
        let res = await UpdateAppService({ channelId: data.id, services, contentSectionId: data.contentSectionId })
        setSaveLoading(false)
        if (res.success) {
            message.success('保存成功！')
        }
    }
    return <RightContent>
        <LoadSpin loading={loading}>
            <div className={styles.name}>{data.name}
                <Button type='primary' onClick={httpSubmit} loading={saveloading} style={{ marginTop: "15px" }}>保存</Button>
            </div>
            <SelectSlide id={data.contentSectionId} onOk={handleOk} />
            <ServiceList deleteService={deleteService} setVisible={setVisible} dataSource={data.services} onChangeSorts={handleChangeSorts} />
        </LoadSpin>
        <SelectService visible={visible} setVisible={setVisible} data={data.services} onOk={onOk} />
    </RightContent>
}

export default CategoryEdit