import React from 'react';
import configureStore from "../store/store"
import { Provider } from 'react-redux';
import Home from "./Home"
import Login from "./Login"
import Navbar from "./Navbar"
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
export default function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
    <Router >
      <div>
      <Navbar/>
        <Switch>
            <Route exact path="/login" component={Login} />  
            <Route exact path="/" component={Home} />           
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}
