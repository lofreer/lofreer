import { Simple } from 'components';
import datas from '../api/data';


const ce = Simple.createElement;

export default Simple.createClass({
    
    render: function() {
        

        return ce('div', {class: 'class-wrap'}, [
           'classInfo',
           ce('a', {href: '#/teacher/55'}, ['名师详情'])
        ])
    }

}); 