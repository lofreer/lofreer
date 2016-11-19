import React from 'react'
import Marked from 'marked'

export default class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            dataIsReady: false
        }
    }
    componentDidMount() {
        console.log(this.props)
        fetch(`https://api.github.com/repos/lofreer/lofreer/issues/${this.props.params.id}`)
            .then(
                res => res.json()
            ).then(
                data => this.setState({ data, dataIsReady: true })
            )
    }
    render() {
        const { data, dataIsReady } = this.state
        if (dataIsReady) {
            return (
                <div dangerouslySetInnerHTML={{__html: Marked(data.body)}}></div>
            )
        } else {
            return <div>Loading</div>
        }
    }
}
