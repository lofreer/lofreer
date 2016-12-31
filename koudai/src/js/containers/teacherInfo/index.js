import { Simple } from 'components';


const ce = Simple.createElement;

export default Simple.createClass({
    
    render: function() {
        document.title = '口袋题库-名师详情';

        return ce('div', {class: 'class-wrap'}, [
           'teacherInfo'
        ])
    }

}); 