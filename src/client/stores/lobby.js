import {Observable} from "rxjs";
import {Validator} from "shared/validation";
import {validateMessage} from "shared/validation/chat";
import {mapOp$} from "shared/observable";
import * as A from "../actions";


const defaultView = {
	messages: [
		{index: 1, name: "Person", message: "this is  2 message"},
		{index: 2, name: "Person 1", message: "this is 2 message"},
		{index: 3, name: "Person 4", message: "this is 1 message"},
		{index: 4, name: "Person2", message: "as das this is33 3 message"},
	],
	games: [
		{title: "game 1", id: 1, players: ["one", "two", "three"]},
		{title: "game 2", id: 2, players: ["one", "two", "three"]},
		{title: "game 3", id: 3, players: ["one", "two", "three"]},
	]
};

export default class LobbyStore {
	constructor({dispatcher}, user) {
		this.view$ = Observable.of(defaultView);

		dispatcher.onRequest({
			[A.LOBBY_JOIN]: action => dispatcher.succeed(action),
			[A.LOBBY_SEND_MESSAGE]: action => {
				const validator = new Validator();
				if (!user.isLoggedIn)
					validator.push("You must be logged in");
				validator.push(validateMessage(action.message));
				if (validator.didFail) {
					dispatcher.fail(action, validator.message);
					return;
				}
				// TODO: send to socket
			}
		});

		this.opSendMessage$ = mapOp$(
			dispatcher.on$(A.LOBBY_SEND_MESSAGE),
			user.details$.map(u => u.isLoggedIn));
	}
}