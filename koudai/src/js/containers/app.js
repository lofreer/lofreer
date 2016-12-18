import { Simple } from 'components';
const ce = Simple.createElement;

export default Simple.createClass({
    
    render: function() {
        return this.props.children
    }

}); 