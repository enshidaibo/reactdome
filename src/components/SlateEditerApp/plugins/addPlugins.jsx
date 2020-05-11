const addPlugins = (plugins = []) => {
    let pluginsEvent = []
    let renders = []
    plugins.map(r => {
        r.pluginEvent && pluginsEvent.push(r.pluginEvent());
        r.pluginRender && renders.push(r.pluginRender);
    })
    const pluginsRender = ({ value, onChange }) => {
        return renders.map((D, i) => <D key={i} value={value} onChange={onChange} ></D>)
    }
    return {
        pluginsEvent,
        pluginsRender
    }
}

export default addPlugins