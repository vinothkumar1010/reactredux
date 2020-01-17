export const CART_UPDATE_PENDING = 'CART_ADD_PENDING';
export const CART_UPDATE_SUCCESS = 'CART_ADD_SUCCESS';
export const CART_UPDATE_FAILURE = 'CART_ADD_FAILURE';
export const CART_LOAD_PENDING = 'CART_LOAD_PENDING';
export const CART_LOAD_SUCCESS = 'CART_LOAD_SUCCESS';
export const CART_LOAD_FAILURE = 'CART_LOAD_FAILURE';
export const CART_DELETE_SUCCESS= 'CART_DELETE_SUCCESS';
var currentProductIndex="";
export const cartUpdatePending=(isCartAddPending)=> {
    return {
        type: CART_UPDATE_PENDING,
        isCartAddPending
    }
}
export const cartUpdateSuccess=(cartItems)=> {
    return {
        type: CART_UPDATE_SUCCESS,
        cartItems:cartItems,
        }
    }
export const cartUpdateFailure=(isCartUpdateFailure)=> {
    return {
        type: CART_UPDATE_FAILURE,
        isCartUpdateFailure
        }
    }

export const updateCart=(productId,count=1,addOrRemove="add")=>{
    return (dispatch,getState) => {
        dispatch(cartUpdatePending(true));
        let productsToCart=[...getState().cart.cartItems];
        const hasValue=_isContains(productsToCart,"id",productId,false);
        let listedProducts=getState().products.products;
       
       if(!hasValue)
       {
        let productInfo=listedProducts.filter(function(product){
            return product.categoryId === productId;         
        });
        productsToCart.push({"id":productId,"quantity":1,"productInfo":productInfo}); 
       }
       else
       {
           let quantityofProduct=(addOrRemove==="add")?productsToCart[currentProductIndex]["quantity"]+1:(addOrRemove==="remove")?productsToCart[currentProductIndex]["quantity"]-1:count
           
           if(quantityofProduct!==0)
                productsToCart[currentProductIndex]["quantity"]=quantityofProduct;
            else
                productsToCart.splice(currentProductIndex,1);
        
       }
        dispatch(cartUpdateSuccess(productsToCart)); 
      }
}
export const clearCart=()=>{
    return (dispatch,getState) => {
         dispatch(cartUpdatePending(true));
         let productsToCart=[];
         dispatch(cartUpdateSuccess(productsToCart)); 
    }
}
function _isContains(json, keyname, value,fromInside,index) {
    currentProductIndex="";
    return Object.keys(json).some(key => {
            
            let keyExists=typeof json[key] === 'object' ? 
            _isContains(json[key], keyname, value,true,key) : key === keyname && json[key] === value;
            if(!keyExists)
                return false;
            else
            {
                if(fromInside)               
                    currentProductIndex=index;
                return true;
            }    
        });
    }
