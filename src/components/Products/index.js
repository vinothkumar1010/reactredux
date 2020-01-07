import React from "react";
import { connect } from 'react-redux';
import "./products.css";
import * as productActions from "../../actions/productActions";
import * as cartActions from "../../actions/cartActions"
class Products extends React.PureComponent
{

 constructor(props)
 {
  super(props);
  this.addToCart=this.addToCart.bind(this)
 }
 addToCart(id)
 {
  // alert("hai")
   this.props.addToMyCart(id);
 }
  componentDidMount()
  {
    this.props.productsCatalog(this.props.userLoggedIn);
  }
  componentDidUpdate(prevProps){
    if(prevProps.userLoggedIn !== this.props.userLoggedIn){
        this.setState({          
          userLoggedIn: this.props.userLoggedIn
        });
        this.props.productsCatalog(this.props.userLoggedIn);
    }
  }
    render()
    {
      console.log(this.props.cartItems)
      const {pending,products}=this.props;
        return (
        
        <div className="allProductContainer">
            <h1>Product Categories</h1>
            {pending ? (<p>Loading</p>):(products.length===0)?<div className="product noProducts">
              <div className="noProductInfo">We are working hard to bring some products to you.....</div>
              <div className="imageHolder"> <img src={process.env.PUBLIC_URL + "/images/working.jpg"} alt="we are working"/></div>
            </div>:(
        <div >{products.map((productInfo,index)=><div key={index} className="product">
              <div className="imageHolder"> <img src={process.env.PUBLIC_URL + "/images/"+productInfo.image} alt={productInfo.categoryName}/></div>
             <div className="porductInformation">
                  <div className="categoryName">{productInfo.categoryName}</div>
                  <div className="categoryDes">{productInfo.categoryDescription}</div>
                  <div className="priceRange">{"Price range: "+productInfo.categoryCostCurrency+" "+productInfo.categoryAmount}</div> 

              </div>
              <div className="cartSection">
                  <div className="cart" onClick={()=>this.addToCart(productInfo.categoryId)}>Add to cart</div>
                  <div className="likes">
                      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" role="img" className="icon "><path d="m18.199 2.04c-2.606-.284-4.262.961-6.199 3.008-2.045-2.047-3.593-3.292-6.199-3.008-3.544.388-6.321 4.43-5.718 7.96.966 5.659 5.944 9 11.917 12 5.973-3 10.951-6.341 11.917-12 .603-3.53-2.174-7.572-5.718-7.96z"></path></svg>
                  </div>
                  <div className="buyNow">Buy Now</div>
              </div>
             </div>
           )}
           </div>
        )}
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
      pending:state.products.pending,
      error:state.products.error,
      products: state.products.products,
      userLoggedIn:state.login.isLoginSuccess,
      cartItems:state.cart.cartItems
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      productsCatalog:(statusofLogin)=>dispatch(productActions.fetchProducts(statusofLogin)),
      addToMyCart:(productId)=>dispatch(cartActions.addToCart(productId))
    };
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products );