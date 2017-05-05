import "./game.scss";
import * as A from "../actions";

import React from "react";
import { withRouter } from 'react-router';
import {ContainerBase} from "../lib/component";

class GameContainer extends ContainerBase {
	componentWillMount() {
		const {stores: {app}} = this.context;
		const {match: {params}} = this.props;
		const gameId = parseInt(params.gameId);
		this._gameId = gameId;
		this.subscribe(app.reconnected$, () => this.request(A.gameJoin(gameId)));

		this.request(A.gameJoin(gameId));
	}

	render() {
		return <p>Game {this._gameId}</p>;
	}
}

class GameSidebar extends ContainerBase {
	constructor(props) {
		super(props);

		this._exitGame = () => this.props.history.push("/");
		this._login = () => this.dispatch(A.dialogSet(A.DIALOG_LOGIN, true));
	}

	componentWillMount() {
		const {stores: {user, game}} = this.context;
		this.subscribe(user.opLogin$, opLogin => this.setState({opLogin}));
		this.subscribe(game.view$, game => this.setState({game}));
	}

	render() {
		const {opLogin, game} = this.state;

		return (
			<section className="c-game-sidebar">
				<div className="m-sidebar-buttons">
					{!opLogin.can ? null :
						<button className="m-button primary" onClick={this._login}>
							Login to join game
						</button>}
					<button className="m-button" onClick={this._exitGame}>Leave game</button>
				</div>
				{game.step === A.STEP_DISPOSED ? null :
				<PlayerList players={game.players} />}
			</section>
		);
	}
}

function PlayerList({players}) {
	return (
		<ul className="c-player-list">
			{players.map(player => {
				const [cls, status] = getPlayerStatus(player);
				return (
					<li key={player.id} className={cls}>
						<div className="details">
							<div className="name">{player.name}</div>
							<div className="score">
								{player.score}
								{player.score === 1 ? " point" : " points"}
							</div>
						</div>
						<div className="status">{status}</div>
					</li>
				);
			})}
		</ul>
	);
}

function getPlayerStatus({isCzar, isWinner, isPlaying}) {
	if (isCzar) return ["is-czar", "czar"];
	if (isWinner) return ["is-winner", "winner!"];
	if (isPlaying) return ["is-playing", "playing"];
	return ["", ""];

}

export default {
	Main: withRouter(GameContainer),
	Sidebar: withRouter(GameSidebar)
};