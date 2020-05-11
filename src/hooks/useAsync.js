/**
 * 异步请求
 */
import { useReducer, useEffect } from "react";

const useAsync = (fc, params = [], cb) => {
    const fetchReducer = (state, data) => Object.assign({}, state, data)
    const [state, setState] = useReducer(fetchReducer, {
        loading: false,
        error: false,
        data: null
    });
    const fetch = async () => {
        setState({ loading: true, error: false })
        let res = await fc()
        if (res.success) {
            setState({ loading: false, data: res.body })
        } else {
            setState({ loading: false, error: true })
        }
        cb && cb(res)
    }
    useEffect(() => { fetch() }, params)
    return { ...state, fetch }
}

export default useAsync