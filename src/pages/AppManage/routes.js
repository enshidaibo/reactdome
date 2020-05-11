/* global app */
import Category from './Category/routes';
import BootMap from './BootMap/routes';

const routes = {
    path: "/appmanage",
    name: "App设置",
    iconCls: "icon-shezhi",
    auth: 'appmanage',
    isUrl: false,
    routes: [Category, BootMap]
}
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;