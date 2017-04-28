import "./game.scss";

import React, {Component} from "react";

class GameContainer extends Component {
	render() {
		return <p>Game 1</p>;
	}
}

class GameSidebar extends Component {
	render() {
		return <p>Game sidebar</p>;
	}
}

export default {
	Main: GameContainer,
	Sidebar: GameSidebar
};