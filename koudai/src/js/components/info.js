import Simple from './simple';
import './info.less';

const ce = Simple.createElement;

export default Simple.createClass({

    componentWillMount: function() {
        
    },

    render: function() {
        return ce('div', {class: 'info-wrap'})
    }

});