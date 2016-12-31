import { Simple, Search } from 'components';
import './home.less';

const ce = Simple.createElement;

export default Simple.createClass({

    getInitialState: function() {
        return {
            isSearch: false
        }
    }, 

    handleSearch: function(search) {
        this.setState({
            isSearch: search
        });
        if (search) {
            document.title = '口袋题库-搜索';
        } else {
            document.title = '口袋题库-课堂';
        }
    },
    
    render: function() {

        document.title = '口袋题库-课堂';

        let self = this;

        let search = ce('div', {class: 'search-wrap'}, [
            ce('input', {class: 'search-input', placeholder: '搜课程、搜老师、搜题目', onfocus: this.handleSearch.bind(this, true)}),
            ce('span', {class: 'search-cancel' + (this.state.isSearch ? ' show' : ''), onClick: this.handleSearch.bind(this, false)}, ['取消'])
        ]);

        let bannerList = ['src/img/banner_1.png', 'src/img/banner_2.png', 'src/img/banner_3.png', 'src/img/banner_4.png'];
        let banner = ce('div', {class: 'banner-wrap'}, [
            ce('ul', {class: 'banner-list'}, bannerList.map(function(item){
                return ce('li', {class: 'banner-item'}, [
                    ce('img', {src: item})
                ]);
            })),
            ce('div', {class: 'label-list'}, bannerList.map(function(item){
                return ce('span', {class: 'label-item'});
            }))
        ]);

        let activityList = ['政治<br>冲刺', '视觉<br>传达', '数学<br>真题'];
        let activity = ce('div', {class: 'activity-wrap'}, [
            ce('ul', {class: 'activity-list'}, activityList.map(function(item){
                return ce('li', {class: 'activity-item'}, [
                    ce('div', {class: 'img-box'}, [
                        ce('span', null, [item])
                    ]),
                    ce('div', {class: 'time-box'}, [
                        ce('span', {class: 'time'}, ['抢购12:23:58'])
                    ])
                ]);
            }))
        ]);

        let personalizeList = [{
            title: '学长原创|政治选择题思维复现',
            describe: '同样是买肖8,学长做题思路是这样的精深',
            cover: 'src/img/speech_1.jpg'
        }, {
            title: '学长原创|政治选择题思维复现',
            describe: '同样是买肖8,学长做题思路是这样的精深',
            cover: 'src/img/speech_2.jpg'
        }, {
            title: '学长原创|政治选择题思维复现',
            describe: '同样是买肖8,学长做题思路是这样的精深',
            cover: 'src/img/speech_3.jpg'
        }, {
            title: '学长原创|政治选择题思维复现',
            describe: '同样是买肖8,学长做题思路是这样的精深',
            cover: 'src/img/speech_4.jpg'
        }]
        let personalize = ce('div', {class: 'personalize-wrap'}, [
            ce('h3', {class: 'chunk-title'}, [' - 为你定制 -']),
            ce('ul', {class: 'personalize-list'}, personalizeList.map(function(item){
                return ce('li', {class: 'personalize-item'}, [
                    ce('div', {class: 'img-box'}, [
                        ce('img', {src: item.cover})
                    ]),
                    ce('p', {class: 'title'}, [item.title]),
                    ce('p', {class: 'describe'}, [item.describe])
                ]);
            }))
        ]);

        let teacherList = [{
            name: '张大莆',
            cover: 'src/img/person_1.jpg',
            label: ['CEO', '吹水班']
        }, {
            name: '张小喵',
            cover: 'src/img/person_2.jpg',
            label: ['睡觉', '卖萌班']
        }, {
            name: '博士后',
            cover: 'src/img/person_3.jpg',
            label: ['设计', '美颜班']
        }, {
            name: '恒欣宋',
            cover: 'src/img/person_4.jpg',
            label: ['产品', '规划班']
        }, {
            name: '肆叶',
            cover: 'src/img/person_5.jpg',
            label: ['狂魔', '梦想班']
        }]
        let teacher = ce('div', {class: 'teacher-wrap'}, [
            ce('h3', {class: 'chunk-title'}, [' - 名师推荐 -']),
            ce('ul', {class: 'teacher-list'}, teacherList.map(function(item){
                return ce('li', {class: 'teacher-item'}, [
                    ce('div', {class: 'img-box'}, [
                        ce('img', {src: item.cover})
                    ]),
                    ce('p', {class: 'name'}, [item.name]),
                    ce('div', {class: 'label-list'}, item.label.map(function(label){
                        return ce('span', {class: 'label-item'}, [label]);
                    }))
                ])
            }))
        ]);        

        let hotList = [{
            title: '数学冲刺|真题逐年讲解',
            describe: '八年真题逐年讲解，刷3遍！',
            cover: 'src/img/speech_1.jpg',
            size: '1小时20分钟',
            price: '369'
        }, {
            title: '数学冲刺|真题逐年讲解',
            describe: '八年真题逐年讲解，刷3遍！',
            cover: 'src/img/speech_2.jpg',
            size: '1小时20分钟',
            price: '129'
        }, {
            title: '数学冲刺|真题逐年讲解',
            describe: '八年真题逐年讲解，刷3遍！',
            cover: 'src/img/speech_3.jpg',
            size: '1小时20分钟',
            price: ''
        }, {
            title: '数学冲刺|真题逐年讲解',
            describe: '八年真题逐年讲解，刷3遍！',
            cover: 'src/img/speech_4.jpg',
            size: '1小时20分钟',
            price: '99'
        }, {
            title: '数学冲刺|真题逐年讲解',
            describe: '八年真题逐年讲解，刷3遍！',
            cover: 'src/img/speech_5.jpg',
            size: '1小时20分钟',
            price: ''
        }]
        let hot = ce('div', {class: 'hot-wrap'}, [
            ce('h3', {class: 'chunk-title'}, [' - 热门推荐 -']),
            ce('ul', {class: 'hot-list'}, hotList.map(function(item){
                return ce('li', {class: 'hot-item'}, [
                    ce('div', {class: 'img-box'}, [
                        ce('img', {src: item.cover})
                    ]),
                    ce('div', {class: 'info-box'}, [
                        ce('h4', {class: 'title'}, [item.title]),
                        ce('p', {class: 'describe'}, [item.describe]),
                        ce('p', {class: 'time'}, [item.size])
                    ]),
                    ce('div', {class: 'price-box'},[
                        ce('span', {class: 'price'}, [item.price || '免费'])
                    ])
                ])
            })),
            ce('a', {class: 'chunk-title', href: '#/all'}, ['查看全部'])
        ]);

        let advert = ce('div', {class: 'advert-wrap'}, [
            ce('div', {class: 'img-box'}, [
                ce('img', {src: 'src/img/banner_9.jpg'})
            ])
        ]);

        let all = ce('div', {class: 'all-wrap'}, [
            ce('a', {href: '#/all'}, ['全部课堂'])
        ]);
        return ce('div', {class: 'home-wrap'}, [
            search,
            !this.state.isSearch ? ce('div', null, [
                banner,
                activity,
                personalize,
                teacher,
                hot,
                advert
            ]) : ce(Search)
        ])
    }

}); 