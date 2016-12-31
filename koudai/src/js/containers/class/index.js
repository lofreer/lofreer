import { Simple } from 'components';

const ce = Simple.createElement;

export default Simple.createClass({
    
    render: function() {
        let { id } = this.props.params;

        let banner = ce('div', {class: 'class-banner'}, [
            'class banner'
        ]);

        let tab = ce('div', {class: 'class-tab'}, [
            ce('div', null, [
                ce('a', {href: `#/${id}/info`}, ['课程详情'])
            ]),
            ce('div', null, [
                ce('a', {href: `#/${id}/chapter`}, ['课程目录'])
            ])
        ])

        return ce('div', {class: 'class-wrap'}, [
            banner,
            tab,
            this.props.children
        ])
    }

}); 