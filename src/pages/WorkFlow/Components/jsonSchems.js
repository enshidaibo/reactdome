const jsonSchems = {
    type: "object",
    required: ["name", "tasks"],
    errorMessage: {
        type: "必须要输入数据",
        properties: {
            name: "必须填写工作流名称",
        }
    },
    properties: {
        name: {
            type: "string",
            title: "工作流名称",
            description: "工作流名称",
            minLength: 2,
            maxLength: 20,
            errorMessage: {
                minLength: "工作流名称不能少于2个字符",
                maxLength: "工作流名称不能超过20个字符",
            }
        },
        description: {
            type: "string",
            title: "描述",
            description: "描述",
        },
        priority: {
            type: "number",
            title: "排序",
            default: 1,
        },
        cross: {
            type: "boolean",
            title: "是否可以跨级",
            default: false,
        },
        nodes: {
            type: "array",
            title: "审核步骤",
            minItems: 1,
            errorMessage: {
                type: "必须要输入数据",
                minItems: "必须要有一个审核步骤"
            },
            items: {
                type: "object"
            }
        }
    }
}

export default jsonSchems