import html from './html';
// import htmlPc from './htmlPc';

const template_1 = {
    key: 'template_1',
    name: '模板1',
    html: html,
    // htmlPc: htmlPc,
    htmlUrl: ['https://imgfile.estv.com.cn/subject/template_1/h5/20200116/vendors~app-57900aca590f4aa4424f.js',
        'https://imgfile.estv.com.cn/subject/template_1/h5/20200116/app-60216578aabc46a38d7c.js'],
    // htmlPcUrl: ['http://192.168.60.109:3222/template_1.main.js'],
    struct: [{
        type: 'swiper',
        name: 'swiper',
        title: '幻灯片',
        defaultValue: []
    }, {
        type: 'textArea',
        name: 'description',
        title: '专题描述'
    }, {
        type: 'list',
        name: 'list',
        title: '板块列表'
    }]
}

export default template_1