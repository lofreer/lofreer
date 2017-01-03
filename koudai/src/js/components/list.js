import Simple from './simple';
import './list.less';

const ce = Simple.createElement;

export default Simple.createClass({

    render: function() {

        let lists = this.props.data;

        let classItem = function(data) {
            return ce('li', {class: 'item'}, [
                ce('a', {href: `#/room/${data.id}`}, [
                    ce('div', {class: 'img-box'}, [
                        ce('img', {src: data.img})
                    ]),
                    ce('div', {class: 'info-box'}, [
                        ce('p', {class: 'title'}, [ data.title ]),
                        ce('p', {class: 'preface'}, [ data.preface ])
                    ]),
                    ce('div', {class: 'other-box'}, [
                        ce('div', {class: 'pv'}, [
                            ce('span', {class: 'icon icon-user'}),
                            ce('span', null, ['1.2万'])
                        ])
                    ])
                ])
            ]);
        };

        return ce('ul', {class: 'list'}, lists.map(function(item) {
            return classItem(item);
        }));
    }

});