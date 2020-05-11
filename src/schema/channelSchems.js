/**
 * 栏目管理验证条件
 */

const channelSchems = {
    type: "object",
    required: ["name", "path"],
    errorMessage: {
        type: "必须要输入数据",
        required: {
            name: "必须填写栏目名称",
            path: "必须填写访问路径"
        }
    },
    properties: {
        name: {
            type: "string",
            description: "栏目名称",
            minLength: 1,
            maxLength: 100,
            errorMessage: {
                minLength: "必须填写栏目名称",
                maxLength: "栏目名称不能超过20个字符",
            }
        },
        path: {
            type: "string",
            description: "访问路径",
            minLength: 1,
            errorMessage: {
                minLength: "必须填写访问路径"
            }
        },
    }
}

export default channelSchems;