import Ajv from "ajv";

const ajv = new Ajv({
    allErrors: true, //验证所有属性
    jsonPointers: true,
    removeAdditional: true, //移除未定义属性
    useDefaults: true, //启用默认值
    coerceTypes: true, //强制类型转换
    errorDataPath: "property",
    multipleOfPrecision: 8,
    schemaId: "auto",
    unknownFormats: "ignore",
});

ajv.addFormat("mobile", (value) => {
    const phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return phone.test(value);
});

ajv.addFormat(
    "data-url",
    /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/
);
ajv.addFormat(
    "color",
    /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/
);

require("ajv-errors")(ajv);

export default ajv;