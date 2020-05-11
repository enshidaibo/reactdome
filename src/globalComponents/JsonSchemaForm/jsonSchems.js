const jsonSchems = {
    type: "object",
    required: ["name", "path", "path1", "tasks"],
    errorMessage: {
        type: "必须要输入数据",
        properties: {
            name: "必须填写栏目名称",
            path: "必须填写访问路径",
            path1: "必须填写访问路径1",
        }
    },
    properties: {
        name: {
            type: "string",
            title: "栏目名称",
            description: "栏目名称",
            minLength: 5,
            maxLength: 20,
            errorMessage: {
                minLength: "栏目名称不能少于5个字符",
                maxLength: "栏目名称不能超过20个字符",
            }
        },
        tasks: {
            type: "array",
            title: "审核步骤",
            minItems: 1,
            errorMessage: {
                type: "必须要输入数据",
                minItems: "必须要有一个审核步骤"
            },
            items: {
                type: "object",
                // "required": [
                //     "title"
                // ],
                // errorMessage: {
                //     type: "数据必须是一个对象",
                //     properties: {
                //         title: "必须填写标题",
                //     },
                // },
                // "properties": {
                //     "title": {
                //         "type": "string",
                //         "title": "Title",
                //     },
                //     "details": {
                //         "type": "string",
                //         "title": "Task details",
                //     },
                //     "done": {
                //         "type": "boolean",
                //         "title": "Done?",
                //         "default": false
                //     }
                // }
            }
        },
        // tasks: {
        //     type: "array",
        //     title: "Tasks",
        //     items: {
        //         "type": "object",
        //         "required": [
        //             "title"
        //         ],
        //         errorMessage: {
        //             type: "数据必须是一个对象",
        //             properties: {
        //                 title: "必须填写标题",
        //             },
        //         },
        //         "properties": {
        //             "title": {
        //                 "type": "string",
        //                 "title": "Title",
        //             },
        //             "details": {
        //                 "type": "string",
        //                 "title": "Task details",
        //             },
        //             "done": {
        //                 "type": "boolean",
        //                 "title": "Done?",
        //                 "default": false
        //             }
        //         }
        //     }
        // },
        // path: {
        //     type: "boolean",
        //     title: "访问路径",
        //     default: 1,
        // },
        // path1: {
        //     type: "string",
        //     title: "访问路径2",
        //     minLength: 5,
        //     maxLength: 50,
        //     format: "uri",
        //     errorMessage: {
        //         minLength: "不能少于5个字符",
        //         format: "外链地址格式不正确",
        //         maxLength: "不能超过50个字符",
        //     }
        // },
        // path2: {
        //     type: "integer",
        //     title: "访问路径",
        //     default: 1,
        // },
        // select: {
        //     type: "string",
        //     title: "访问路径",
        //     errorMessage: {
        //         type: "应该选择一个数字",
        //     }
        // },
        // checkbox: {
        //     "type": "array",
        //     "title": "checkbox",
        // },
        // date: {
        //     "type": "string",
        //     "title": "date",
        // },
        // number: {
        //     type: "number",
        //     title: "number",
        //     default: 0,
        // },
        // treeSelect: {
        //     type: "string",
        //     title: "treeSelect",
        //     minItems: 1,
        //     default: []
        // },
        // tree: {
        //     type: "array",
        //     title: "tree",
        //     default: ['0-0-0'],
        // },
        // content: {
        //     type: "string",
        //     title: "内容",
        //     minLength: 10,
        //     errorMessage: {
        //         minLength: "内容不能少于10个字符",
        //     }
        // },
    }
}

export default jsonSchems