/**
 * 斜体
 */
import RenderMarkButton from './renderMarkButton'

const pluginRender = ({ value, onChange }) => {
    return <RenderMarkButton value={value} onChange={onChange} type='italic' icon='italic' title='斜体' />
}
export default {
    pluginRender
}