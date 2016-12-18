import { Simple, List } from 'components';
import datas from '../api/data';


const ce = Simple.createElement;

export default Simple.createClass({
    
    render: function() {
        document.title = '口袋题库-全部课堂';

        return ce('div', null, [
            ce(List, {data: datas.list})
        ])
    }

}); 