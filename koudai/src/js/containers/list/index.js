import { Simple, List, Select } from 'components';
import datas from '../../api/data';
import './list.less';


const ce = Simple.createElement;

export default Simple.createClass({

    componentWillMount: function() {
        console.log(this)
    },
    
    render: function() {

        let typeList = [{
            name: '政治',
            icon: 'icon icon-hot'
        }, {
            name: '英语',
            icon: 'icon icon-hot'
        }, {
            name: '数学',
            icon: 'icon icon-hot'
        }, {
            name: '四六级',
            icon: 'icon icon-hot'
        }, {
            name: '专业课',
            icon: 'icon icon-hot'
        }];
        let types = ce('ul', {class: 'type-list'}, typeList.map(function(item){
            return ce('li', {class: 'type-item'}, [
                ce('span', {class: item.icon}),
                ce('p', {class: 'name'}, [item.name])
            ])
        })); 

        document.title = '口袋题库-全部课堂';

        return ce('div', {class: 'list-wrap'}, [
            types,
            ce(Select),
            ce(List, {data: datas.list})
        ]);
    }

}); 