export const list = [
    {
        path: "/cloud/content",
        name: "云稿库",
        isParent: true,
        iconCls: "icon-ic_folder_x",
        leaf: true, //只有一个节点
        redirect: "/cloud/content/list",
        routes: [
            {
                path: "/cloud/content/list",
                name: "列表"
            },
            {
                path: "/cloud/content/reprint",
                name: "转载"
            },
            {
                path: "/cloud/content/reprintMain",
                name: "转载(main)"
            }
        ]
    },
    {
        path: "/app",
        name: "移动端",
        iconCls: "icon-iconshouji",
        routes: [
            {
                path: "/app/count",
                name: "统计",
                isParent: true
            },
            {
                path: "/app/menuConfig",
                name: "菜单",
                isParent: true,
                redirect: "/app/menuConfig/list",
                routes: [
                    {
                        path: "/app/menuConfig/list",
                        name: "列表"
                    },
                    {
                        path: "/app/menuConfig/save",
                        name: "添加"
                    },
                    {
                        path: "/app/menuConfig/update",
                        name: "修改"
                    }
                ]
            },
            {
                path: "/app/push",
                name: "推送",
                isParent: true
            },
            {
                path: "/app/siteConfig",
                name: "设置",
                isParent: true
            }
        ]
    },
    {
        path: "/member",
        name: "会员",
        iconCls: "icon-yonghu",
        routes: [
            {
                path: "/group",
                name: "会员管理", //群组管理

                isParent: true,
                redirect: "/group/list",
                routes: [
                    {
                        path: "/group/list", //群组列表
                        name: "群组列表"
                    },
                    {
                        path: "/group/add", //群组添加
                        name: "群组添加"
                    },
                    {
                        path: "/group/edit", //群组修改
                        name: "群组修改"
                    }
                ]
            },
            {
                path: "/user",
                name: "会员成员", //组成员管理
                isParent: true,
                redirect: "/user/list",
                routes: [
                    {
                        path: "/user/list", //组成员列表
                        name: "成员列表"
                    },
                    {
                        path: "/user/save", //组成员添加
                        name: "成员添加",

                        hidden: true
                    },
                    {
                        path: "/user/update", //组成员添加
                        name: "成员修改",

                        hidden: true
                    }
                ]
            },
            {
                path: "/comment",
                name: "评论管理", //评论管理

                isParent: true,
                redirect: "/comment/list",
                routes: [
                    {
                        path: "/comment/list", //评论列表
                        name: "评论列表"
                    },
                    {
                        path: "/comment/itemList", //评论查看
                        name: "评论查看"
                    }
                ]
            },
            {
                path: "/guestbook",
                name: "留言管理",

                isParent: true,
                redirect: "/guestbook/list",
                routes: [
                    {
                        path: "/guestbook/list",
                        name: "留言列表"
                    },
                    {
                        path: "/guestbook/save",
                        name: "留言新增"
                    },
                    {
                        path: "/guestbookType/list",
                        name: "留言类型列表"
                    }
                ]
            },
            {
                path: "/job",
                name: "职位申请", //职位申请

                isParent: true,
                redirect: "/job/list",
                routes: [
                    {
                        path: "/job/list", //职位申请
                        name: "职位申请列表"
                    },
                    {
                        path: "/job/seek", //简历查看
                        name: "简历查看"
                    }
                ]
            }
        ]
    },
    {
        path: "/operate",

        iconCls: "icon-yunying",
        name: "运营", //
        meta: {
            isLink: true
        },
        routes: [
            {
                path: "/contentReuse",
                isParent: true,
                name: "内容复用" //内容复用
            },
            {
                path: "/ad",
                name: "广告管理", //广告管理

                isParent: true,
                redirect: "/ad/list",
                routes: [
                    {
                        path: "/ad/list", //广告管理
                        name: "广告列表"
                    },
                    {
                        path: "/ad/save", //广告添加
                        name: "广告添加"
                    },
                    {
                        path: "/ad/update", //广告修改
                        name: "广告修改"
                    },
                    {
                        path: "/adSpace/list", //广告版位列表
                        name: "广告版位列表"
                    }
                ]
            },
            {
                path: "/contentShare",
                name: "共享管理", //共享管理

                isParent: true,
                redirect: "/contentShare/list",
                routes: [
                    {
                        path: "/contentShare/list", //共享列表
                        name: "共享列表"
                    },
                    {
                        path: "/contentShare/view", //内容查看
                        name: "内容查看"
                    }
                ]
            },
            {
                path: "/contentBuy",
                name: "内容购买记录", //内容购买记录

                isParent: true,
                redirect: "/contentBuy/list",
                routes: [
                    {
                        path: "/contentBuy/list", ////内容购买记录列表
                        name: "内容购买记录列表"
                    }
                ]
            },
            {
                path: "/userAccount",
                name: "用户账户统计", //用户账户统计

                isParent: true,
                redirect: "/userAccount/list",
                routes: [
                    {
                        path: "/userAccount/list", ////用户账户统计列表
                        name: "用户账户统计列表"
                    }
                ]
            },
            {
                path: "/charge",
                name: "内容收费统计", //内容收费统计

                isParent: true,
                redirect: "/charge/list",
                routes: [
                    {
                        path: "/charge/list", ////内容收费统计列表
                        name: "内容收费统计列表"
                    },
                    {
                        path: "/charge/commission", ////2）平台佣金所得
                        name: "平台佣金所得"
                    }
                ]
            },
            {
                path: "/accountPay",
                name: "转账管理", //转账管理

                isParent: true,
                redirect: "/accountPay/list",
                routes: [
                    {
                        path: "/accountPay/list", ////转账管理列表
                        name: "转账列表"
                    }
                ]
            },
            {
                path: "/drawApply",
                name: "提现管理", //提现管理

                isParent: true,
                redirect: "/drawApply/list",
                routes: [
                    {
                        path: "/drawApply/list", ////提现管理列表
                        name: "提现列表"
                    },
                    {
                        path: "/drawApply/traAccount", ////转账
                        name: "转账"
                    }
                ]
            },
            {
                path: "/vote",
                name: "问卷管理", //问卷管理

                isParent: true,
                redirect: "/vote/list",
                routes: [
                    {
                        path: "/vote/list", //问卷调查列表
                        name: "问卷列表"
                    },
                    {
                        path: "/vote/save", //问卷新增
                        name: "问卷新增"
                    },
                    {
                        path: "/vote/update", //问卷修改
                        name: "问卷修改"
                    }
                ]
            }
        ]
    },
    {
        path: "/tools",
        name: "工具",

        iconCls: "icon-caozuo-fuzhugongneng",
        routes: [
            {
                path: "/collection",
                name: "采集管理",
                routes: [
                    {
                        path: "/collectionmanage",
                        name: "采集",

                        redirect: "/collectionmanage/list",
                        routes: [
                            {
                                path: "/collectionmanage/list",
                                name: "采集列表"
                            },
                            {
                                path: "/collectionmanage/save",
                                name: "采集添加"
                            },
                            {
                                path: "/collectionmanage/update",
                                name: "采集修改"
                            }
                        ]
                    },
                    {
                        path: "/collectionhistory",
                        name: "采集历史",
                        redirect: "/collectionhistory/list",
                        routes: [
                            {
                                path: "/collectionhistory/list",
                                name: "采集列表"
                            }
                        ]
                    },
                    {
                        path: "/collectionspeed",
                        name: "采集进度",

                        redirect: "/collectionspeed/view",
                        routes: [
                            {
                                path: "/collectionspeed/view",
                                name: "采集查看"
                            }
                        ]
                    }
                ]
            },
            {
                path: "/crontab",
                name: "定时任务", //定时任务

                isParent: true,
                redirect: "/crontab/list",
                routes: [
                    {
                        path: "/crontab/list", //定时任务列表
                        name: "定时任务列表"
                    },
                    {
                        path: "/crontab/save", //定时任务添加
                        name: "定时任务添加"
                    },
                    {
                        path: "/crontab/update", //定时任务修改
                        name: "定时任务修改"
                    }
                ]
            },
            {
                path: "/dimensioncode",
                name: "二维码生成", //二维码管理

                isParent: true,
                redirect: "/dimensioncode/create",
                routes: [
                    {
                        path: "/dimensioncode/create", ////二维码管理创建
                        name: "二维码管理创建"
                    }
                ]
            }
        ]
    },
    {
        path: "/extend",
        name: "扩展",

        iconCls: "icon-appstoreo",
        routes: [
            {
                path: "/fullTextSearch",
                isParent: true,
                name: "全文检索" //全文检索
            },
            {
                path: "/dictionary",
                name: "字典", //字典

                isParent: true,
                redirect: "/dictionary/list",
                routes: [
                    {
                        path: "/dictionary/list", ////字典列表
                        name: "字典列表"
                    }
                ]
            },
            {
                path: "/contentCycle",
                name: "内容回收站", //内容回收站

                isParent: true,
                redirect: "/contentCycle/list",
                routes: [
                    {
                        path: "/contentCycle/list", ////字典列表
                        name: "内容回收站列表"
                    }
                ]
            }
        ]
    },
    {
        path: "/dataCenter",
        name: "统计", //数据中心
        iconCls: "icon-icon-barschart",
        meta: {
            isLink: true
        },
        routes: [
            {
                path: "/traffic", //流量分析
                name: "流量统计",

                redirect: "/traffic/trend",
                routes: [
                    {
                        path: "/traffic/trend", //趋势分析
                        name: "趋势分析"
                    },
                    {
                        path: "/traffic/channel", //栏目访问量排行
                        name: "栏目访问量排行"
                    }
                ]
            },
            {
                path: "/sourceanalysis", //来源分析
                name: "来源分析",

                routes: [
                    {
                        path: "/sourceanalysis/class", //来源分类
                        name: "来源分类"
                    },
                    {
                        path: "/sourceanalysis/engin", //搜索引擎
                        name: "搜索引擎"
                    },
                    {
                        path: "/sourceanalysis/domain", //来访域名
                        name: "来访域名"
                    },
                    {
                        path: "/sourceanalysis/city", //来访域名
                        name: "来访地区"
                    },
                    {
                        path: "/sourceanalysis/keywords", //搜索词
                        name: "搜索词"
                    }
                ]
            },
            {
                path: "/surveyedanalysis", //受访分析
                name: "受访分析",

                routes: [
                    {
                        path: "/surveyedanalysis/surveyed", //受访页面
                        name: "受访页面"
                    },
                    {
                        path: "/surveyedanalysis/index", //入口页面
                        name: "入口页面"
                    }
                ]
            },
            {
                path: "/loyalty", //忠诚度
                name: "忠诚度",
                isParent: true
            },
            {
                path: "/siteProfile", //网站概况
                name: "网站概况",
                routes: [
                    {
                        path: "/siteProfile/contentnum", //内容发布数
                        name: "内容发布数"
                    },
                    {
                        path: "/siteProfile/worknum", //工作量
                        name: "工作量"
                    },
                    {
                        path: "/siteProfile/commentnum", //评论数
                        name: "评论数"
                    },
                    {
                        path: "/siteProfile/leavenum", //留言数
                        name: "留言数"
                    },
                    {
                        path: "/siteProfile/usernum", //会员注册数
                        name: "会员注册数"
                    }
                ]
            }
        ]
    },
    {
        path: "/interface",
        name: "资源",
        iconCls: "icon-icon-windowso",
        routes: [
            {
                path: "/template",
                name: "模板管理",
                isParent: true,
                redirect: "/templatelist",
                routes: [
                    {
                        path: "/templatelist",
                        name: "模板列表"
                    },
                    {
                        path: "/templateadd",
                        name: "模板添加"
                    },
                    {
                        path: "/templateedit",
                        name: "模板修改"
                    },
                    {
                        path: "/templaterename",
                        name: "模板重命名"
                    },
                    {
                        path: "/templatesetting",
                        name: "模板设置"
                    }
                ]
            },
            {
                path: "/interface/resource",
                name: "资源管理",
                isParent: true,
                redirect: "/resource",
                routes: [
                    {
                        path: "/resource",
                        name: "资源",
                        isParent: true,
                        redirect: "/resourcelist",
                        routes: [
                            {
                                path: "/resourcelist",
                                name: "资源列表"
                            },
                            {
                                path: "/resourceadd",
                                meta: {
                                    role: "resourceadd"
                                },
                                name: "资源添加"
                            },
                            {
                                path: "/resourceedit",
                                name: "资源修改"
                            },
                            {
                                path: "/resourcerename",
                                name: "资源重命名"
                            }
                        ]
                    }
                ]
            },
            {
                path: "/file",
                name: "附件管理", //附件管理
                isParent: true,
                redirect: "/file/list",
                routes: [
                    {
                        path: "/file/list", //附件管理
                        name: "附件管理"
                    }
                ]
            }
        ]
    },
    {
        path: "/config",
        iconCls: "icon-icon_setting",
        name: "设置", //
        meta: {
            isLink: true
        },
        routes: [
            {
                path: "/siteConfig",
                isParent: true,
                name: "站点设置" //站点设置
            },
            {
                path: "/vmsDataMng/config",
                name: "vms配置",

                isParent: true
            },
            {
                path: "/ftp",
                name: "FTP管理", //ftp管理
                isParent: true,
                redirect: "/ftp/list",
                routes: [
                    {
                        path: "/ftp/list",
                        name: "FTP列表" //ftp管理列表
                    },
                    {
                        path: "/ftp/add",
                        name: "FTP添加" //ftp管理添加
                    },
                    {
                        path: "/ftp/edit",
                        name: "FTP修改" //ftp管理修改
                    }
                ]
            },
            {
                path: "/oss",
                name: "OSS管理", //oss管理
                isParent: true,
                redirect: "/oss/list",
                routes: [
                    {
                        path: "/oss/list",
                        name: "OSS列表" //oss管理列表
                    },
                    {
                        path: "/oss/add",
                        name: "OSS添加" //oss管理添加
                    },
                    {
                        path: "/oss/edit",
                        name: "OSS修改" //oss管理修改
                    }
                ]
            },
            {
                path: "/type",
                name: "内容类型", //内容类型
                isParent: true,
                redirect: "/type/list",
                routes: [
                    {
                        path: "/type/list",
                        name: "内容类型列表" //内容类型列表
                    },
                    {
                        path: "/type/add",
                        name: "内容类型添加" //内容类型添加
                    },
                    {
                        path: "/type/edit",
                        name: "内容类型修改" //内容类型修改
                    }
                ]
            },

            {
                path: "/model",
                name: "模型管理", //模型管理
                isParent: true,
                redirect: "/model/list",
                routes: [
                    {
                        path: "/model/list",
                        name: "模型列表" //模型管理列表
                    },
                    {
                        path: "/model/add",
                        name: "模型添加" //模型管理添加
                    },
                    {
                        path: "/model/edit",
                        name: "模型修改" //模型管理修改
                    },
                    {
                        path: "/channelModel/list",
                        name: "栏目模型字段列表" //栏目模型
                    },
                    {
                        path: "/channelModel/update",
                        name: "栏目模型字段修改" //栏目模型项修改
                    },
                    {
                        path: "/channelModel/save",
                        name: "栏目模型字段添加" //栏目模型项添加
                    },
                    {
                        path: "/contentModel/list",
                        name: "内容模型字段模型" //内容模型
                    },
                    {
                        path: "/contentModel/update",
                        name: "内容模型字段修改" //内容模型项修改
                    },
                    {
                        path: "/contentModel/save",
                        name: "内容模型字段添加" //内容模型项添加
                    }
                ]
            },
            {
                path: "/modelLocal",
                name: "模型管理(本站)", //模型管理
                isParent: true,
                redirect: "/modelLocal/list",
                routes: [
                    {
                        path: "/modelLocal/list",
                        name: "模型列表" //模型管理列表
                    },
                    {
                        path: "/modelLocal/add",
                        name: "模型添加" //模型管理添加
                    },
                    {
                        path: "/modelLocal/edit",
                        name: "模型修改" //模型管理修改
                    },
                    {
                        path: "/channelModelLocal/list",
                        name: "栏目模型字段列表" //栏目模型
                    },
                    {
                        path: "/channelModelLocal/update",
                        name: "栏目模型字段修改" //栏目模型项修改
                    },
                    {
                        path: "/channelModelLocal/save",
                        name: "栏目模型字段添加" //栏目模型项添加
                    },
                    {
                        path: "/contentModelLocal/list",
                        name: "内容模型字段模型" //内容模型
                    },
                    {
                        path: "/contentModelLocal/update",
                        name: "内容模型字段修改" //内容模型项修改
                    },
                    {
                        path: "/contentModelLocal/save",
                        name: "内容模型字段添加" //内容模型项添加
                    }
                ]
            },
            {
                path: "/globel",
                name: "全局设置", //全局设置
                routes: [
                    {
                        path: "/globel/systemUpdate",
                        name: "系统设置" //全局设置-系统设置
                    },
                    {
                        path: "/globel/loginUpdate",
                        name: "登录设置" //全局设置-登录设置
                    },
                    {
                        path: "/globel/memberUpdate",
                        name: "会员设置" //全局设置-会员设置
                    },
                    {
                        path: "/globel/registerModel",
                        name: "会员注册管理", //全局设置-会员注册管理
                        redirect: "/globel/registerModel/list",
                        routes: [
                            {
                                path: "/globel/registerModel/list",
                                name: "会员注册列表" //全局设置-会员注册管理列表
                            },
                            {
                                path: "/globel/registerModel/add",
                                name: "会员注册添加" //全局设置-会员注册管理添加
                            },
                            {
                                path: "/globel/registerModel/edit",
                                name: "会员注册修改" //全局设置-会员注册管理修改
                            }
                        ]
                    },
                    {
                        path: "/globel/markUpdate",
                        name: "水印设置" //全局设置-水印设置
                    },
                    {
                        path: "/globel/firewallUpdate",
                        name: "防火墙设置" //全局设置-防火墙设置
                    },
                    {
                        path: "/globel/attrUpdate",
                        name: "其他设置" //全局设置-其他设置
                    },
                    {
                        path: "/globel/contentUpdate",
                        name: "内容佣金设置" //全局设置-内容佣金设置
                    },
                    {
                        path: "/site",
                        isParent: true,
                        name: "站点管理", //站点管理
                        redirect: "/site/list",
                        routes: [
                            {
                                path: "/site/list",
                                name: "站点列表" //站点管理列表
                            },
                            {
                                path: "/site/add",
                                name: "站点添加" //站点管理添加
                            },
                            {
                                path: "/site/edit",
                                name: "站点修改" //站点管理修改
                            }
                        ]
                    }
                ]
            },
            {
                path: "/globel/companyUpdate",
                name: "机构信息设置", //全局设置-机构信息设置
                isParent: true
            },
            {
                path: "/auth",
                name: "权限",
                routes: [
                    {
                        path: "/role", //角色管理
                        name: "角色管理",
                        isParent: true,
                        redirect: "/role/list",
                        routes: [
                            {
                                path: "/role/list", //角色管理
                                name: "角色管理"
                            },
                            {
                                path: "/role/save", //成员添加
                                name: "角色添加",

                                hidden: true
                            },
                            {
                                path: "/role/update", //成员修改
                                name: "角色修改",

                                hidden: true
                            },
                            {
                                path: "/role/members", //成员列表
                                name: "成员列表",

                                hidden: true
                            }
                        ]
                    },
                    {
                        path: "/account",
                        name: "账户绑定", //会员管理
                        isParent: true,
                        redirect: "/account/list",
                        routes: [
                            {
                                path: "/account/list", //会员列表
                                name: "列表"
                            }
                        ]
                    },
                    {
                        path: "/adminGlobal",
                        name: "管理员(全站)", //管理员(全站)
                        isParent: true,
                        redirect: "/adminGlobal/list",
                        routes: [
                            {
                                path: "/adminGlobal/list", //管理员列表(全站)
                                name: "管理员(全站)列表"
                            },
                            {
                                path: "/adminGlobal/edit", //管理员编辑页(全站)
                                name: "管理员(全站)编辑",

                                hidden: true
                            },
                            {
                                path: "/adminGlobal/add", //管理员添加页(全站)
                                name: "管理员(全站)添加",

                                hidden: true
                            }
                        ]
                    },
                    {
                        path: "/adminGlocal",
                        name: "管理员(本站)", //管理员(本站)
                        isParent: true,
                        redirect: "/adminGlocal/list",
                        routes: [
                            {
                                path: "/adminGlocal/list", //管理员列表(本站)
                                name: "管理员(本站)列表"
                            },
                            {
                                path: "/adminGlocal/edit", //管理员编辑页(本站)
                                name: "管理员(本站)修改"
                            },
                            {
                                path: "/adminGlocal/add", //管理员添加页(本站)
                                name: "管理员(本站)添加"
                            }
                        ]
                    },
                    {
                        path: "/log",
                        name: "操作日志", //操作日志
                        isParent: true,
                        redirect: "/log/list",
                        routes: [
                            {
                                path: "/log/list", //日志列表
                                name: "日志列表"
                            }
                        ]
                    },
                    {
                        path: "/department",
                        name: "部门管理", //部门管理
                        isParent: true,
                        redirect: "/department/list",
                        routes: [
                            {
                                path: "/department/tpm",
                                name: "部门模板", //部门管理

                                routes: [
                                    {
                                        path: "/department/list", //部门列表
                                        name: "部门列表"
                                    },
                                    {
                                        path: "/department/add", //部门添加
                                        name: "部门添加"
                                    },
                                    {
                                        path: "/department/edit", //部门添加
                                        name: "部门修改"
                                    },
                                    {
                                        path: "/departmentMember/list", //部门添加
                                        name: "部门成员列表"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: "/channel", //栏目
                name: "栏目",
                redirect: "/channel/list",
                isParent: true,
                routes: [
                    {
                        path: "/channel/list",
                        name: "栏目列表", //栏目列表

                        hidden: true
                    },
                    {
                        path: "/channel/save",
                        name: "栏目添加", //栏目添加

                        hidden: true
                    },
                    {
                        path: "/channel/update",
                        name: "栏目修改", //栏目修改

                        hidden: true
                    },
                    {
                        path: "/channel/copy",
                        name: "栏目复制", //栏目复制

                        hidden: true
                    }
                ]
            },
            {
                path: "/workflow",
                name: "工作流", //工作流
                isParent: true,
                redirect: "/workflow/list",
                routes: [
                    {
                        path: "/workflow/list", //工作流列表
                        name: "工作流列表"
                    },
                    {
                        path: "/workflow/save", //工作流添加
                        name: "工作流添加"
                    },
                    {
                        path: "/workflow/update", //工作流修改
                        name: "工作流修改"
                    }
                ]
            },
            {
                path: "/link",
                name: "友情链接", //友情链接
                isParent: true,
                redirect: "/link/list",
                routes: [
                    {
                        path: "/link/list", //友情链接列表
                        name: "友情链接列表"
                    },
                    {
                        path: "/link/save", //友情链接添加
                        name: "友情链接添加"
                    },
                    {
                        path: "/link/update", //友情链接修改
                        name: "友情链接修改"
                    },
                    {
                        path: "/link/typeList", //友情链接类别列表
                        name: "类别列表"
                    }
                ]
            },
            {
                path: "/db",
                name: "数据备份", //数据备份
                routes: [
                    {
                        path: "/backups",
                        name: "备份",
                        redirect: "/backups/list",
                        routes: [
                            {
                                path: "/backups/list",
                                name: "备份列表"
                            },
                            {
                                path: "/backups/seek",
                                name: "表字段列表"
                            }
                        ]
                    },
                    {
                        path: "/revert",
                        name: "恢复"
                    },
                    {
                        path: "/backupsDir",
                        name: "备份目录",
                        redirect: "/backupsDir/list",
                        routes: [
                            {
                                path: "/backupsDir/list",
                                name: "备份目录列表"
                            },
                            {
                                path: "/backupsDir/edit",
                                name: "备份目录重命名"
                            }
                        ]
                    }
                ]
            },
            {
                path: "/weixin",
                name: "公众号设置", //公众号设置
                routes: [
                    {
                        path: "/weixinConfig", //公众号设置
                        name: "公众号设置"
                    },
                    {
                        path: "/weixinMenu", //自定义菜单
                        name: "自定义菜单",
                        redirect: "/weixinMenu/list",
                        routes: [
                            {
                                path: "/weixinMenu/list", ////自定义菜单列表
                                name: "自定义菜单列表"
                            },
                            {
                                path: "/weixinMenu/add", ////自定义菜单添加
                                name: "自定义菜单添加"
                            },
                            {
                                path: "/weixinMenu/edit", ////自定义菜单修改
                                name: "自定义菜单修改"
                            },
                            {
                                path: "/weixinMenu/child", ////自定义菜单二级菜单
                                name: "自定义菜单二级菜单",
                                redirect: "/weixinMenu/child/list",
                                routes: [
                                    {
                                        path: "/weixinMenu/child/list", ////自定义菜单列表
                                        name: "二级菜单列表"
                                    },
                                    {
                                        path: "/weixinMenu/child/add", ////自定义菜单添加
                                        name: "二级菜单添加"
                                    },
                                    {
                                        path: "/weixinMenu/child/edit", ////自定义菜单修改
                                        name: "二级菜单修改"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: "/weixinMessage", //自定义回复
                        name: "自定义回复",
                        redirect: "/weixinMessage/list",
                        routes: [
                            {
                                path: "/weixinMessage/list", ////自定义菜单列表
                                name: "自定义回复列表"
                            },
                            {
                                path: "/weixinMessage/add", ////自定义菜单添加
                                name: "自定义回复添加"
                            },
                            {
                                path: "/weixinMessage/edit", ////自定义菜单修改
                                name: "自定义回复修改"
                            }
                        ]
                    },
                    {
                        path: "/weixinMessageDef", //默认回复
                        name: "默认回复"
                    }
                ]
            },
            {
                path: "/statically",
                name: "页面静态化", //页面静态化
                routes: [
                    {
                        path: "/statically/indexStatic", //首页静态化
                        name: "首页静态化"
                    },
                    {
                        path: "/statically/channelStatic", //栏目静态化
                        name: "栏目静态化"
                    },
                    {
                        path: "/statically/contentStatic", //内容静态化
                        name: "内容静态化"
                    }
                ]
            },
            {
                path: "/scoregroup",
                name: "评分组管理", //评分组管理
                isParent: true,
                redirect: "/scoregroup/list",
                routes: [
                    {
                        path: "/scoregroup/list", ////评分组管理列表
                        name: "评分组列表"
                    },
                    {
                        path: "/scoregroup/add", ////评分组管理添加
                        name: "评分组添加"
                    },
                    {
                        path: "/scoregroup/edit", ////评分组管理修改
                        name: "评分组修改"
                    },
                    {
                        path: "/scoregroup/scoreitem/list", ////评分项管理
                        name: "评分项管理",
                        redirect: "/scoregroup/scoreitem/list",
                        routes: [
                            {
                                path: "/scoregroup/scoreitem/list", ////评分项管理列表
                                name: "评分项列表"
                            },
                            {
                                path: "/scoregroup/scoreitem/add", ////评分项管理添加
                                name: "评分项添加"
                            },
                            {
                                path: "/scoregroup/scoreitem/edit", ////评分项管理修改
                                name: "评分项修改"
                            }
                        ]
                    }
                ]
            },
            {
                path: "/word",
                name: "词汇管理", //词汇管理
                routes: [
                    {
                        path: "/tag", ////tag管理
                        name: "tag管理",
                        redirect: "/tag/list",
                        routes: [
                            {
                                path: "/tag/list", ////tag管理列表
                                name: "tag列表"
                            }
                        ]
                    },
                    {
                        path: "/sensitivity/global", ////敏感词管理
                        name: "敏感词管理(全站)",
                        redirect: "/sensitivity/global/list",
                        routes: [
                            {
                                path: "/sensitivity/global/list", ////敏感词管理列表
                                name: "列表"
                            }
                        ]
                    },
                    {
                        path: "/sensitivity/glolal", ////敏感词管理
                        name: "敏感词管理(本站)",
                        redirect: "/sensitivity/glolal/list",
                        routes: [
                            {
                                path: "/sensitivity/glolal/list", ////敏感词管理列表
                                name: "列表"
                            }
                        ]
                    },
                    {
                        path: "/keyword", ////关键词管理
                        name: "关键词管理",
                        redirect: "/keyword/list",
                        routes: [
                            {
                                path: "/keyword/list", ////敏感词管理列表
                                name: "关键词列表"
                            }
                        ]
                    },
                    {
                        path: "/origin", ////来源管理
                        name: "来源管理",
                        redirect: "/origin/list",
                        routes: [
                            {
                                path: "/origin/list", ////来源管理列表
                                name: "来源列表"
                            }
                        ]
                    },
                    {
                        path: "/searchwords", ////热词管理
                        name: "热词管理",
                        redirect: "/searchwords/list",
                        routes: [
                            {
                                path: "/searchwords/list", ////热词管理列表
                                name: "热词列表"
                            }
                        ]
                    }
                ]
            },
            {
                path: "/apiManage",
                name: "接口管理", //接口管理
                routes: [
                    {
                        path: "/apiManage/apiUpdate",
                        name: "接口设置" //接口管理-接口设置
                    },
                    {
                        path: "/apiManage/apiSSOupdate",
                        name: "单点登录设置" //接口管理-sso设置
                    },
                    {
                        path: "/apiManage/apiMan",
                        name: "接口管理", //接口管理-接口管理
                        redirect: "/apiManage/apiMan/list",
                        routes: [
                            {
                                path: "/apiManage/apiMan/list",
                                name: "接口列表" //接口管理-接口管理列表
                            },
                            {
                                path: "/apiManage/apiMan/add",
                                name: "接口添加" //接口管理-接口管理添加
                            },
                            {
                                path: "/apiManage/apiMan/edit",
                                name: "接口修改" //接口管理-接口管理修改
                            }
                        ]
                    },
                    {
                        path: "/apiManage/apiUserMan",
                        name: "接口用户管理", //接口管理-接口用户管理
                        redirect: "/apiManage/apiUserMan/list",
                        routes: [
                            {
                                path: "/apiManage/apiUserMan/list",
                                name: "接口用户列表" //接口管理-接口用户管理列表
                            },
                            {
                                path: "/apiManage/apiUserMan/add",
                                name: "接口用户添加" //接口管理-接口用户管理添加
                            },
                            {
                                path: "/apiManage/apiUserMan/edit",
                                name: "接口用户修改" //接口管理-接口用户管理修改
                            }
                        ]
                    },
                    {
                        path: "/apiManage/apiUseRecord",
                        name: "接口使用记录", //接口管理-接口使用记录
                        redirect: "/apiManage/apiUseRecord/list",
                        routes: [
                            {
                                path: "/apiManage/apiUseRecord/list",
                                name: "接口使用列表" //接口管理-接口使用记录列表
                            }
                        ]
                    },
                    {
                        path: "/apiManage/apiRecord",
                        name: "api接口记录", //接口管理-api接口记录
                        redirect: "/apiManage/apiRecord/list",
                        routes: [
                            {
                                path: "/apiManage/apiRecord/list",
                                name: "api接口记录列表" //接口管理-api接口记录列表
                            }
                        ]
                    },
                    {
                        path: "/apiManage/apiInfo",
                        name: "api接口管理", //接口管理-接口使用记录
                        redirect: "/apiManage/apiInfo/list",
                        routes: [
                            {
                                path: "/apiManage/apiInfo/list",
                                name: "api接口列表" //接口管理-api接口管理列表
                            },
                            {
                                path: "/apiManage/apiInfo/add",
                                name: "api接口添加" //接口管理-api接口管理添加
                            },
                            {
                                path: "/apiManage/apiInfo/edit",
                                name: "api接口修改" //接口管理-api接口管理修改
                            }
                        ]
                    },
                    {
                        path: "/apiManage/apiAccount",
                        name: "api接口账户管理", //接口管理-api接口账户管理
                        redirect: "/apiManage/apiAccount/list",
                        routes: [
                            {
                                path: "/apiManage/apiAccount/list",
                                name: "api接口账户列表" //接口管理-api接口账户管理列表
                            },
                            {
                                path: "/apiManage/apiAccount/add",
                                name: "api接口账户添加" //接口管理-api接口账户管理添加
                            },
                            {
                                path: "/apiManage/apiAccount/edit",
                                name: "api接口账户查看" //接口管理-api接口账户管理查看
                            },
                            {
                                path: "/apiManage/apiAccount/update",
                                name: "独立密码修改" //接口管理-api接口账户管理查看
                            }
                        ]
                    }
                ]
            },
            {
                path: "/cloud/config",
                name: "云稿库配置",
                isParent: true,
                redirect: "/cloud/config/list",
                routes: [
                    {
                        path: "/cloud/config/list",
                        name: "列表"
                    },
                    {
                        path: "/cloud/config/save",
                        name: "添加"
                    },
                    {
                        path: "/cloud/config/edit",
                        name: "修改"
                    }
                ]
            }
        ]
    },
    {
        path: "/app1",
        name: "APP中心",
        iconCls: "icon-APPshouyetubiao-ding",
        routes: [
            {
                path: "/app/config",
                name: "APP配置", //个人中心
                routes: [
                    {
                        path: "/app/classify",
                        name: "频道分类设置",
                        redirect: "/app/classify/list",
                        routes: [
                            {
                                path: "/app/classify/list",
                                name: "列表"
                            },
                            {
                                path: "/app/classify/save",
                                name: "添加"
                            },
                            {
                                path: "/app/classify/update",
                                name: "修改"
                            }
                        ]
                    },
                    {
                        path: "/app/channelConfig",
                        name: "频道信息管理",
                        redirect: "/app/channelConfig/list",
                        routes: [
                            {
                                path: "/app/channelConfig/list",
                                name: "列表"
                            },
                            {
                                path: "/app/channelConfig/save",
                                name: "添加"
                            },
                            {
                                path: "/app/channelConfig/update",
                                name: "修改"
                            }
                        ]
                    }
                ]
            },
            {
                path: "/personal",
                name: "个人中心", //个人中心
                //isParent: true,
                routes: [
                    {
                        path: "/personal/item",
                        name: "条目",
                        isParent: true,
                        redirect: "/personal/item/list",
                        routes: [
                            {
                                path: "/personal/item/list",
                                name: "条目列表"
                            },
                            {
                                path: "/personal/item/save",
                                name: "条目添加"
                            },
                            {
                                path: "/personal/item/update",
                                name: "条目修改"
                            }
                        ]
                    },
                    {
                        path: "/personal/classify",
                        name: "分类",
                        isParent: true,
                        redirect: "/personal/classify/list",
                        routes: [
                            {
                                path: "/personal/classify/list",
                                name: "列表"
                            },
                            {
                                path: "/personal/classify/save",
                                name: "添加"
                            },
                            {
                                path: "/personal/classify/update",
                                name: "修改"
                            }
                        ]
                    }
                ]
            },
            {
                path: "/service",
                name: "服务管理",
                //isParent: true,
                routes: [
                    {
                        path: "/service/homeService", //首页服务
                        name: "首页服务",
                        redirect: "/service/homeService/list",
                        routes: [
                            {
                                path: "/service/homeService/list", //首页服务列表
                                name: "首页服务列表"
                            },
                            {
                                path: "/service/homeService/save", //首页服务保存
                                name: "首页服务保存"
                            },
                            {
                                path: "/service/homeService/update", //首页服务修改
                                name: "首页服务修改"
                            }
                        ]
                    },
                    {
                        path: "/service/serviceClassify",
                        name: "服务分类",
                        redirect: "/service/serviceClassify/list",
                        routes: [
                            {
                                path: "/service/serviceClassify/list",
                                name: "服务分类列表"
                            },
                            {
                                path: "/service/serviceClassify/save",
                                name: "服务分类添加"
                            },
                            {
                                path: "/service/serviceClassify/update",
                                name: "服务分类修改"
                            }
                        ]
                    },
                    {
                        path: "/service/manager",
                        name: "服务",
                        redirect: "/service/manager/list",
                        routes: [
                            {
                                path: "/service/manager/list",
                                name: "列表"
                            },
                            {
                                path: "/service/manager/save",
                                name: "保存"
                            },
                            {
                                path: "/service/manager/update",
                                name: "修改"
                            }
                        ]
                    }
                ]
            },
            {
                path: "/subscription",
                name: "订阅号管理",
                routes: [
                    {
                        path: "/subscription/detail", //订阅号
                        name: "订阅号",
                        isParent: true,
                        routes: [
                            {
                                path: "/subscription/detail/list", //订阅号列表
                                name: "订阅号列表"
                            },
                            {
                                path: "/subscription/detail/save", //订阅号保存
                                name: "订阅号保存"
                            },
                            {
                                path: "/subscription/detail/update", //订阅号修改
                                name: "订阅号修改"
                            }
                        ]
                    },
                    {
                        path: "/subscription/classify",
                        name: "订阅号分类",
                        isParent: true,
                        routes: [
                            {
                                path: "/subscription/classify/list",
                                name: "订阅号分类列表"
                            },
                            {
                                path: "/subscription/classify/save",
                                name: "订阅号分类添加"
                            },
                            {
                                path: "/subscription/classify/update",
                                name: "订阅号分类修改"
                            }
                        ]
                    }
                ]
            },
            {
                path: "/appDataMng",
                name: "数据管理",
                //isParent: true,
                routes: [
                    {
                        path: "/appDataMng/feedbackMng",
                        name: "意见反馈",
                        isParent: true,
                        leaf: true,
                        redirect: "/appDataMng/feedbackMng/item/list",
                        routes: [
                            {
                                path: "/appDataMng/feedbackMng/item/list",
                                name: "意见列表"
                            },
                            {
                                path: "/appDataMng/feedbackMng/item/update",
                                name: "意见查看"
                            }
                        ]
                    },
                    {
                        path: "/appDataMng/appBanner",
                        name: "开机广告"
                    },
                    {
                        path: "/appDataMng/about",
                        name: "关于我们"
                    },
                    {
                        path: "/appDataMng/contact",
                        name: "联系方式"
                    },
                    {
                        path: "/appDataMng/help",
                        name: "帮助",
                        redirect: "/appDataMng/help/list",
                        routes: [
                            {
                                path: "/appDataMng/help/list",
                                name: "列表"
                            },
                            {
                                path: "/appDataMng/help/save",
                                name: "保存"
                            },
                            {
                                path: "/appDataMng/help/update",
                                name: "修改"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/extension",
        name: "应用管理",
        iconCls: "icon-pingtai",
        routes: [
            {
                path: "/extension/ott",
                name: "智慧家园",
                routes: [
                    {
                        path: "/extension/ott/dictionary",
                        name: "字典管理"
                    },
                    {
                        path: "/extension/ott/duty",
                        name: "值班管理",
                        isParent: true,
                        redirect: "/extension/ott/duty/dutyList",
                        routes: [
                            {
                                path: "/extension/ott/duty/dutyList",
                                name: "列表"
                            },
                            {
                                path: "/extension/ott/duty/dutySave",
                                name: "添加"
                            },
                            {
                                path: "/extension/ott/duty/dutyEdit",
                                name: "修改"
                            }
                        ]
                    },
                    {
                        path: "/extension/ott/facilityType",
                        name: "监控分类",
                        redirect: "/extension/ott/facilityType/list",
                        routes: [
                            {
                                path: "/extension/ott/facilityType/list",
                                name: "列表"
                            },
                            {
                                path: "/extension/ott/facilityType/edit",
                                name: "保存"
                            }
                        ]
                    },
                    {
                        path: "/extension/ott/facilityInfo",
                        name: "监控列表",
                        redirect: "/extension/ott/facility/infoList",
                        routes: [
                            {
                                path: "/extension/ott/facility/infoList",
                                name: "列表"
                            },
                            {
                                path: "/extension/ott/facility/infoEdit",
                                name: "保存"
                            }
                        ]
                    },
                    {
                        path: "/extension/ott/address/siteAddrList",
                        name: "站点地址",

                        isParent: true,
                        leaf: true
                    },
                    {
                        path: "/extension/ott/rootAddr",
                        name: "BOSS根地址"
                    },
                    {
                        path: "/extension/ott/whladdr",
                        name: "BOSS地址库"
                    },
                    {
                        path: "/extension/ott/user",
                        name: "BOSS用户库",
                        redirect: "/extension/ott/user/list",
                        routes: [
                            {
                                name: "列表",
                                path: "/extension/ott/user/list"
                            },
                            {
                                name: "业务",
                                path: "/extension/ott/user/business"
                            }
                        ]
                    },
                    {
                        path: "/extension/ott/synTask",
                        name: "同步任务"
                    }
                ]
            }
        ]
    }
];

export default list;
