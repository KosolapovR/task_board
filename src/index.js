import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./state/store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById("root")
);
