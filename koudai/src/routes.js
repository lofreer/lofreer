// import { App, Home, All, Class, ClassInfo, ClassChapter, TeacherInfo }  from 'containers';

export default function routes() {
    return {
        path: '/',
        // component: require('containers/app').default,
        getComponent: function(nextState, cb) {
            return require.ensure([], (require) => {
                cb(require('containers/app').default);
            });
        },
        indexRoute: {
            // component: Home,
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/home').default);
                });
            }
        },
        childRoutes: [{
            path: 'all',
            // component: All,
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/all').default);
                });
            }
        }, {
            path: ':id',
            // component: require('containers/class').default,
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/class').default);
                });
            },
            childRoutes: [{
                path: 'info',
                // component: ClassInfo,
                getComponent: function(nextState, cb) {
                    return require.ensure([], (require) => {
                        cb(require('containers/classInfo').default);
                    });
                }
            }, {
                path: 'chapter',
                // component: ClassChapter,
                getComponent: function(nextState, cb) {
                    return require.ensure([], (require) => {
                        cb(require('containers/classChapter').default);
                    });
                }
            }]
        }, {
            path: 'teacher/:tid',
            // component: TeacherInfo,
            getComponent: function(nextState, cb) {
                return require.ensure([], (require) => {
                    cb(require('containers/teacherInfo').default);
                });
            }
        }]
    }
}