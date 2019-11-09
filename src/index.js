import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import Posts from "./views/posts";
// import CreatePost from "./views/Posts";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./config/store";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import posts from "./views/posts";
import createpost from "./views/posts/CreatePost";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
     <Router history={hist}>
      <Switch>
        <Route path="/create_post" component={createpost} />
        <Route path="*" component={posts} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
