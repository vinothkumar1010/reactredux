export const CART_ADD_PENDING = 'CART_ADD_PENDING';
export const CART_ADD_SUCCESS = 'CART_ADD_SUCCESS';
export const CART_ADD_FAILURE = 'CART_ADD_FAILURE';
export const CART_LOAD_PENDING = 'CART_LOAD_PENDING';
export const CART_LOAD_SUCCESS = 'CART_LOAD_SUCCESS';
export const CART_LOAD_FAILURE = 'CART_LOAD_FAILURE';
export const CART_DELETE_SUCCESS= 'CART_DELETE_SUCCESS';
var currentProductIndex="";
export const cartAddPending=(isCartAddPending)=> {
    return {
        type: CART_ADD_PENDING,
        isCartAddPending
    }
}
export const cartAddSuccess=(cartItems)=> {
    return {
        type: CART_ADD_SUCCESS,
        cartItems:cartItems,
        }
    }
export const cartAddFailure=(isCartAddFailure)=> {
    return {
        type: CART_ADD_FAILURE,
        isCartAddFailure
        }
    }
export const addToCart=(productId)=>{
    return (dispatch,getState) => {
        dispatch(cartAddPending(true));
        let productsToCart=[...getState().cart.cartItems];
        console.log(productsToCart)
        const hasValue=_isContains(productsToCart,"id",productId,false);
        console.log(hasValue)
        console.log("above is index value")
       if(!hasValue)
       {
        productsToCart.push({"id":productId,"quantity":1}); 
       }
       else
        productsToCart[currentProductIndex]["quantity"]=productsToCart[currentProductIndex]["quantity"]+1;
        dispatch(cartAddSuccess(productsToCart)); 
       console.log(productsToCart);
       /*  if(productsToCart.length===0 || !productsToCart[0].productId)
            productsToCart.push({id:productId,quantity:1});
        else
            productsToCart[0][productId]=productsToCart[0][productId]+1
            console.log(productsToCart);
        */

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
    /* function _isContains(json, keyname, value) {

        return Object.keys(json).some(key => {
                return typeof json[key] === 'object' ? 
                _isContains(json[key], keyname, value) : key === keyname && json[key] === value;
            });
        } */