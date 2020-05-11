import Immutable from "seamless-immutable";

const comSchema = {
    if_reprint: {
        if: {
            properties: { reprint: { "enum": [true] } }
        },
        then: {
            required: ["originUrl"],
            errorMessage: {
                type: "必须要有验证数据",
                required: {
                    originUrl: "必须输入转载链接"
                }
            },
            properties: {
                originUrl: {
                    type: "string",
                    format: "uri",
                    description: "转载链接",
                    errorMessage: {
                        format: "转载链接格式不正确"
                    }
                },
            }
        },
    },
    title: {
        type: "string",
        description: "标题",
        minLength: 2,
        errorMessage: {
            minLength: "标题长度最少不能少于2个字"
        }
    },
    shortTitle: {
        type: "string",
        description: "副标题",
        maxLength: 80,
        errorMessage: {
            maxLength: "副标题不能超过80个字符"
        }
    },
    dutyDepratment: {
        type: "string",
        description: "责任部门",
        minLength: 1,
        errorMessage: {
            minLength: "责任部门不能为空"
        }
    },
    channelIds: {
        type: "array",
        items: {
            type: "integer"
        },
        description: "栏目id",
        minItems: 1,
        errorMessage: {
            minItems: "必须选择栏目"
        }
    },
    mode: {
        type: "integer",
        description: "显示模式(0单图,1三图,2大图,3无)",
        minimum: 0,
        maximum: 3
    },
    reprint: {
        type: "boolean",
        description: "是否转载"
    },
    tagStr: {
        type: "array",
        items: {
            type: "string",
            maxLength: 20,
            errorMessage: {
                maxLength: "Tags长度超过了20个字符"
            }
        },
        description: "Tags",
    },
    txt: {
        type: "string",
        description: "文章正文",
        minLength: 8,
        errorMessage: {
            minLength: "文章内容不能为空"
        }
    },
}

const baseSchema = Immutable({
    // additionalProperties: false,
    type: "object",
    required: ["title", "channelIds"],
    errorMessage: {
        type: "必须要有验证数据",
        required: {
            title: "必须填写标题",
            channelId: "栏目不能为空",
            txt: "文章内容不能为空",
            link: "必须填写外链地址",
            topicLogo: "必须上传专栏头像",
            mediaPath: "必须选择视频",
            audioPath: "必须选择音频",
            mediaTime: "音视频时长信息缺失，请重新选择音视频重新获取",
            pictureStr: "必须选择组图图片",
        }
    },
    properties: {
        title: comSchema.title,
        shortTitle: comSchema.shortTitle,
        name: {
            type: "string",
            description: "标题",
            minLength: 2,
            errorMessage: {
                minLength: "标题长度最少不能少于2个字"
            }
        },
        channelIds: comSchema.channelIds,
        mode: comSchema.mode,
        reprint: comSchema.reprint,
        topicLogo: {
            type: "string",
            description: "专栏头像",
            minLength: 1,
            errorMessage: {
                minLength: "必需上传专栏头像"
            }
        },
        tagStr: comSchema.tagStr,
        link: {
            type: "string",
            description: "跳转链接",
            format: "uri",
            errorMessage: {
                format: "外链地址格式不正确"
            }
        }
    }
});
const newsSchema = Immutable({
    // additionalProperties: false,
    type: "object",
    required: ["title", "channelIds", "txt"],
    errorMessage: {
        type: "必须要有验证数据",
        required: {
            title: "必须填写标题",
            channelId: "栏目不能为空",
            txt: "文章内容不能为空",
        }
    },
    ...comSchema.if_reprint,
    properties: {
        title: comSchema.title,
        shortTitle: comSchema.shortTitle,
        channelIds: comSchema.channelIds,
        mode: comSchema.mode,
        reprint: comSchema.reprint,
        tagStr: comSchema.tagStr,
        txt: comSchema.txt,
    }
})

const goverSchema = Immutable({
    // additionalProperties: false,
    type: "object",
    required: ["title", "channelIds", "txt", "dutyDepratment"],
    errorMessage: {
        type: "必须要有验证数据",
        required: {
            title: "必须填写标题",
            channelId: "栏目不能为空",
            txt: "文章内容不能为空",
            dutyDepratment: "责任部门不能为空"
        }
    },
    ...comSchema.if_reprint,
    properties: {
        title: comSchema.title,
        shortTitle: comSchema.shortTitle,
        channelIds: comSchema.channelIds,
        mode: comSchema.mode,
        reprint: comSchema.reprint,
        tagStr: comSchema.tagStr,
        txt: comSchema.txt,
        dutyDepratment: comSchema.dutyDepratment
    }
})

const imagesSchema = baseSchema.set("required", ["title", "channelIds", "pictureStr"]);
const videoSchema = baseSchema.set("required", ["title", "channelIds", "mediaPath", "mediaTime"]);
const audioSchema = baseSchema.set("required", ["title", "channelIds", "audioPath", "mediaTime"]);
const linkSchema = baseSchema.set("required", ["title", "channelIds", "link"]);
const modelId5 = baseSchema.set("required", ["name", "channelIds", "topicLogo"]);
const contentSchems = {
    modelId0: newsSchema,
    modelId1: imagesSchema,
    modelId2: videoSchema,
    modelId3: audioSchema,
    modelId4: linkSchema,
    modelId5: modelId5,
    modelId7: goverSchema
};
export default contentSchems;