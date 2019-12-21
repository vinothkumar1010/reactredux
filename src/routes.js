import React  from 'react';
import {Route} from 'react-router';
import Home from "./components/Home"
import App from "./components/App"
export default (
  <div><Route path="/" component={App}/>
  <Route path="/" component={Home}/>
  </div>
);