import Immutable from "seamless-immutable";

const baseSchema = Immutable({
    // additionalProperties: false,
    type: "object",
    required: [],
});

const mode0 = Immutable({
    type: "object",
    required: ["titleImg"],
    errorMessage: {
        type: "必须要有验证数据",
        required: {
            titleImg: "必须上传缩略图"
        }
    },
    properties: {
        titleImg: {
            type: "string",
            description: "缩略图",
            minLength: 1,
            errorMessage: {
                minLength: "必须上传缩略图"
            }
        }
    }
});

const mode2 = Immutable({
    type: "object",
    required: ["titleImg", "typeImg", "contentImg"],
    errorMessage: {
        type: "必须要有验证数据",
        required: {
            titleImg: "必须上传缩略图",
            typeImg: "必须上传缩略图2",
            contentImg: "必须上传缩略图3"
        }
    },
    properties: {
        titleImg: {
            type: "string",
            description: "缩略图",
            minLength: 1,
            errorMessage: {
                minLength: "必须上传缩略图"
            }
        },
        typeImg: {
            type: "string",
            description: "缩略图",
            minLength: 1,
            errorMessage: {
                minLength: "必须上传缩略图2"
            }
        },
        contentImg: {
            type: "string",
            description: "缩略图",
            minLength: 1,
            errorMessage: {
                minLength: "必须上传缩略图3"
            }
        }
    }
});

const modeSchems = {
    mode0: mode0,
    mode1: mode0,
    mode2: mode2,
    mode3: baseSchema
};
export default modeSchems;