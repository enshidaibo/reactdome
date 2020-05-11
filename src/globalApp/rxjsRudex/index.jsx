/**
 * Context Api状态管理
 */
import React, { createContext, useState, useContext, useEffect } from "react";
import Immutable from "seamless-immutable";
import { merge, Subject } from 'rxjs';
import { scan, startWith, map } from 'rxjs/operators';

const createLocalRudex = () => {
    const setSubject$ = new Subject()
    const set$ = setSubject$.pipe(
        map((data) => state => {
            state = state.merge(data)
            return state
        })
    )
    const setInSubject$ = new Subject()
    const setIn$ = setInSubject$.pipe(
        map(({ payload, data }) => state => {
            if (typeof payload == "string") {
                payload = [payload];
            }
            state = state.setIn(payload, data);
            return state
        })
    )
    const context = createContext();
    const localRudexProvider = ({ value = {}, children }) => {
        const [state, setState] = useState(null)
        useEffect(() => {
            const states$ = merge(set$, setIn$)
                .pipe(
                    startWith(Immutable(value)),
                    scan((state, reducer) => reducer(state))
                )
            let state$ = states$.subscribe((state) => {
                setState(state)
            })
            return () => {
                state$.unsubscribe()
            }
        }, [])
        const setContext = payload => {
            set$.next(payload)
        };
        const setInContext = (payload, data) => {
            setIn$.next({ payload, data })
        };
        const dispatch = {
            set: setContext,
            setIn: setInContext,
        };
        const getData = () => {
            return state
        }
        let contextData = {
            context: state,
            dispatch: dispatch,
            getData
        };
        return state == null ? null : <context.Provider value={contextData}>{children}</context.Provider>;
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

const createRudex = () => {
    const localRedux = createLocalRudex()
    const getContext = () => useContext(localRedux.context)
    return {
        ...localRedux,
        getContext
    }
}

export default createRudex