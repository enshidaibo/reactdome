const Ajv = require("ajv");

const ajv = new Ajv({
    allErrors: true, //验证所有属性
    jsonPointers: true,
    removeAdditional: true, //移除未定义属性
    useDefaults: true, //启用默认值
    coerceTypes: true //强制类型转换
});

ajv.addFormat("mobile", (value) => {
    const phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return phone.test(value);
});

require("ajv-errors")(ajv);

export default ajv;