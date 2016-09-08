import 'simple.css/dist/simple.min.css';
import './assets/css/fonticon.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Main from './components/Main';
import Footer from './components/footer';


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {'label': ''};
		this.switchLabel = this.switchLabel.bind(this);
	}

	switchLabel(label) {
		this.setState({'label': label});
	}

	render() {
		return (
			<div className="container grid-960">
				<Header sendAction={this.switchLabel}/>
				<Main label={this.state.label}/>
				<Footer/>
		</div>
		);
	}
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);