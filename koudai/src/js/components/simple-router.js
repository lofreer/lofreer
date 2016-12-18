import Simple from './simple';

export default Simple.createClass({  

    getInitialState: function() {
        return {
            components: null,
            routes: null
        }
    },  

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
    getComponent: function(routes, state, components) {  
        routes = routes.slice();
        components = components || [];
        var route = routes.shift();
        var self = this;
        function asyn(data, cb) {
            return new Promise(function(resolve, reject) {
                cb(data, function(value){
                    resolve(value);
                })
            });
        }          

        if (route.component) {
            components.push(route.component);
            if (routes.length) {
                this.getComponent(routes, state, components);
            } else {
                if (route = route.indexRoute) {
                    if (route.component) {
                        components.push(route.component);
                        state.routes.push(route);
                        state.components = self.concatComponent(components, state);
                        if (self.isReady) {
                            self.setState(state);
                        } else {
                            self.state = state;
                        }
                    } else if (Simple.utils.isFunction(route.getComponent)) {
                        asyn(state, route.getComponent).then(function(value){
                            components.push(value);
                            state.routes.push(route);
                            state.components = self.concatComponent(components, state);
                            self.setState(state);
                        })
                    }
                } else {
                    state.components = self.concatComponent(components, state);
                    if (self.isReady) {
                        self.setState(state);
                    } else {
                        self.state = state;
                    }
                }
            }
        } else if (Simple.utils.isFunction(route.getComponent)) {
            asyn(state, route.getComponent).then(function(value){
                components.push(value);
                if (routes.length) {
                    self.getComponent(routes, state, components);
                } else {
                    if (route = route.indexRoute) {
                        if (route.component) {
                            components.push(route.component);
                            state.routes.push(route);
                            state.components = self.concatComponent(components, state);
                            self.setState(state);
                        } else if (Simple.utils.isFunction(route.getComponent)) {
                            asyn(state, route.getComponent).then(function(value){
                                components.push(value)
                                state.routes.push(route);
                                state.components = self.concatComponent(components, state);
                                self.setState(state);
                            })
                        }
                    } else {
                        state.components = self.concatComponent(components, state);
                        self.setState(state);
                    }
                }
            })
        }
    },

    // 组件拼装
    concatComponent: function(components, state) {
        components = components.slice();
        state.router = this;
        var component = this.createElement(components.shift(), state);
        var props = component.props;
        while(components.length) {
            props.children = this.createElement(components.shift(), state);
            props = props.children.props;
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
                self.getComponent(route.routes, state);
                return true;
            }
        });
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
        this.matchRoutes(path);
    },

    componentWillMount: function() {
        var self = this;
        this.history = this.props.history;
        this.routes = [];
        this.parseRoutes(Simple.utils.isArray(this.props.routes) ? this.props.routes : [this.props.routes]);

        this.listen(function(location){
            self.matchRoutes(location)
        }); 
        
        this.isActive();   
        this.updateLocation(); 
    },

    componentDidMount: function() {
        this.isReady = true;
    },
    
    render: function() {
        return this.state.components || '';
    }

});