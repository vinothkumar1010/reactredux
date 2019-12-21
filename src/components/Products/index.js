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
        
        <div>
            <h1>Product Categories</h1>
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