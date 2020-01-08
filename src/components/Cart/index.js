import React from "react";
import { connect } from 'react-redux';
import "./cart.css";
import * as cartActions from "../../actions/cartActions"
class Cart extends React.Component{
    constructor(props)
    {
        super(props);
        this.updateCartDetails=this.updateCartDetails.bind(this);
    }
    updateCartDetails(productId,quantity,addOrRemove)
    {
        if(quantity==="")
            return false;
        this.props.updateMyCart(productId,parseInt(quantity),addOrRemove)
    }
    render(){
        const {cartItems}=this.props;
        return (<div className="cartContainer">{cartItems.length===0?(<div>Your cart is empty. Please add some items to cart.</div>):
        cartItems.map((item,index)=><div key={index} className="cartItemHolder">
                <div className="cartItemDetails">
                        <div className="imageAndCount">
                        
                            <div className="cartImageHolder"><img src={process.env.PUBLIC_URL + "/images/"+item.productInfo[0].image} alt="productImage"></img></div>
                            <div className="itemQuantity"><span className="reduceOne" onClick={()=>this.updateCartDetails(item.id,1,"remove")}>-</span><input type="text" value={item.quantity} name="itemQuantity" id="itemQuantity" onChange={(e)=>this.updateCartDetails(item.id,e.target.value,"unknown")}/><span className="addOneMore" onClick={()=>this.updateCartDetails(item.id,1,"add")}>+</span></div>
                        </div>
                        <div className="productInfo">
                                <div className="productName">{item.productInfo[0].categoryName}</div>
                            <div className="productPrice">{item.productInfo[0].categoryCostCurrency+" "+item.productInfo[0].categoryAmount}</div>
                        </div>
                </div>
                <div className="itemPriceCal">
                    <div className="priceCalc">{item.quantity}*{item.productInfo[0].categoryAmount}={item.quantity*item.productInfo[0].categoryAmount}</div>
                </div>
        </div>)
       
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
      updateMyCart:(productId,quantity,addOrRemove)=>dispatch(cartActions.updateCart(productId,quantity,addOrRemove))

    };
  } 
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);