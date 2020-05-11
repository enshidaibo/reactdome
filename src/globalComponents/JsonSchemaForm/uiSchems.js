import axios from "axios";

const getData = async () => {
    let res = await axios('mock/1.json')
    return res
}

const getDataTree = async () => {
    let res = await axios('mock/tree.json')
    return res
}

const uiSchemas = {
    name: {
        uiType: "text",
        uiHelp: "请输入栏目名称",
        uiOptions: {
            allowClear: true,
            placeholder: '请输入栏目名称'
        },
        onChange: (props, data) => {
            props.onChange(data[0])
        }
    },
    path: {
        uiType: "switch",
        // uiData: [{
        //     "value": 1,
        //     "title": "苹果"
        // }, {
        //     "value": 2,
        //     "title": "梨子"
        // }, {
        //     "value": 3,
        //     "title": "香蕉"
        // }],
        uiData: getData,
    },
    path1: {
        uiType: "textarea",
        // uiData: [{
        //     "value": 1,
        //     "title": "苹果"
        // }, {
        //     "value": 2,
        //     "title": "梨子"
        // }, {
        //     "value": 3,
        //     "title": "香蕉"
        // }],
        uiData: getData,
    },
    path2: {
        uiType: "radio",
        // uiData: [{
        //     "value": '1',
        //     "title": "苹果"
        // }, {
        //     "value": '2',
        //     "title": "梨子"
        // }, {
        //     "value": '3',
        //     "title": "香蕉"
        // }],
        uiData: getData,
    },
    select: {
        uiType: "select",
        // uiData: getData,
        uiData: [{
            "value": '12',
            "title": "苹果"
        }, {
            "value": '2',
            "title": "梨子"
        }, {
            "value": '3',
            "title": "香蕉"
        }],
        uiOptions: {
            showSearch: true,
            optionFilterProp: 'children',
            // mode: "tags",
            allowClear: true,
            placeholder: '请输入栏目名称'
        }
    },
    checkbox: {
        uiType: "checkbox",
        uiData: getData,
    },
    date: {
        uiType: "date",
        // uiTypeExt: "MonthPicker",
        uiOptions: {
            showTime: true,
            // format: "YYYY/MM/DD"
        }
    },
    treeSelect: {
        uiType: "treeSelect",
        uiOptions: {
            showSearch: true,
            allowClear: true,
            placeholder: '请选择一个参数',
            treeDefaultExpandAll: true,
        },
        uiData: getDataTree,
    },
    tree: {
        uiType: "tree",
        uiOptions: {
            showLine: true,
            checkable: true,
            defaultExpandAll: true,
            multiple: true
        },
        uiData: getDataTree,
        onChange: (props, data) => {
            console.log(props)
            let { name, onChange } = props
            onChange({
                [name]: data[0]
            })
        }
    },
    content: {
        uiType: "SlateEditer",
        uiOptions: {
            uiLayout: {
                labelCol: { span: 6 },
                wrapperCol: { span: 16 }
            }
        },
        onChange: (props, data) => {
            let { name } = props
            props.onChange({
                [name]: data[0]
            })
        }
    },
    tasks: {
        uiType: "workFlow",
        uiData: getData,
    },
}

export default uiSchemas