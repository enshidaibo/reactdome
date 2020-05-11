/**
 * 对内容列表进行排序
 */
export const sortNumber = (a, b) => {
    if ((a.top && b.top) || (!a.top && !b.top)) {
        return b.sort - a.sort;
    }
    if (a.top) {
        return -1;
    }
    if (b.top) {
        return 1;
    }
};

export const sortList = list => {
    list = list.sort(sortNumber);
    let sorts = list.map(d => {
        return d.sort;
    });
    return { list, sorts, isSort: true };
};
