/**
 * Context Api状态管理
 */
import React, { createContext, useState, useContext } from "react";
import Immutable from "seamless-immutable";

const createLocalRudex = () => {
    const context = createContext();
    const localRudexProvider = ({ value = {}, children }) => {
        const [state, setState] = useState(Immutable(value))
        const setContext = payload => {
            let data = state.merge(Immutable(payload));
            setState(data)
        };
        const setInContext = (payload, newdata) => {
            if (typeof payload == "string") {
                payload = [payload];
            }
            let data = state.setIn(payload, Immutable(newdata));
            setState(data)
        };
        const dispatch = {
            set: setContext,
            setIn: setInContext,
        };
        let contextData = {
            context: state,
            dispatch: dispatch
        };
        return <context.Provider value={contextData}>{children}</context.Provider>;
    }
    const localRudexConsumer = Component =>
        class extends React.Component {
            render() {
                return (
                    <context.Consumer>
                        {context => {
                            return <Component {...this.props} {...context} />;
                        }}
                    </context.Consumer>
                );
            }
        };
    const localRudexConsumers = propFunc => Component =>
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
    return { context, localRudexProvider, localRudexConsumer, localRudexConsumers };
}

// export default createLocalRudex

const createRudex = () => {
    const localRedux = createLocalRudex()
    const getContext = () => useContext(localRedux.context)
    return {
        ...localRedux,
        getContext
    }
}

export default createRudex