(function() {
    var ce = Simple.createElement;
    var Router = Simple.createClass({
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
                    var href = ev.target.href;
                    if (href) {
                        var a = ev.target;
                        self.routes.some(function(route){
                            if ( a.host === location.host && route.reg.test(a.pathname)) {
                                ev.preventDefault();
                                self.go(a.pathname);
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
        // 获取组件
        getComponent: function(routes, params) {
            var self = this;
            var component = ce(routes[0].component);

            var props = component.props = {
                params: params,
                router: self
            };        

            if (routes.length > 1) routes.forEach(function(route, index) {
                if (index > 0) {
                    props.children = ce(route.component);
                    props = (props.children.props = {});
                    props.params = params;
                    props.router = self;
                }
            });
            return component;
        },

        // 路由匹配
        matchRoutes: function(location){
            var self = this;
            var state = {};
            this.routes.forEach(function(route){
                if (route.reg.test(location)) {
                    var match = location.match(route.reg);
                    var params = {};
                    if (match && route.params) {                    
                        route.params.forEach(function(name, index) {
                            params[name] = match[index + 1];
                        });
                        state.params = params;
                    }
                    state.components = self.getComponent(route.routes, params);
                }
            });
            
            return state;
        },
        // 路由解析
        parseRoutes: function(routes, str, childRoutes) {
            var self = this;
            var paramsReg = /:(\w+)/g;
            path = str || '';   
            childRoutes = childRoutes || [];
            var arr = childRoutes.slice();
            routes.forEach(function(route, i){
                var routeObj = {};
                routeObj.path = path += route.path;
                routeObj.component = route.component;
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
                path = str;
            });
        },
        // 匹配当前地址
        isActive: function() {
            var self = this, path;
            if (this.props.history === 'history') {
                path = location.pathname;
            } else {
                path = location.hash.replace(/^#/, '');
            }
            if (path === '') path = '/';
            this.state = this.matchRoutes(path);
        },

        componentWillMount: function() {
            var self = this;
            this.history = this.props.history;
            this.routes = [];
            this.parseRoutes([this.props.routes]);

            this.listen(function(location){
                self.setState(self.matchRoutes(location));
            });
            this.updateLocation();

            this.isActive();       
        },
        
        render: function() {
            console.log(this)
            return this.state.components;
        }

    });

    window.Router = Router;
})();