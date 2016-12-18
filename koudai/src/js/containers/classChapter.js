import { Simple } from 'components';


const ce = Simple.createElement;

export default Simple.createClass({
    
    render: function() {

        return ce('div', {class: 'class-wrap'}, [
           'classChapter'
        ])
    }

}); 