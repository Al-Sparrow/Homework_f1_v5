import React, { Component } from "react";

import "../styles/App.css";
// import Main from "./center";
// import GeoFindMe from "./Cordinates"
import Forecast from "./Forecast";
class App extends Component {
    render() {
        return (
            <Forecast />
        )
    }
}

export default App;