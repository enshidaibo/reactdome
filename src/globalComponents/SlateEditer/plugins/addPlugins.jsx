const addPlugins = (plugins = []) => {
    let pluginsEvent = []
    let renders = []
    let pluginsObject = {}
    plugins.map(r => {
        pluginsObject[r.name] = r
        r.pluginEvent && pluginsEvent.push(r.pluginEvent());
        r.pluginRender && renders.push(r.pluginRender);
    })
    const pluginsRender = ({ value, mark, modelId, onChange, orders, ...rest }) => {
        if (orders) {
            return orders.map(d => {
                if (!pluginsObject[d]) {
                    return null
                }
                let C = pluginsObject[d].pluginRender
                return <C key={d} mark={mark} modelId={modelId} value={value} onChange={onChange} {...rest} ></C>
            })
        }
        return renders.map((D, i) => <D key={i} mark={mark} modelId={modelId} value={value} onChange={onChange} {...rest} ></D>)
    }
    return {
        pluginsEvent,
        pluginsRender
    }
}

export default addPlugins