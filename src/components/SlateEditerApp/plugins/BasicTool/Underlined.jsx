/**
 * 下划线
 */
import RenderMarkButton from './renderMarkButton'

const pluginRender = ({ value, onChange }) => {
    return <RenderMarkButton value={value} onChange={onChange} type='underlined' icon='underline' title='下划线' />
}
export default {
    pluginRender
}