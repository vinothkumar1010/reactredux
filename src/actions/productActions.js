

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const fetchProductsPending=()=> {
    return {
        type: FETCH_PRODUCTS_PENDING
    }
}

export const fetchProductsSuccess=(products)=> {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        products: products
    }
}
export const  fetchProductsError=(error)=> {
    return {
        type: FETCH_PRODUCTS_ERROR,
        error: error
    }
}
export const fetchProducts = (userLoggedIn) => {
    return (dispatch) => {
      // Returns a promise
      return import("../SampleProducts").then(products =>{
        let productCatalog="";
        const allProducts=products.default;
          if(!userLoggedIn)
            productCatalog=allProducts.filter(product=>product.onlyForUser===false)
        else
            productCatalog=allProducts.filter(product=>product.onlyForUser===true)
        dispatch(fetchProductsSuccess(productCatalog))
        
      }
       
      );
      
    };
  };


