import "./app.scss";

import React, {Component} from "react";

class AppContainer extends Component {
	componentDidMount() {
		console.log("app.js mounted 1");
	}
	render() {
		return <h1>yo world?!!!</h1>;
	}
}

export default AppContainer;