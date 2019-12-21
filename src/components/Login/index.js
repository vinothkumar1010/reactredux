import React from "react";
import { connect } from 'react-redux';
import * as LoginActions from "../../actions/LoginActions"
import { withRouter } from 'react-router-dom';
import "./login.css"
class Login extends React.Component{
    constructor(props)
    {
        super(props);
        this.handleLogin=this.handleLogin.bind(this);
    }
    handleLogin(e)
    {
        e.preventDefault();
        let email=document.querySelector('#emailId').value;
        let password=document.querySelector('#password').value;
         this.props.login(email, password,() => {
             console.log("called")
            this.props.history.push('/');
          });
    
    }
    render()
    {
        let {isLoginPending, isLoginSuccess, loginError} = this.props;
        console.log(this.props)
        return( 
           
            <div className="loginContainer">
                <form id="loginForm" name="loginForm">
                    <div>
                       
                        <div>
                            <label htmlFor="emailId">
                                Email {isLoginSuccess}
                            </label>
                            <input type="email" id="emailId" name="emailId" placeholder="abc@abc.com"/>
                        </div>
                        <div>
                            <label htmlFor="password">
                                password
                            </label>
                            <input type="password" id="password" name="password"  placeholder="Sample@Test1"/>
                        </div>
                    </div>
                   
            </form>
            <div className="finalSection">
                <button type="submit" onClick={this.handleLogin}>Login</button>
            </div>
            { isLoginPending && <div>Please wait...</div> }
        { isLoginSuccess && <div>Success.</div> }
        { loginError && <div>{loginError.message}</div> }
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
      isLoginPending: state.login.isLoginPending,
      isLoginSuccess: state.login.isLoginSuccess,
      loginError: state.login.loginError
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      login: (email, password) => dispatch(LoginActions.checkLoginInfo(email, password))
    };
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));