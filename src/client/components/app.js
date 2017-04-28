import "./app.scss";

import React, {Component} from "react";

class AppContainer extends Component {
	componentDidMount() {
		console.log("app.js mounted 1");
	}
	render() {
		const {Main, Sidebar, match} = this.props;
		console.log(this.props);
		return (
			<div className={`c-application`}>
				<div className="inner">
					<div className="sidebar">
						<Sidebar {...match} />
					</div>
					<div className="main">
						<Main {...match} />
					</div>
				</div>
			</div>
		);
	}
	_click() {
		console.log("im clicked");
	}
}

export default AppContainer;