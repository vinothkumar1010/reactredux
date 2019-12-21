import {LOG_IN_PENDING,LOG_IN_SUCCESS, LOG_IN_FAILURE} from '../actions/LoginActions';

const initialState = {
    isLoginSuccess: false,
  isLoginPending: false,
  loginError: null
}

export default (state = initialState, action) =>{
    switch(action.type) {
        case LOG_IN_PENDING: 
        return {
            ...state,
            isLoginPending: action.isLoginPending
        }
        case LOG_IN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess
            }
        case LOG_IN_FAILURE:
            return {
                ...state,
                loginError: action.isLoginFailure
            }
        default: 
            return state;
    }
}
