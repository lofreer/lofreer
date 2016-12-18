import { App, Home, All, Class, ClassInfo, ClassChapter, TeacherInfo, Search }  from 'containers';

export default function routes() {
    return {
        path: '/',
        component: App,
        indexRoute: {
            component: Home
        },
        childRoutes: [{
            path: 'all',
            component: All
        }, {
            path: ':id',
            component: Class,
            childRoutes: [{
                path: 'info',
                component: ClassInfo
            }, {
                path: 'chapter',
                component: ClassChapter
            }]
        }, {
            path: 'teacher/:tid',
            component: TeacherInfo
        }, {
            path: 'search',
            component: Search
        }]
    }
}