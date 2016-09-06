import React from 'react'

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div>导航栏</div>
                <div>{this.props.children}</div>
            </div>
        )
    }
}
