import React, { Component } from "react";
import { render } from "react-dom";
import useData from './hooks/useData';
import Index from './index'
import jsonSchems from './jsonSchems';
import _uiSchems from './uiSchems';

import BaseTextarea from "./components/fields/BaseTextarea";

import useDataImmutable from '@/hooks/useDataImmutable';

const SlateEditer = app.asyncComponent('SlateEditer')

import WorkFlow from './components/customFields/WorkFlow';

const App = () => {
    const [data, setData] = useData({ name: 'ah', tasks: [] })
    const [uiSchems, setUiSchems] = useDataImmutable(_uiSchems)
    const handleClick = () => {
        setData({ name: '18672035432', path: '123' })
    }
    const handleClick2 = () => {
        let newUiSchems = uiSchems.setIn(['select', 'uiData'], [{
            "value": "1",
            "title": "苹果2"
        }, {
            "value": 2,
            "title": "梨子2"
        }, {
            "value": 3,
            "title": "香蕉2"
        }])
        setUiSchems(newUiSchems)
    }
    const handleChange = data => {
        console.log(data)
        setData(data)
    }
    console.log(data)
    return <div>sdsds
        <div>1212121</div>
        <button onClick={handleClick}>点击</button>
        <button onClick={handleClick2}>dian2</button>
        <Index
            data={data}
            schema={jsonSchems}
            uiSchems={uiSchems}
            customFields={{ workFlow: WorkFlow }}
            onChange={handleChange}
        />
    </div>
}

render(<App />, document.getElementById("root"));