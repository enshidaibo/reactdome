import React, { useState, useEffect } from "react";
import Immutable from "seamless-immutable";
import { merge, Subject, from } from 'rxjs';
import { scan, startWith, switchMap, map } from 'rxjs/operators';

export const merge$ = new Subject().pipe(
    map(mergeState => state => {
        return state.merge(mergeState)
    })
)

export const creatStates$ = function (initValue) {
    const states$ = merge(merge$)
        .pipe(
            startWith(initValue),
            scan((state, reducer) => reducer(state)),
        )
    return states$
}

export const creatState = (initValue = {}) => {
    const initState = Immutable(initValue)
    const [state, setState] = useState(initState)
    useEffect(() => {
        const states$ = creatStates$(initState)
        const subscription$ = states$.subscribe(state => {
            if (initState == state) {
                return
            }
            setState(state)
        })
        return () => {
            subscription$.unsubscribe()
        }
    }, [])
    return state
}
