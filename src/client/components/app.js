import "./app.scss";

import React from "react";
import dialogTypes from "./dialogs";
import {ContainerBase} from "../lib/component";

class AppContainer extends ContainerBase {
	componentWillMount() {
		const {stores: {app}} = this.context;

		this.subscribe(app.dialogs$, dialogs => this.setState({dialogs}));
	}
	render() {
		const {Main, Sidebar, match} = this.props;

		const {dialogs} = this.state;
		const dialogStack = dialogs.map(dialog => {
			const DialogComponent = dialogTypes[dialog.id];
			return <DialogComponent {...dialog.props} key={dialog.id}/>;
		});

		return (
			<div className={`c-application ${dialogStack.length ? "dialogs-open" : "dialogs-closed"}`}>
				<div className="dialogs">
					{dialogStack}
				</div>
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