import { Simple, List } from 'components';
import datas from '../api/data';


const ce = Simple.createElement;

export default Simple.createClass({
    
    render: function() {
        return ce('div', null, [
            ce(List, {data: datas.list})
        ])
    }

}); 