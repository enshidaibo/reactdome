import { useState, useEffect } from "react";
import { LeftContent } from '@/pages/A_Layout/ContentLayout';
import { getAppChannel } from "@/services/appchannel";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

const { Item } = Menu;
const LeftMenu = () => {
    const [list, setList] = useState([])
    useEffect(() => {
        const getData = async () => {
            let res = await getAppChannel({ pageSize: 100 })
            if (res.success) {
                setList(res.body)
            }
        }
        getData()
    }, [])
    return (
        <LeftContent>
            <Menu mode="inline"
                selectedKeys={[globalBranchMain.match.params.id]}
                style={{ borderRight: 'none' }}>
                {list.map(d => {
                    return <Item key={d.id}>
                        <Link to={`/appmanage/category/${d.id}`}>
                            <Icon type={`mail`} />
                            <span>{d.name}</span>
                        </Link>
                    </Item>
                })}
            </Menu>
        </LeftContent>
    )
}

export default LeftMenu
