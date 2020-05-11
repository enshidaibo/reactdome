
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

export default RenderMarkButton