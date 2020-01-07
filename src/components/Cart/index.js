import React from "react";
import { connect } from 'react-redux';
import "./cart.css";
import * as cartActions from "../../actions/cartActions"
class Cart extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        const {cartItems}=this.props;
        return (<div>{cartItems.length===0?(<div>Your cart is empty. Please add some items to cart.</div>):
        cartItems.map((item,index)=><div key={index}>{item.id+" "+item.quantity}</div>)
        }</div>)
    }
}
const mapStateToProps = (state) => {
    return {
      cartItems:state.cart.cartItems
    }
  };
  
 const mapDispatchToProps = (dispatch) => {
    return {
      addToMyCart:(productId)=>dispatch(cartActions.addToCart(productId))
    };
  } 
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);