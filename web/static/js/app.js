// Import Styles
//
// Let webpack handle the styles 
// we use a very module structure for styles and components
import "bootstrap/dist/css/bootstrap.css"
import "css/app.css"

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html/web/static/js/phoenix_html"
import React from "react"
import ReactDOM from "react-dom"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".
import socket from "./socket"

// Import our main App component and mount it
import App from "./components/app"

ReactDOM.render(<App />, document.getElementById("app"));
