import Simple from './simple';

export default Simple.createClass({
    // DOM生成器
    createElement: Simple.createElement,
    // 路由事件添加
    listen: function(listener) {
        if (!this.hasOwnProperty('listener')) {
            this.listener || (this.listener = []);
        };
        this.listener.push(listener);
    },
    // 响应路由事件
    updateLocation: function() {
        var self = this;      
        if(this.props.history === 'history'){
            window.addEventListener('popstate', function () {
                var path = location.pathname;                                    
                self.listener.forEach(function(listener) {
                    listener(path);
                });
            }, false);
            window.addEventListener('click', function(ev) {   
                var node = ev.target;
                while(node.nodeName !== 'A' && node.parentNode) {
                    node = node.parentNode;
                }
                if (node.href) {
                    self.routes.some(function(route){
                        if ( node.host === location.host && route.reg.test(node.pathname)) {
                            ev.preventDefault();
                            self.go(node.pathname);
                            return true;
                        }
                    });
                }
            }, false);
        } else {
            window.addEventListener('hashchange', function () {
                var path = location.hash.replace(/^#/,'');
                self.listener.forEach(function(listener) {
                    listener(path);
                });
            }, false);
        }         
    },
    // 路由跳转
    go: function(path) {
        if (this.history === 'history') {
            window.history.pushState({
                path: path
            }, '', path);
            this.listener.forEach(function(listener) {
                listener(path);
            });
        } else {
            window.location.hash = path;
        }
    },
    // 拼装组件
    getComponent: function(routes, state) {
        routes = routes.slice();
        var component, route;
        component = this.createElement((route = routes.shift()).component);
        component.props = Object.assign({}, state, {router: this});
        if (routes.length) {
            component.props.children = this.getComponent(routes, state);
        } else {
            if (route.indexRoute) {
                component.props.children = this.createElement(route.indexRoute.component);
                state.routes.push(route.indexRoute);
                component.props.children.props = Object.assign({}, state, {router: this});
            }
        }
        return component;
    },
    // 路由匹配
    matchRoutes: function(location){
        var self = this;
        var state = {};
        this.routes.some(function(route){
            if (route.reg.test(location)) {
                var match = location.match(route.reg);
                var params = {};
                if (match && route.params) {                    
                    route.params.forEach(function(name, index) {
                        params[name] = match[index + 1];
                    });
                    state.params = params;
                }
                state.routes = route.routes;
                state.components = self.getComponent(route.routes, state);
                return true;
            }
        });
        return state;
    },
    // 路由解析
    parseRoutes: function(routes, str, childRoutes) {
        var self = this;
        var paramsReg = /:(\w+)/g;
        var path = str || '';   
        childRoutes = childRoutes || [];
        var arr = childRoutes.slice();
        routes.forEach(function(route, i){
            var routeObj = {};
            if (/^\//.test(route.path)) path = '';
            routeObj.path = path += route.path;
            routeObj.component = route.component;
            if (route.indexRoute) routeObj.indexRoute = route.indexRoute;
            childRoutes.push(route);
            routeObj.routes = arr.slice().concat(route);
            routeObj.reg = new RegExp('^' + path.replace(paramsReg, '(\\w+)') + '$');

            var paramsMatch = path.match(paramsReg);
            if (paramsMatch) {
                routeObj.params = paramsMatch.map(function(name) {
                    return name.replace(':', '');
                });
            }
            self.routes.push(routeObj);

            if (route.childRoutes) {
                if (!/\/$/.test(path)) path += '/'
                self.parseRoutes(route.childRoutes, path, childRoutes)
            }    
            childRoutes = arr.slice(); 
            path = str || '';
        });
    },
    // 匹配当前地址
    isActive: function() {
        var self = this, path;
        if (this.props.history === 'history') {
            path = location.pathname;
        } else {
            path = location.hash.replace(/^#/, '');
            if (!path) location.hash = '/';
        }
        if (path === '') path = '/';
        this.state = this.matchRoutes(path);
    },

    componentWillMount: function() {
        var self = this;
        this.history = this.props.history;
        this.routes = [];
        this.parseRoutes(Simple.utils.isArray(this.props.routes) ? this.props.routes : [this.props.routes]);

        this.listen(function(location){
            self.setState(self.matchRoutes(location));
        }); 
        
        this.isActive();   
        setTimeout(function() {
            self.updateLocation(); 
        })
    },
    
    render: function() {
        return this.state.components;
    }

});