import React from 'react';
import configureStore from "../store/store"
import { Provider } from 'react-redux';
import Home from "./Home"
import Login from "./Login"
//import * as productActions from "../actions/productActions";

import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  const store = configureStore();
  //store.dispatch(productActions.fetchProducts());

  return (
    <Provider store={store}>
    <Router >
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
           <Switch>
            <Route exact path="/login" component={Login} />  
            <Route exact path="/" component={Home} />           
        </Switch>
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}
