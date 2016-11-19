import React from 'react';

export default class Plist extends React.Component {

	constructor(props) {
		super(props);		
	}

	render() {
        return (
        	<footer className="footer container grid-960 text-center">
				<p>Copyright © 2016 <a href="http://lofreer.com/">L.F</a> All Rights Reserved <a href="http://www.miitbeian.gov.cn/" target="_blank">鄂ICP备16009725号-2</a></p>
			</footer>
        )
    }
}