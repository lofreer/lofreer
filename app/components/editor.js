import React from 'react';
import Edit from 'simple-editor';

export default class Editor extends React.Component {

	constructor(props) {
		super(props);		
	}

    componentDidMount() {
        var editor = Edit.getEditor(this.props.id);
    }

	render() {
        return (
        	<div id={this.props.id} style={this.props.style}></div>
        )
    }
}