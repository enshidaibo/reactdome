import { useReducer } from "react";

const useData = (initValue = {}) => {
    const fetchReducer = (state, data) => {
        return Object.assign({}, state, data);
    }
    return useReducer(fetchReducer, initValue);
}

export default useData