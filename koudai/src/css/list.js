import Simple from './simple';

const ce = Simple.createElement;

export default Simple.createClass({

    render: function() {

        let lists = this.props.data;

        let classItem = function(data) {
            return ce('li', {class: 'class-item'}, [
                ce('a', {href: `#/room/${data.id}`}, [
                    ce('div', {class: 'img-box'}, [
                        ce('img', {src: data.img})
                    ]),
                    ce('div', {class: 'text-box'}, [
                        ce('p', {class: 'title'}, [ data.title ]),
                        ce('p', {class: 'preface'}, [ data.preface ])
                    ])
                ])
            ]);
        };

        return ce('ul', {class: 'class-list'}, lists.map(function(item) {
            return classItem(item);
        }));
    }

});