import xlsx from 'xlsx';
import { message } from 'antd'
import { Link } from "react-router-dom";

import { addChannelDetail } from "@/services/channel";
import downloadcsv from '@/utils/downloadcsv';
const Test2 = () => {

    const addChannel = async (filename, sheetName, data, start = 0, exportData = []) => {
        if (data.length > start) {
            let startdata = data[start]
            let detail = {
                name: startdata.name,
                // path: startdata.path,
                path: 'fupin' + start,
                modelId: startdata.modelId ? 6 : 0,
                display: true,
                priority: 10,
                staticChannel: false,
                staticContent: false
            }
            if (startdata.oldParentId) {
                let parent = exportData.find((d) => {
                    return d.oldId == startdata.oldParentId
                })
                if (!parent) {
                    let header = [
                        { title: "name", name: "name" },
                        { title: "oldParentId", name: "oldParentId" },
                        { title: "modelId", name: "modelId" },
                        { title: "oldId", name: "oldId" },
                        { title: "Id", name: "id" },
                        { title: "path", name: "path" },
                        { title: "url", name: "url" }
                    ];
                    downloadcsv(header, exportData, filename);
                    return
                }
                detail.parentId = parent.id
            } else {
                detail.parentId = null
            }
            if (!detail.path) {
                message.error('栏目path字段不能为空')
                return
            }
            let res = await addChannelDetail(detail)
            if (res.success) {
                console.log(detail.name, '新增栏目成功');
                detail = { ...startdata, ...detail, id: parseInt(res.body.id) }
                exportData.push(detail)
                start++
                addChannel(filename, sheetName, data, start, exportData)
            }
        } else {
            let header = [
                { title: "name", name: "name" },
                { title: "oldParentId", name: "oldParentId" },
                { title: "modelId", name: "modelId" },
                { title: "oldId", name: "oldId" },
                { title: "Id", name: "id" },
                { title: "path", name: "path" },
                { title: "url", name: "url" }
            ];
            downloadcsv(header, exportData, filename);
        }

    }
    const orderData = (data, parentId = 0) => {
        let pdata = data.filter(d => {
            return d.oldParentId == parentId
        })
        if (pdata.length == 0) {
            return []
        }
        let childData = []
        pdata.map(d => {
            let rs = orderData(data, d.oldId)
            childData = childData.concat(rs);
        })
        let res = pdata.concat(childData);
        return res
    }
    const handleChange = (e) => {
        let wb;//读取完成的数据
        let rABS = false;
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = e.target.result;
            if (rABS) {
                wb = xlsx.read(btoa(fixdata(data)), {//手动转化
                    type: 'base64'
                });
            } else {
                wb = xlsx.read(data, {
                    type: 'binary'
                });
            }
            let sheets = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            let sheets2 = orderData(sheets)
            addChannel(file.name.split('.')[0], wb.SheetNames[0], sheets2)
            //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
            //wb.Sheets[Sheet名]获取第一个Sheet的数据
        };
        if (rABS) {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsBinaryString(file);
        }
    }
    return <div>
        <div>test2</div>
        <Link to="/test1">test1</Link>
        <div>
            <input type="file" onChange={handleChange} />
        </div>
    </div>
}


export default Test2