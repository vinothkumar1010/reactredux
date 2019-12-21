import React from "react";
import { connect } from 'react-redux';
import "./products.css";
import * as productActions from "../../actions/productActions";
class Products extends React.PureComponent
{

 
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