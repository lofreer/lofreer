import { Simple, Info, Chapter } from 'components';
import './class.less';

const ce = Simple.createElement;

export default Simple.createClass({

    getInitialState: function() {
        
    },

    componentWillMount: function() {
        
    },
    
    render: function() {
        let { cid, type } = this.props.params;
        let isInfo = type === 'info';

        let video = ce('div', {class: 'video-wrap'}, [
            'video window'
        ]);

        let tab = ce('div', {class: 'tab-wrap'}, [
            ce('div', {class: isInfo ? 'active' : ''}, [
                ce('a', {href: `#/room/${cid}/info`}, ['课程详情'])
            ]),
            ce('div', {class: isInfo ? '' : 'active'}, [
                ce('a', {href: `#/room/${cid}/chapter`}, ['课程目录'])
            ])
        ]);

        let footer = ce('div', {class: 'footer-wrap'}, [
            ce('div', {class: 'download'}, [
                ce('span', {class: 'icon icon-download'}),
                ce('span', {class: 'text'}, ['下载'])
            ]),
            ce('div', {class: 'collect'}, [
                ce('span', {class: 'icon icon-star'}),
                ce('span', {class: 'text'}, ['收藏'])
            ]),
            ce('div', {class: 'add'}, [
                ce('span', {class: 'text'}, ['添加至我的课程'])
            ])
        ])

        return ce('div', {class: 'class-wrap'}, [
            video,
            tab,
            ce('div', {class: 'content-wrap'}, [
                ce(isInfo ? Info : Chapter, {cid: cid})
            ]),
            footer
        ])
    }

}); 