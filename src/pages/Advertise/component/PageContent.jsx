import React, { Component } from 'react';
import page from "./page.scss";

class PageContent extends Component {

    render() {
        return (
            <div className={`${page.pageContent}`}>
                {this.props.children}
            </div>
        );
    }
}

export default PageContent;