/**
 * 登录字段验证条件
 */

import Immutable from "seamless-immutable";

const loginSchema = Immutable({
    type: "object",
    required: ["phone", "password"],
    errorMessage: {
        type: "必须要输入数据",
        required: {
            phone: "必须输入用户名",
            password: "必须输入密码"
        }
    },
    properties: {
        phone: {
            type: "string",
            description: "用户名or手机号",
            minLength: 1,
            // format: "mobile",
            errorMessage: {
                minLength: "必须输入用户名"
                // format: "请输入正确的手机号码"
            }
        },
        password: {
            type: "string",
            description: "密码",
            minLength: 1,
            errorMessage: {
                minLength: "必须输入密码"
            }
        }
    }
});

export default loginSchema;
