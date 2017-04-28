import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import AppContainer from "./components/app";
import Lobby from "./components/lobby";
import Game from "./components/game";


export default function () {
	return (
		<div>
			<Switch>
				<Route exact path="/" render={(match) => (
					<AppContainer {...Lobby} {...match}/>
				)}/>
				<Route exact path="/game/:gameId" render={(match) => (
					<AppContainer {...Game}  {...match}/>
				)}/>
				<Redirect from="*" to="/"/>
			</Switch>
		</div>

	);
}