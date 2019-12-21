
export const LOG_IN_PENDING = 'LOG_IN_PENDING';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const loginPending=(isLoginPending)=> {
    return {
        type: LOG_IN_PENDING,
        isLoginPending
    }
}
export const loginSuccess=(isLoginSuccess)=> {
    return {
        type: LOG_IN_SUCCESS,
        isLoginSuccess
        }
    }
export const loginFailure=(isLoginFailure)=> {
    return {
        type: LOG_IN_FAILURE,
        isLoginFailure
        }
    }
export const checkLoginInfo = (email,password) => {
        // Returns a dispatcher function
        // that dispatches an action at a later time
        return (dispatch) => {
          // Returns a promise
          dispatch(loginPending(true));
          verifyLoginDeatils(email, password, error => {
            
            
            if (!error) {
                console.log("Success")
               
                dispatch(loginPending(false));
                    dispatch(loginSuccess(true));
                   return error;
                   
            } else {
                dispatch(loginSuccess(false));
                dispatch(loginPending(false));
              dispatch(loginFailure(error));
            }
          });
         
        };
      };

      function verifyLoginDeatils(email, password, callback) {
          
        setTimeout(() => {
          if (email === 'abc@abc.com' && password === 'Sample@Test1') {
            return callback();
          } else {
            return callback(new Error('Invalid email and password'));
          }
        }, 1000);
      }