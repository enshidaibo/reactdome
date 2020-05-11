import React, { Component } from "react";
import { render } from "react-dom";
import Index from './index'

const App = () => {
    let value = `<p></p><p>（融媒体记者2 熊羲 报道）
    6月11日，记者从恩施高中2019年中考招生政策解读新闻发布会上获悉，恩施高中2019年计划招生共1400人，其中公费生1280人，国际班120人。</p><figure><img src="https://yssjcms_static.estv.com.cn/u/cms/www/2019/06/11/image/11153607exlr.png" title="image.png" server="true"/></figure><p>在媒体和家长提问环节，部分学生家长就国际班在师资力量方面相对于其他班级是否较弱的问题向校方提出疑问。<strong>
    “（国际班）分班在师资力量方面的话，有人说它是最差的，是这样的吗？
    ”</strong></p><p><strong>“我们的老师都是交叉配备、均衡配备的，实力总体来说是相近的。”恩施高中校长谭斌回答。</strong></p><p>据了解，恩施高中今年初始的分班情况将根据中考成绩进入恩施、利川、建始、巴东各前30名，恩施清江外校、英才中学联合排名前30名，宣恩、咸丰、来凤、鹤峰各前15名的学生进入奥赛班。中考成绩进入恩施前250名，利川、巴东各前200名，建始前150名，咸丰、宣恩、来凤、鹤峰各前50名，恩施清江外校、恩施英才实验中学联合排名前170名的学生，进入阳光班或实验班。
    </p><p>今年高一新生入校将分为26个教学班，其中就包括奥赛班、阳光班或实验班、平行班。进校之后是否还有调班的机会，也是广大学生家长比较关心的问题。
    <strong>“进入平行班之后，学生成绩上升，是否还有进入实验班的机会？”
    一位学生家长提问。</strong></p><p><strong>恩施高中校长谭斌：“我们过去开辟过这种（调班）通道，我们到时候也会根据家长和学生的要求，进一步研究每一届学生这种（调班）通道的情况。”</strong></p><figure><img src="https://yssjcms_static.estv.com.cn/u/cms/www/2019/06/11/image/11153711svoj.png" title="image.png" server="true"/></figure><p>在志愿填报方面，根据州教育局今年的中招政策，恩施高中今年招生录取均通过网络平台进行。 志愿到恩施高中就读公费生的学生，建议在网上普通高中志愿栏位A位填报恩施高中。有意就读恩施高中国际班的学生，建议在网上普通高中志愿栏靠前位置填报恩施高中（国际班）。按志愿录取后，还必须以在规定的时间内缴纳相关费用为准。 符合扶贫专项招生条件的考生填报恩施高中志愿后,系统即默认该生同时填报了“恩施高中扶贫专项计划”志愿。</p><p>在录取办法方面，今年中考统一由州教育考试院统一划线，网上录取，各学校均由州教育局统一发放录取通知书，学校会在录取结束后及时通知学生和家长，并在恩施高中校园网上公告，请大家按通知时间及要求办理相关手续并领取录取通知书。</p><figure><img src="https://yssjcms_static.estv.com.cn/u/cms/www/2019/06/11/image/11152823tmiy.png" title="image.png" server="true"/><figcaption>△ 长按识别二维码</figcaption><figcaption>查看恩高招生<br/>简章全文<br/></figcaption></figure><p></p>`
    let value2 = `<figure><img src="https://yssjcms_static.estv.com.cn/u/cms/www/2019/06/11/image/11153607exlr.png" title="image.png" /></figure>`
    let value3 = `<section style="font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;orphans:2;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;text-decoration-style:initial;text-decoration-color:initial;margin:0px;padding:0px;max-width:100%;box-sizing:border-box;color:rgb(51,51,51);font-family:-apple-system-font,BlinkMacSystemFont,&quot;HelveticaNeue&quot;,&quot;PingFangSC&quot;,&quot;HiraginoSansGB&quot;,&quot;MicrosoftYaHeiUI&quot;,&quot;MicrosoftYaHei&quot;,Arial,sans-serif;letter-spacing:0.544px;background-color:rgb(255,255,255);text-align:center;line-height:2;word-wrap:break-word!important"><p style="margin:0px;padding:0px;max-width:100%;box-sizing:border-box;clear:both;min-height:1em;word-wrap:break-word!important">患者欠下巨额医疗费</p><p style="margin:0px;padding:0px;max-width:100%;box-sizing:border-box;clear:both;min-height:1em;word-wrap:break-word!important">是中断治疗追索欠款</p></section>`
    let value4 = `<p></p><section> 123 <p>患者欠下巨额医疗费1</p><p>是中断治疗追索欠款</p></section><p></p>`
    let value5 = `<p></p><section> 234 <span>123</span><span>1234</span><p>患者欠下巨额医疗费1</p></section><p></p>`
    return <div>sdsds
        <Index value={value4} />
    </div>
}

render(<App />, document.getElementById("root"));