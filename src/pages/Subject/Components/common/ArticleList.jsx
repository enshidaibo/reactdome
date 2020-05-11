/**
 * 选择文章
 */
import React, { useState } from 'react';
import ContentIndex from "@/components/ContentList/AddEntry/ContentIndex";
import styles from './ArticleList.scss'
const Ct = props => {
    return (
        <div className={styles.ct}>
            <div className={styles.cbox}>
                <ContentIndex {...props} />
            </div>
        </div>
    );
};
const AddList = ({ onOk, children }) => {
    const [visible, setVisible] = useState(false)
    const handleOk = (d) => {
        setVisible(false)
        onOk(d)
    }
    return [
        React.cloneElement(children, {
            key: "children",
            onClick: () => setVisible(true)
        }),
        visible &&
        ReactDOM.createPortal(
            <Ct onClose={() => setVisible(false)} onOk={handleOk} />,
            document.getElementById(rootDom)
        )
    ];
}

export default AddList