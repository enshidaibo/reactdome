const Authorized = ({ children, auth, noMatch = null }) => {
    // return children
    const locale = app.globalRedux.getContext()
    const { perms = [] } = locale.context
    const childrenRender = typeof children === 'undefined' ? null : children;
    if (!auth || perms == '*') {
        return childrenRender;
    }
    if (perms.indexOf(auth) > -1) {
        return childrenRender
    }
    return noMatch
};

export default Authorized;