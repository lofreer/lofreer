import Simple from './simple';

const ce = Simple.createElement;

export default Simple.createClass({

    render: function() {

        return ce('select',{}, [
            ce('option', {}, '选择框')
        ])
    }

});