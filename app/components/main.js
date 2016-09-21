import React from 'react';
import Marked from 'marked';
import Rodal from 'rodal';
import {get} from '../utils/ajax';

import './main.css';
import 'rodal/lib/rodal.css';

export default class Plist extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            list: [],
            dataIsReady: false,
            visible: false,
            article: '',
            aid: ''
        }
	}

	componentWillMount() {
		fetch('https://api.github.com/repos/lofreer/lofreer/issues')
        .then(
            res => res.json()
        ).then(
            data => this.setState({ list: data, dataIsReady: true })
        )
	}

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        fetch(`https://api.github.com/repos/lofreer/lofreer/issues?labels=${nextProps.label}`)
        .then(
            res => res.json()
        ).then(
            data => this.setState({ list: data, dataIsReady: true })
        )
    }

    articleRender(id, index) {
        fetch(`https://api.github.com/repos/lofreer/lofreer/issues/${id}`)
        .then(
            res => res.json()
        ).then(
            data => {
                console.log(data);
                this.setState({ article: data.body, aid: index })
                this.show()
            }
        )
    }

    show() {
        this.setState({ visible: true });
        console.log(this.state)
    }

    hide() {
        this.setState({ visible: false })
    }

	render() {
        var self = this;
        const { list, dataIsReady } = this.state
        console.log(list)
        if (dataIsReady) {
            return (
                <div className="main container grid-960">
                    <ul>
                        {list.map((item, index) => {
                            return <li key={index} className="article-item">
                                <div className="article-box">
                                    <a className="typeicon video" href=""><em className="icon icon-video"></em></a>
                                    <div className="content">
                                        <h2 className="title" onClick={function(){self.articleRender(item.number, index)}}>{item.title}</h2>
                                        <Rodal visible={self.state.visible && self.state.aid === index} onClose={self.hide.bind(self)}>
                                            {self.state.article}
                                        </Rodal>
                                        <div className="text">
                                            <p style={{textAlign:'center'}}><a href=""><img src="/app/assets/images/test.jpg"/></a></p>
                                            <p>{item.body}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="article-info">
                                    <a className="time" href=""><em className="icon icon-time"></em><span>2015 年 8 月 9 日</span></a>
                                    <a className="like" href=""><em className="icon icon-read"></em><span>112,336</span></a>
                                    <a className="comment" href=""><em className="icon icon-message"></em><span>58</span></a>
                                    <span className="sep">/</span>
                                    <a className="from" href="">密思</a>
                                    <span className="sep">/</span>
                                    <p className="tags">
                                        <span className="taglb">标签:&nbsp;</span>
                                        <a href="">Mexam</a>
                                        <a href="">MPreview.mobile</a>
                                        <a href="">生活随笔</a>
                                    </p>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            )
        } else {
            return <div className="loading"></div>
        }
    }
}
