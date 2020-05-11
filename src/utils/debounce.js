export const delay = async ms => new Promise(resolve => setTimeout(resolve, ms));

const debounceAsync = (method, delay = 100) => (...arg) => {
    let timer = false;
    return async () => {
        if (timer) {
            return
        }
        timer = true
        await method(...arg)
        setTimeout(() => {
            timer = false
        }, delay);
    }
}

export default debounceAsync