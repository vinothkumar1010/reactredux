import React from 'react';
import configureStore from "../store/store"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Home from "./Home"
import Login from "./Login"
import Navbar from "./Navbar"
import Cart from "./Cart"
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
export default function App() {
  const { persistor, store }  = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router >
          <div>
          <Navbar/>
            <Switch>
                <Route exact path="/login" component={Login} />  
                <Route exact path="/cart" component={Cart} />  
                <Route exact path="/" component={Home} />           
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}
