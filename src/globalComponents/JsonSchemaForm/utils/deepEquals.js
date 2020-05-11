const isArguments = object => {
    return Object.prototype.toString.call(object) === "[object Arguments]";
}

const deepEquals = (a, b, ca = [], cb = []) => {
    if (a === b) {
        return true;
    } else if (typeof a === "function" || typeof b === "function") {
        return true;
    } else if (typeof a !== "object" || typeof b !== "object") {
        return false;
    } else if (a === null || b === null) {
        return false;
    } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    } else if (a instanceof RegExp && b instanceof RegExp) {
        return (
            a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.lastIndex === b.lastIndex && a.ignoreCase === b.ignoreCase
        );
    } else if (isArguments(a) || isArguments(b)) {
        if (!(isArguments(a) && isArguments(b))) {
            return false;
        }
        let { slice } = Array.prototype;
        return deepEquals(slice.call(a), slice.call(b), ca, cb);
    } else {
        if (a.constructor !== b.constructor) {
            return false;
        }
        let ka = Object.keys(a);
        let kb = Object.keys(b);
        // don't bother with stack acrobatics if there's nothing there
        if (ka.length === 0 && kb.length === 0) {
            return true;
        }
        if (ka.length !== kb.length) {
            return false;
        }
        let cal = ca.length;
        while (cal > 0) {
            if (ca[cal] === a) {
                return cb[cal] === b;
            }
            cal -= 1
        }
        ca.push(a);
        cb.push(b);
        ka.sort();
        kb.sort();
        for (let j = ka.length - 1; j >= 0; j -= 1) {
            if (ka[j] !== kb[j]) {
                return false;
            }
        }
        let key;
        for (let k = ka.length - 1; k >= 0; k -= 1) {
            key = ka[k];
            if (!deepEquals(a[key], b[key], ca, cb)) {
                return false;
            }
        }
        ca.pop();
        cb.pop();
        return true;
    }
}

export default deepEquals