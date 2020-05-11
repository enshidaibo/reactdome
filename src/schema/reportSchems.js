/**
 * 用户管理验证条件
 */

const reportSchems = {
    type: "object",
    required: ["columnName", "columnProfile", "telephone", "logo"],
    errorMessage: {
        type: "必须要输入数据",
        required: {
            columnName: "必须输入栏目名称",
            columnProfile: "必须输入栏目简介",
            telephone: "必须输入爆料电话",
            logo: "必须上传栏目logo"
        }
    },
    properties: {
        columnName: {
            type: "string",
            description: "栏目名称",
            minLength: 1,
            maxLength: 7,
            errorMessage: {
                minLength: "必须输入栏目名称",
                maxLength: "栏目名称最长为7位"
            }
        },
        columnProfile: {
            type: "string",
            description: "栏目简介",
            minLength: 1,
            errorMessage: {
                minLength: "必须输入栏目简介"
            }
        },
        telephone: {
            type: "string",
            description: "爆料电话",
            format: "mobile",
            errorMessage: {
                // minLength: "必须输入爆料电话",
                format: "请输入正确的手机号码"
            }
        },
        logo: {
            type: "string",
            description: "栏目logo",
            minLength: 1,
            errorMessage: {
                minLength: "必须上传栏目logo"
            }
        },
    }
}

export default reportSchems;