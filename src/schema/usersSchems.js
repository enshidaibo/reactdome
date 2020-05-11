/**
 * 用户管理验证条件
 */

const usersSchems = {
    type: "object",
    required: ["realname", "departmentId", "roleIds"],
    errorMessage: {
        type: "必须要输入数据",
        required: {
            realname: "必须填写真实姓名",
            departmentId: "必须选择部门",
            roleIds: "必须选择角色"
        }
    },
    properties: {
        realname: {
            type: "string",
            description: "真实姓名",
            minLength: 1,
            maxLength: 20,
            errorMessage: {
                minLength: "必须填写真实姓名",
                maxLength: "真实姓名不能超过20个字符",
            }
        },
        roleIds: {
            type: "array",
            items: {
                type: "integer"
            },
            description: "角色id",
            minItems: 1,
            errorMessage: {
                minItems: "必须选择一个角色"
            }
        }
    }
}

export default usersSchems;