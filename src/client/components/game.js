import "./game.scss";

import React from "react";

import {ContainerBase} from "../lib/component";

class GameContainer extends ContainerBase {
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