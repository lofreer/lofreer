import { Simple } from 'components';


const ce = Simple.createElement;

export default Simple.createClass({
    
    render: function() {
        document.title = '口袋题库-课程章节';

        return ce('div', {class: 'class-wrap'}, [
           'classChapter'
        ])
    }

}); 