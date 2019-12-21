import React from "react";
import { connect } from 'react-redux';
import * as LoginActions from "../../actions/LoginActions"
import { withRouter } from 'react-router-dom';
import "./login.css"
class Login extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            provideValue:false
        }
        this.handleLogin=this.handleLogin.bind(this);
    }
    componentDidMount()
    {
        if(this.props.isLoginSuccess)
            this.props.history.push('/');
    }
 
  
    handleLogin=e=>
    {
        e.preventDefault();
        let email=document.querySelector('#emailId').value;
        let password=document.querySelector('#password').value;
        if(email.length===0 || password.length===0)
        {
            this.setState({
                provideValue:true
            });
            return false;
        }
        this.setState({
            provideValue:false
        });
         this.props.login({email, password},() => {
            this.props.history.push('/');
          });
    
    }
    render()
    {
        let {isLoginPending, isLoginSuccess, loginError} = this.props;
        return( 
           
            <div className="loginContainer">
                <form id="loginForm" name="loginForm" onSubmit={this.handleLogin}>
                    <div>
                       
                        <div>
                            <label htmlFor="emailId">
                                Email {isLoginSuccess}
                            </label>
                            <input type="email" id="emailId" name="emailId" placeholder="abc@abc.com" />
                        </div>
                        <div>
                            <label htmlFor="password">
                                password
                            </label>
                            <input type="password" id="password" name="password"  placeholder="tester" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="finalSection">
                        <button type="submit" onClick={this.handleLogin}>Login</button>
                 </div>
            </form>
            
            { isLoginPending && <div>Please wait...</div> }
        { isLoginSuccess && <div>Success.</div> }
        { loginError && <div>{loginError.message}</div> }
        { this.state.provideValue && <div>Please enter user name and password</div> }
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