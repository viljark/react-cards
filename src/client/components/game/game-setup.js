import "./game-board.scss";

import React from "react";
import _ from "lodash";
import * as A from "../../actions";
import {ContainerBase} from "../../lib/component";

export default class GameSetup extends ContainerBase {
	render() {
		return <section className="c-game-setup">Game setup</section>;
	}
}