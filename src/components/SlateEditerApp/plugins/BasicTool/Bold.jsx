/**
 * 加粗
 */
import RenderMarkButton from './renderMarkButton'

const pluginRender = ({ value, onChange }) => {
    return <RenderMarkButton value={value} onChange={onChange} type='bold' icon='bold' title='加粗' />
}
export default {
    pluginRender
}