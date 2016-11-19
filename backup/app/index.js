import 'simple.css/dist/simple.min.css';
import './assets/css/fonticon.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Main from './components/Main';
import Footer from './components/footer';
import Editor from './components/editor';


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
			<div className="container grid-960" style={{'paddingBottom':'50px'}}>
				<Header sendAction={this.switchLabel}/>
				<Main label={this.state.label}/>
				<Footer/>
				<Editor id="editor" style={{'height': '300px'}}/>
		</div>
		);
	}
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);