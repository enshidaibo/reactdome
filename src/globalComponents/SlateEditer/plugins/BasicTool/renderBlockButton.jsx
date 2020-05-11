
import styles from '../style.scss';

const DEFAULT_NODE = "paragraph";
const RenderBlockButton = ({ value, onChange, type, icon, title }) => {
    const hasBlock = type => {
        return value.blocks.some(node => node.type == type);
    };
    const handleClickBlock = (event, type) => {
        event.preventDefault();
        const change = value.change();
        const { document } = value;
        // Handle everything but list buttons.
        if (type != "ul" && type != "ol") {
            const isActive = hasBlock(type);
            const isList = hasBlock("li");
            if (isList) {
                change
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock("ul")
                    .unwrapBlock("ol");
            } else {
                change.setBlocks(isActive ? DEFAULT_NODE : type);
            }
        } else {
            const isList = hasBlock("li");
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type == type);
            });
            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock("ul")
                    .unwrapBlock("ol");
            } else if (isList) {
                change.unwrapBlock(type == "ul" ? "ol" : "ul").wrapBlock(type);
            } else {
                change.setBlocks("li").wrapBlock(type);
            }
        }
        onChange(change);
    };
    let isActive = hasBlock(type);
    if (["ul", "ol"].includes(type)) {
        let frist = value.blocks.first();
        if (frist) {
            const parent = value.document.getParent(frist.key);
            isActive = hasBlock("li") && parent && parent.type === type;
        } else {
            isActive = false;
        }
    }
    let cls = isActive ? styles.btn_active : styles.btn;
    return (
        <div className={cls} title={title} onMouseDown={event => handleClickBlock(event, type)}>
            <span className={"iconfont icon-" + icon} />
        </div>
    );
}

const Blocks = [{
    type: 'h1',
    icon: 'biaoti1',
    title: 'H1',
}, {
    type: 'h2',
    icon: 'biaoti2',
    title: 'H2',
}, {
    type: 'pre',
    icon: 'insert_tag_field',
    title: '代码块',
}, {
    type: 'blockquote',
    icon: '713bianjiqi_yinyong',
    title: '引用',
}, {
    type: 'ul',
    icon: 'richtextbulletedlist',
    title: '无序列表',
}, {
    type: 'ol',
    icon: 'youxuliebiao',
    title: '有序列表',
}]
const BlockButtons = Blocks.map(d => {
    return {
        name: d.type,
        pluginRender: ({ value, onChange }) => {
            return <RenderBlockButton value={value} onChange={onChange} type={d.type} icon={d.icon} title={d.title} />
        }
    }
})

export default BlockButtons
