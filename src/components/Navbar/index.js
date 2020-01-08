import React from "react"
import {  NavLink, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as LoginActions from "../../actions/LoginActions"

import "./navbar.css";
class Navbar extends React.Component{
    constructor(props)
    {
        super(props)
        this.logout=this.logout.bind(this);
    }
    logout()
    {
        this.props.userLogOut();
    }
    
    render()
    {
        const {userLoggedIn} =this.props;
        return (<nav className="nav">
            <ul>
              <li>
                  <NavLink to="/" activeClassName="active" exact={true}>Home</NavLink>
              </li>
              <li>
                    <NavLink to="/Cart" activeClassName="active" exact={true}>Cart <sup className="noOfItems">{this.props.cartItems.length}</sup></NavLink>
              </li>
              <li>
                {userLoggedIn?(<NavLink to="/" activeClassName="" onClick={this.logout}>Logout</NavLink>):(<NavLink to="/Login">Login</NavLink>)}
              </li>
              
            </ul>
          </nav>)
    }
}
const mapStateToProps = (state) => {
    return {
      userLoggedIn:state.login.isLoginSuccess,
      cartItems:state.cart.cartItems
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      userLogOut:()=>dispatch(LoginActions.logOutUser())
    };
  }
  
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar ));