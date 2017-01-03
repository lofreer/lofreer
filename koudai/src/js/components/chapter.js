import Simple from './simple';
import './chapter.less';

const ce = Simple.createElement;

export default Simple.createClass({

    render: function() {
        return ce('div', {class: 'chapter-wrap'});
    }
});