import { useState, useEffect } from 'react';

const useGetArrayData = (uischem = {}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            if (!uischem.uiData) {
                return
            }
            if (typeof uischem.uiData === 'function') {
                let res = await uischem.uiData()
                setData(res.data)
            } else {
                setData(uischem.uiData)
            }
        }
        getData()
    }, [uischem.uiData])
    return data
}

export default useGetArrayData