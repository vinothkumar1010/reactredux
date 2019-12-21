import React from "react";
import { connect } from 'react-redux';
import "./products.css";
import * as productActions from "../../actions/productActions";
class Products extends React.PureComponent
{
 
  componentDidMount()
  {
    console.log("ccccc")
    const userLoggedInStatus=this.props.userLoggedIn
    
  this.props.productsCatalog(userLoggedInStatus);
  }
    render()
    {
      const {pending,products,error}=this.props;
     // const allProducts=this.props.product;

      console.log(products)
        return (
        
        <div>
            <h1>All Products</h1>
        {pending ? (<p>Loading</p>):(
             <div className="allProductContainer">{products.map((productInfo,index)=><div key={index} className="product">
             <img src={process.env.PUBLIC_URL + "/images/"+productInfo.image} alt={productInfo.productName}/>
             <div>{productInfo.productId}</div> 
             <div>{productInfo.productName}</div>
             <div>{productInfo.productDescription}</div>
             </div>
           )}
           </div>
        )}
         {/*  */}
        </div>);
    }
}
const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
      // You can now say this.props.books
      pending:state.products.pending,
      error:state.products.error,
      products: state.products.products,
      userLoggedIn:state.login.isLoginSuccess
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      productsCatalog:(statusofLogin)=>dispatch(productActions.fetchProducts(statusofLogin))
    };
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products );