import React from "react";
import ReactDOM from "react-dom";
import Starships from "./starships";
import "./styles.css";

function App() {
    return (
        <div className="App">
            <h1>Starships</h1>
            <Starships />
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
