/**
 * 导出数据
 * @param {表单头} header
 * @param {表单json数据} data
 * @param {文件名} filename
 */
const downloadcsv = (header, data, filename = "download") => {
    let headerTitle = header.map(d => {
        return d.title;
    });
    let csvData = [headerTitle];
    data.map(d => {
        let item = header.map(t => {
            return d[t.name];
        });
        csvData.push(item);
    });
    let csvRows = [];
    csvData.map(t => {
        csvRows.push(t.join(","));
    });
    let csvString = csvRows.join("\n");
    let url = downloadString(csvString);
    downloadLink(url, filename);
};

/**
 * 将文件数据转化为下载链接
 * @param {文件数据字符串} csvString
 */
const downloadString = csvString => {
    let BOM = "\uFEFF";
    csvString = BOM + csvString;
    if (window.Blob && window.URL && window.URL.createObjectURL) {
        csvString = new Blob([csvString], {
            type: "text/xlsx"
        });
        return URL.createObjectURL(csvString);
    }
    return "data:attachment/xlsx;charset=utf-8," + encodeURI(csvString);
};

/**
 * 生成下载dom并下载文件
 * @param {下载链接} url
 * @param {下载文件名} filename
 */
const downloadLink = (url, filename) => {
    let alink = document.createElement("a");
    alink.id = "linkDwnldLink";
    alink.href = url;
    alink.target = "_blank";
    alink.download = filename + ".xlsx";
    document.body.appendChild(alink);
    let linkDom = document.getElementById("linkDwnldLink");
    linkDom.click();
    document.body.removeChild(linkDom);
};

export default downloadcsv;
