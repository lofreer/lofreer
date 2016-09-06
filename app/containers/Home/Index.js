import React from 'react'
import { Link } from 'react-router'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            dataIsReady: false
        }
    }
    componentDidMount() {
        fetch('https://api.github.com/repos/lofreer/lofreer/issues')
            .then(
                res => res.json()
            ).then(
                data => this.setState({ data, dataIsReady: true })
            )
    }

    render() {
        console.log(this.state.data)
        const { data, dataIsReady } = this.state
        if (dataIsReady) {
            return (
                <div className="main container">
                <ul>
                    {data.map((item, index) => {
                        return <li key={index} className="article-item">
                            <div className="article-box">
                                <a className="typeicon video" href=""><em className="icon icon-video"></em></a>
                                <div className="content">
                                    <h2 className="title" ><Link to={`article/${item.number}`}>{item.title}</Link></h2>
                                    <div className="text">
                                        <p style={{textAlign:'center'}}><a href=""><img src="./assets/images/test.jpg" alt="有些路，只能一个人走"/></a></p>
                                        <p>致歉先致歉各位支持我的博友，的确是好久没有来更新博客了，距离上篇博文已有四个月时间了，追其原因，无非是懒，上班忙，都是借口，哈哈~忙碌工作上的确最近强度加强了不少，这也使得我在技能上略有提升，尝试了一些新的前端框架，公司准备开始采用前后分离的工作模式，这也使得我们前端有了大展身手的机会，很荣幸，我们老大叫我第一个尝试这种开发方式，正好用在了公司内部项目上，虽然前期碰到了各种坑，但相信，黎明的曙光即将到来。生活有些路，只能一个人走；有些事，只能一人抗；过年过来，就入手了一台Kindle Paperwhite2，说是今年要多读书，上手用起来感觉还是很不错的，刚开始还是不太习惯这水墨屏的，点击一下屏幕&nbsp;[...]</p>
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
            return <div>Loading</div>
        }
    }
}
