import { combineReducers } from 'redux';
import products from "./productsReducers"
import login from "./loginReducers"

export default combineReducers({
   products:products,
   login:login
  // More reducers if there are
  // can go here
});