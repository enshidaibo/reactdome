import Immutable from "seamless-immutable";
import { merge, Subject, from } from 'rxjs';
import { scan, startWith, switchMap, map } from 'rxjs/operators';
import { getContentList, } from "@/services/content";
import { getWorkFlowContentList } from "../service";

const getContentList$ = new Subject().pipe(
    switchMap(query => {
        let { cid, workFlowId, queryStatus, ...rest } = query
        let requery = {}
        let fetchAction
        if (typeof queryStatus == 'number') {
            requery = { ...rest, cid, workFlowId, checkStep: queryStatus + 1 }
            fetchAction = getWorkFlowContentList
        } else {
            requery = { ...rest, queryStatus, cid: cid == -1 ? 0 : cid }
            fetchAction = getContentList
        }
        const fetch$ = from(fetchAction(requery)).pipe(
            map(res => {
                if (res.success) {
                    localStorage.contentcid = cid
                    return {
                        loading: false,
                        list: res.body,
                        totalCount: res.totalCount,
                        selectedRows: [],
                        query
                    }
                } else {
                    return { loading: false }
                }
            }),
            // catchError(err => EMPTY)
        )
        return fetch$
    }),
    map(data => state => {
        return state.merge(data)
    })
)

export const fetchList$ = new Subject().pipe(
    map(requery => state => {
        let query = { ...state.query, ...requery };
        let { cid } = query
        if (cid == -1) {
            query.queryInputUsername = state.userInfo.username
        }
        getContentList$.next({ ...query, workFlowId: state.workflowId })
        return state.merge({ loading: true })
    })
)

export const setQuery$ = new Subject().pipe(
    map(query => state => {
        query = { ...state.query, ...query }
        return state.merge({ query })
    })
)

export const mergeState$ = new Subject().pipe(
    map(mergeState => state => {
        return state.merge(mergeState)
    })
)

export const creatStates$ = function (initValue = {}) {
    const initState = Immutable(initValue)
    const states$ = merge(fetchList$, getContentList$, setQuery$, mergeState$)
        .pipe(
            startWith(initState),
            scan((state, reducer) => reducer(state)),
            map(state => {
                console.log(state);
                return state
            })
        )
    return states$
}