import "./game.scss";
import * as A from "../actions";

import React from "react";

import {ContainerBase} from "../lib/component";

class GameContainer extends ContainerBase {
	componentWillMount() {
		const {stores: {app}} = this.context;
		const {params} = this.props;
		const gameId = parseInt(params.gameId);

		this.subscribe(app.reconnected$, () => this.request(A.gameJoin(gameId)));

		this.request(A.gameJoin(gameId));
	}

	render() {
		return <p>Game 1</p>;
	}
}

class GameSidebar extends ContainerBase {
	render() {
		return <p>Game sidebar</p>;
	}
}

export default {
	Main: GameContainer,
	Sidebar: GameSidebar
};