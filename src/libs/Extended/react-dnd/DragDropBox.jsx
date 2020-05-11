import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
const update = require("immutability-helper");

@DragDropContext(HTML5Backend)
export default class DragDropBox extends Component {
    moveCard = (dragIndex, hoverIndex) => {
        const { data, onChange } = this.props;
        const dragCard = data[dragIndex];
        let cards = update(data, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        });
        onChange && onChange(cards);
    };
    render() {
        let { children } = this.props;
        return [
            children.map(child => {
                return React.cloneElement(child, { moveCard: this.moveCard });
            })
        ];
    }
}
