import React, { Component } from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true, error, info });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h1>Error: {this.state.error.toString()}</h1>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
