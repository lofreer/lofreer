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
            path: 'class/:type',
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/list').default);
                });
            }
        }, {
            path: 'room/:cid/:type',
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/class').default);
                });
            }
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