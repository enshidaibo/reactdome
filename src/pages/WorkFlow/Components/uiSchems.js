const uiSchemas = {
    name: {
        uiType: "text",
        // uiHelp: "请输入工作流名称",
        uiOptions: {
            // allowClear: true,
            placeholder: '请输入工作流名称'
        },
        onChange: (props, data) => {
            props.onChange(data[0])
        }
    },
    description: {
        uiType: "textarea",
    },
    priority: {
        uiType: "inputNumber",
    },
    cross: {
        uiType: "switch",
    },
    nodes: {
        uiType: "workFlow",
    },
}

export default uiSchemas