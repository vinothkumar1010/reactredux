
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
export const checkLoginInfo = ({email,password},callback) => {
        return (dispatch) => {
          dispatch(loginPending(true));
          verifyLoginDeatils(email, password, error => {
            
            
            if (!error) {
                dispatch(loginPending(false));
                    dispatch(loginSuccess(true));
                    callback();
                   
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
          if (email === 'abc@abc.com' && password === 'tester') {
            return callback();
          } else {
            return callback(new Error('Invalid email and password'));
          }
        }, 1000);
      }

      export const logOutUser = () => {
        return (dispatch) => {
            dispatch(loginSuccess(false));
            dispatch(loginPending(false));
        }
    }