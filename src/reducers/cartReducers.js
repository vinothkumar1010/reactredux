
import {CART_ADD_PENDING, CART_ADD_SUCCESS, CART_ADD_FAILURE, CART_LOAD_PENDING, CART_LOAD_SUCCESS, CART_LOAD_FAILURE, CART_DELETE_SUCCESS } from '../actions/cartActions';

const initialState = {
    pending: true,//since we are loading initially this we put this as true
    cartItems: [],
    error: null
}

export default (state = initialState, action) =>{
    switch(action.type) {
        case CART_ADD_PENDING: 
            return {
                ...state,
                pending: true
            }
        case CART_ADD_SUCCESS:
            return {
                ...state,
                pending: false,
                cartItems: action.cartItems
            }
        case CART_ADD_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case CART_LOAD_PENDING: 
            return {
                ...state,
                pending: true
            }
        case CART_LOAD_SUCCESS:
            return {
                ...state,
                pending: false,
                cart: action.cart
            }
        case CART_LOAD_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
