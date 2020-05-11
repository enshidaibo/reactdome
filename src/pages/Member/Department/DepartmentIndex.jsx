import React, { Component } from 'react'
import localRedux from './localRedux'

const initValue = {
    version: 0,
    list: [],
    flattenList: null,
    selectKeys: [],
    departmentId: 0,
}

const DepartmentIndex = ({ children }) => {
    return (
        <localRedux.localRudexProvider value={initValue}>
            {children}
        </localRedux.localRudexProvider>
    )
}

export default DepartmentIndex
