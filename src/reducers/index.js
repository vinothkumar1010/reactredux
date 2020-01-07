import { combineReducers } from 'redux';
import products from "./productsReducers"
import login from "./loginReducers"
import cart from  "./cartReducers"

export default combineReducers({
   products:products,
   login:login,
   cart:cart
  // More reducers if there are
  // can go here
});