/**
 * 获取url 参数
 */
import qs from "qs";

const getHashQuery = (name) => {
    let hash = window.location.href.split("#")[1];
    hash = hash && hash.split("?")[1];
    let query = {};
    if (hash) {
        query = qs.parse(hash);
    }
    return name ? query[name] : query
}
export default getHashQuery