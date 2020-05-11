/**
 * 管理员管理接口
 */
/* global app */

const { yssjfetch } = app
const UumsUrl = "https://yssjgateway.estv.com.cn/uums/v1/api/";
// const UumsUrl = "http://10.114.20.202:8088/uums/v1/api/";

export const useIsExitByPhone = async (phone) => yssjfetch.get(UumsUrl + 'user/queryByPhone', { params: { phone } });