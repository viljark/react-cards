import "./client.scss";

import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";


// ------------------
// Render
function main() {
	const routes = require("./routes").default();
	ReactDom.render(
		<Router>
			{routes}
		</Router>,
		document.getElementById("mount"));
}

// ------------------
// Misc
if (module.hot) {
	module.hot.accept("./routes", () => {
		main();
	});
}

// ------------------
// Go
main();