/**
 * Context Api状态管理
 */
import React, { Component, createContext, useContext } from "react";
import Immutable from "seamless-immutable";

// import createHistory from "history/createHashHistory";
// const history = createHistory();
export const context = createContext();

export const contextValue = () => useContext(context)
export class Provider extends Component {
    constructor(props) {
        super(props);
        let initValue = props.value || {};
        initValue.query = {};
        this.state = {
            data: Immutable(initValue)
        };
        this.dispatch = {
            callBack: this.callBack,
            set: this.setContext,
            setIn: this.setInContext
        };
        window.dispatch = this.dispatch;
    }
    // componentDidMount() {
    //     window.addEventListener("popstate", this.handleHashChange, false);
    //     this.handleHashChange();
    // }
    // handleHashChange = () => {
    //     let hash = window.location.href.split("#")[1];
    //     hash = hash && hash.split("?")[1];
    //     let query = {};
    //     if (hash) {
    //         query = qs.parse(hash);
    //     }
    //     this.setContext({ query });
    // };
    callBack = (fbc, opt) => {
        let data = fbc(this.state.data, this.dispatch, opt);
        // this.setContext(data);
    };
    setContext = payload => {
        setTimeout(() => {
            let data = this.state.data.merge(Immutable(payload));
            this.setState({
                data
            });
        }, 0);
    };
    setInContext = (payload, data) => {
        setTimeout(() => {
            if (typeof payload == "string") {
                payload = [payload];
            }
            data = this.state.data.setIn(payload, Immutable(data));
            this.setState({
                data
            });
        }, 0);
    };
    render() {
        let { children } = this.props;
        let contextData = {
            context: this.state.data,
            dispatch: this.dispatch
        };
        return <context.Provider value={contextData}>{children}</context.Provider>;
    }
}

export const contextConsumers = propFunc => Component =>
    class extends React.Component {
        render() {
            return (
                <context.Consumer>
                    {context => {
                        let contextData = propFunc ? propFunc(context.context, this.props) : null;
                        return <Component {...this.props} {...contextData} dispatch={context.dispatch} />;
                    }}
                </context.Consumer>
            );
        }
    };

export default { Provider, contextConsumers };
