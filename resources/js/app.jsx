import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes";
import "../css/app.css";
import { Provider } from 'react-redux';

import { store } from '../store/store';
ReactDOM.createRoot(document.getElementById("app")).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
