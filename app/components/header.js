import React from 'react';
import './header.css'

export default class Plist extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			labels: [],
			dataIsReady: false
		}
		this.handleSwitch = this.handleSwitch.bind(this);
	}

	componentDidMount() {
		fetch('https://api.github.com/repos/lofreer/lofreer/labels')
            .then(
                res => res.json()
            ).then(
                data => this.setState({ labels: data, dataIsReady: true })
            )
	}

	handleSwitch(label) {
		if (label === '') return;
		this.props.sendAction(label);
	}

	render() {
		let self = this;
		console.log(this.state.labels)
		const { labels, dataIsReady } = this.state;
		if (dataIsReady) {
		return (
			<header className="header container">
			 	<h1 className="logo">
			 		<a href="/">L.F/肆叶</a>
			 	</h1>
			 	<nav className="nav">
			 		<ul className="nav-list">
			 		{labels.map(function(item, index){
			 			return <li key={index} className="nav-item" onClick={function(){self.handleSwitch(item.name)}}>{item.name}</li>
			 		})}
			 		</ul>
			 	</nav>
			</header>
		)
		} else {
			return <div className="loading"></div>
		}
	}
}