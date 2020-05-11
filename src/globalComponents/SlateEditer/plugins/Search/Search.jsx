import React, { Component } from "react";
import styles from "./Search.scss";

export default class Search extends Component {
    onInputChange = event => {
        const { value } = this.props;
        const string = event.target.value.toLowerCase();
        const texts = value.document.getTexts();
        const decorations = [];
        texts.forEach(node => {
            const { key, text } = node;
            const parts = text.toLowerCase().split(string);
            let offset = 0;
            parts.forEach((part, i) => {
                if (i != 0) {
                    decorations.push({
                        anchorKey: key,
                        anchorOffset: offset - string.length,
                        focusKey: key,
                        focusOffset: offset,
                        marks: [{ type: "highlight" }],
                        atomic: true
                    });
                }
                offset = offset + part.length + string.length;
            });
        });
        // Setting the `save` option to false prevents this change from being added
        // to the undo/redo stack and clearing the redo stack if the user has undone
        // changes.
        const change = value
            .change()
            .setOperationFlag("save", false)
            .setValue({ decorations })
            .setOperationFlag("save", true);
        this.props.onChange(change);
    };
    render() {
        return <input className={styles.search} type="search" placeholder="搜索" onChange={this.onInputChange} />;
    }
}
