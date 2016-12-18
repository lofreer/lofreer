import { Simple, Search } from 'components';

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
            ce('span', {class: 'search-cancel' + (this.state.isSearch ? ' show' : ''), onClick: this.handleSearch.bind(this, false)}, ['cancel'])
        ]);

        let banner = ce('div', {class: 'banner-wrap'}, [
            ce('div', null, ['banner'])
        ]);

        let activity = ce('div', {class: 'activity-wrap'}, [
            ce('div', null, ['activity'])
        ]);

        let teacher = ce('div', {class: 'teacher-wrap'}, [
            ce('div', null, ['teacher'])
        ]);

        let personalize = ce('div', {class: 'personalize-wrap'}, [
            ce('div', null, ['personalize'])
        ]);

        let hot = ce('div', {class: 'hot-wrap'}, [
            ce('div', null, ['hot'])
        ]);

        let advert = ce('div', {class: 'advert-wrap'}, [
            ce('div', null, ['advert'])
        ]);

        let all = ce('div', {class: 'all-wrap'}, [
            ce('a', {href: '#/all'}, ['全部课堂'])
        ]);
        return ce('div', {class: 'k-wrap'}, [
            search,
            !this.state.isSearch ? ce('div', null, [
                banner,
                activity,
                teacher,
                personalize,
                hot,
                all,
                advert
            ]) : ce(Search)
        ])
    }

}); 