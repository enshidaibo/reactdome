const template_1 = `<!DOCTYPE html>
<html lang="zh_CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Cache-Control" content="no-cache" />
    <title>专题</title>
    <link rel="stylesheet" href="https://imgfile.estv.com.cn/subject/template_1/h5/font/iconfont.css">
    <link rel="stylesheet" href="https://imgfile.estv.com.cn/common/swiper/css/swiper.min.css">
</head>
<script>
    function changeFontSize() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        // document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    }
    changeFontSize()
    window.onresize = changeFontSize
</script>
<style>
    body {
        font-size: 0.14rem;
        overflow: scroll;
    }
</style>
<body>
    <div id="root"></div>
    <script src="https://imgfile.estv.com.cn/common/react/react.16.8.4.js"></script>
    <script src="https://imgfile.estv.com.cn/common/react/react-dom.16.8.4.js"></script>
    <script src="https://imgfile.estv.com.cn/common/swiper/js/swiper.min.js"></script>
    <script>
        var AppConfig = {
            baseUrl: 'https://yssjgateway.estv.com.cn/cms/v4/api/',
            vmsUrl: 'https://yssjgateway.estv.com.cn/vms-proxy/',
        }
    </script>
</body>

</html>`

export default template_1