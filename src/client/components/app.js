import "./app.scss";

import React, {Component} from "react";

class AppContainer extends Component {
	componentDidMount() {
		console.log("app.js mounted 1");
	}
	render() {
		return (
			<section>
				<h1>Yo world</h1>
				<button onClick={this._click.bind(this)}>click me</button>
			</section>
		);
	}
	_click() {
		console.log("im clicked");
	}
}

export default AppContainer;