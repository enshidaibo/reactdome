const loadScripts = (url) => {
    return new Promise(function (resolve, reject) {
        let script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    resolve({
                        url,
                        success: true
                    })
                }
            };
        } else { //Others
            script.onload = function () {
                resolve({
                    url,
                    success: true
                })
            };
            script.onerror = function (error) {
                resolve({
                    url,
                    success: false
                })
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    })
}

export default loadScripts