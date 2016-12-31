export default function routes() {
    return {
        path: '/',
        getComponent: function(nextState, cb) {
            return require.ensure([], (require) => {
                cb(require('containers/app').default);
            });
        },
        indexRoute: {
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/home').default);
                });
            }
        },
        childRoutes: [{
            path: 'all',
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/all').default);
                });
            }
        }, {
            path: ':id',
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/class').default);
                });
            },
            childRoutes: [{
                path: 'info',
                getComponent: function(nextState, cb) {
                    return require.ensure([], (require) => {
                        cb(require('containers/classInfo').default);
                    });
                }
            }, {
                path: 'chapter',
                getComponent: function(nextState, cb) {
                    return require.ensure([], (require) => {
                        cb(require('containers/classChapter').default);
                    });
                }
            }]
        }, {
            path: 'teacher/:tid',
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/teacherInfo').default);
                });
            }
        }]
    }
}