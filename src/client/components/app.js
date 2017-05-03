import "./app.scss";

import React from "react";
import * as A from "../actions";
import dialogTypes from "./dialogs";
import {ContainerBase} from "../lib/component";

class AppContainer extends ContainerBase {
	componentWillMount() {
		const {stores: {app}, services: {dispatcher}} = this.context;
		const {history} = this.props;
		console.log("router", history);
		this.subscribe(app.dialogs$, dialogs => this.setState({dialogs}));

		this.subscribe(
			dispatcher.onSuccess$(A.GAME_JOIN),
			action => {
				const path = `/game/${action.gameId}`;
				if (history.location.pathname === path) {
					return;
				}
				history.push(path);
			});
		this.subscribe(
			dispatcher.onSuccess$(A.LOBBY_JOIN),
			() => {
				if (history.location.pathname === "/")
					return;
				history.push("/");
			}
		);
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