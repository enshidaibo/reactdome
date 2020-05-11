import React, { Component } from 'react'
import localRedux from './localRedux'

const initValue = {
    version: 0,
    list: [],
    selectKeys: [],
    departmentId: 0,
    tableversion: 0,
}

const UsersIndex = ({ children }) => {
    return (
        <localRedux.localRudexProvider value={initValue}>
            {children}
        </localRedux.localRudexProvider>
    )
}

export default UsersIndex
