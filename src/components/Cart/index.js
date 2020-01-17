import React from "react";
import { connect } from 'react-redux';
import "./cart.css";
import * as cartActions from "../../actions/cartActions"
import Checkout from "../Checkout";
class Cart extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            showModal:false
        }
        this.updateCartDetails=this.updateCartDetails.bind(this);
        this.openModal=this.openModal.bind(this);
        this.closeModal=this.closeModal.bind(this);
    }
    updateCartDetails(productId,quantity,addOrRemove)
    {
        if(quantity==="")
            return false;
        this.props.updateMyCart(productId,parseInt(quantity),addOrRemove)
    }
    openModal()
    {
            this.setState({
                showModal:true
            })
    }
    closeModal()
    {
        this.setState({
            showModal:false
        })
    }

    render(){
        let totalPrice=0;
        const {cartItems}=this.props;
        return (<div className="cartContainer">{cartItems.length===0?(<div>Your cart is empty. Please add some items to cart.</div>):
        <div>{cartItems.map((item,index)=><div key={index} className="cartItemHolder">
                <div className="cartItemDetails">
                        <div className="imageAndCount">
                        
                            <div className="cartImageHolder"><img src={process.env.PUBLIC_URL + "/images/"+item.productInfo[0].image} alt="productImage"></img></div>
                            <div className="itemQuantity"><span className="reduceOne" onClick={()=>this.updateCartDetails(item.id,1,"remove")}>-</span><input type="text" value={item.quantity} name={"itemQuantity"+index} id={"itemQuantity"+index} className="itemQuantity" onChange={(e)=>this.updateCartDetails(item.id,e.target.value,"unknown")}/><span className="addOneMore" onClick={()=>this.updateCartDetails(item.id,1,"add")}>+</span></div>
                        </div>
                        <div className="productInfo">
                                <div className="productName">{item.productInfo[0].categoryName}</div>
                            <div className="productPrice">{item.productInfo[0].categoryCostCurrency+" "+item.productInfo[0].categoryAmount}</div>
                        </div>
                </div>
                <div className="itemPriceCal">
                    <span className="hide">{(totalPrice+=item.quantity*item.productInfo[0].categoryAmount)}</span>
                    <div className="priceCalc">{item.quantity}*{item.productInfo[0].categoryAmount}={item.quantity*item.productInfo[0].categoryAmount}</div>
                </div>
        </div>)}
        <div className="totalAndButton">
            <div className="totalAmount">Total price: ${totalPrice}</div>
            <div className="checkoutBtnHolder"><button id="checkout" name="checkout" className="checkoutBtn" onClick={this.openModal}>Check out <span className="x-show hide">${totalPrice}</span></button></div>
        </div>
        </div>
       
    }{this.state.showModal?<Checkout closeModal={this.closeModal}/>:""}</div>)
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