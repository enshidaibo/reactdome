/* global ActiveXObject */

function flashChecker() {
    let hasFlash = 0; //是否安装了flash
    let flashVersion = 0; //flash版本
    if (document.all) {
        let swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            hasFlash = 1;
            let VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0], 10);
        }
    } else if (navigator.plugins && navigator.plugins.length > 0) {
        let swf = navigator.plugins["Shockwave Flash"];
        if (swf) {
            hasFlash = 1;
            let words = swf.description.split(" ");
            for (let i = 0; i < words.length; i += 1) {
                if (Number.isNaN(parseInt(words[i], 10))) {
                    continue;
                }
                flashVersion = parseInt(words[i], 10);
            }
        }
    }
    return {
        f: hasFlash,
        v: flashVersion
    };
}

export default flashChecker