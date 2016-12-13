(function() {

    var cc = Simple.createClass;
    var ce = Simple.createElement;

    var nav = cc({

        render: function() {
            var navs = [{
                title: '题库',
                icon: '',
                to: '#/testbank'
            }, {
                title: '课堂',
                icon: '',
                to: '#/lesson'
            },{
                title: '社区',
                icon: '',
                to: '#/community'
            },{
                title: '我的',
                icon: '',
                to: '#/user'
            }]
            return ce('ul', {class: 'k-nav'}, navs.map(function(nav) {
                return ce('li', {class: 'nav-item'}, [
                    ce('a', {href: nav.to}, [nav.title])
                ])
            }));
        }

    });

    var search = cc({

        render: function() {
            return ce('div', null, [
                'search'
            ])
        }

    });

    var lesson = cc({

        render: function() {
            return ce('div', null, [
                ce(search),
                'Lesson'
            ])
        }

    });    

    var testbank = cc({

        render: function() {
            return ce('div', null, [
                'Test Bank'
            ])
        }

    });    

    var community = cc({

        render: function() {
            return ce('div', null, [
                'Community'
            ])
        }

    });   

    var user = cc({

        render: function() {
            return ce('div', null, [
                'User'
            ])
        }

    });    

    var home = cc({

        render: function() {
            return ce('div', null, [
                ce(nav),
                this.props.children
            ])
        }

    });


    var routes = {
        path: '/',
        component: home,
        indexRoute: {
            component: lesson
        },
        childRoutes: [{
            path: '/lesson',
            component: lesson
        }, {
            path: '/testbank',
            component: testbank
        }, {
            path: '/community',
            component: community
        }, {
            path: '/user',
            component: user
        }]
    }

    
    Simple.render(ce(Router, {history: 'hash', routes: routes}), document.querySelector('#root'));

})(); 