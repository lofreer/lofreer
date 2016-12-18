import Simple from './simple';

const ce = Simple.createElement;

export default Simple.createClass({

    render: function() {       

        return ce('div', null, ['search']);

    }

});