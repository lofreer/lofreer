import { Simple, List, Select } from 'components';
import datas from '../../api/data';
import './list.less';


const ce = Simple.createElement;

export default Simple.createClass({

    componentWillMount: function() {
        
    },

    handleSwitchType: function(record) {
        this.props.router.go(`#/class/${record.type}`);
    },
    
    render: function() {
        let self = this;
        let isAll = this.props.params.type === 'all';

        let typeList = [{
            type: 'politics',
            name: '政治',
            icon: 'icon icon-hot'
        }, {
            type: 'english',
            name: '英语',
            icon: 'icon icon-hot'
        }, {
            type: 'maths',
            name: '数学',
            icon: 'icon icon-hot'
        }, {
            type: 'cet',
            name: '四六级',
            icon: 'icon icon-hot'
        }, {
            type: 'professional',
            name: '专业课',
            icon: 'icon icon-hot'
        }];
        let types = ce('ul', {class: 'type-list'}, typeList.map(function(item){
            return ce('li', {class: 'type-item', onClick: self.handleSwitchType.bind(self, item)}, [
                ce('span', {class: item.icon}),
                ce('p', {class: 'name'}, [item.name])
            ])
        })); 

        let selects = ce('div', {class: 'select-lsit'}, [
            ce(Select),
            ce(Select),
            ce(Select),
            ce(Select)
        ]);

        document.title = '口袋题库-全部课堂';

        return ce('div', {class: 'list-wrap'}, [
            isAll && types,
            selects,
            ce(List, {data: datas.list})
        ]);
    }

}); 