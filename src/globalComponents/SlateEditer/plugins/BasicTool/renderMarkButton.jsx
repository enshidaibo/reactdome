
import styles from '../style.scss';
const RenderMarkButton = ({ value, onChange, type, icon, title }) => {
    const hasMark = type => {
        return value.activeMarks.some(mark => mark.type == type);
    };
    const handleClickMark = (event, type) => {
        event.preventDefault();
        const change = value.change().toggleMark(type);
        onChange(change);
    };
    let isActive = hasMark(type);
    let cls = isActive ? styles.btn_active : styles.btn;
    return <span className={cls} title={title} onMouseDown={event => handleClickMark(event, type)} >
        <span className={`iconfont icon-${icon}`} />
    </span>
}

const Marks = [{
    type: 'bold',
    icon: 'bold',
    title: '加粗',
}, {
    type: 'italic',
    icon: 'italic',
    title: '斜体',
}, {
    type: 'underlined',
    icon: 'underline',
    title: '下划线',
}]
const MarkButtons = Marks.map(d => {
    return {
        name: d.type,
        pluginRender: ({ value, onChange }) => {
            return <RenderMarkButton value={value} onChange={onChange} type={d.type} icon={d.icon} title={d.title} />
        }
    }
})

export default MarkButtons