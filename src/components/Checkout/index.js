import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import "./checkout.css";
import * as cartActions from "../../actions/cartActions"
class Checkout extends React.PureComponent
{
    constructor(props)
    {
        super(props)
     this.state={
            email:"",
            phone:"",
            terms:""         
        }
        this.updateFormState=this.updateFormState.bind(this);
        this.handleCheckout=this.handleCheckout.bind(this);
        this.getFormattedPhoneNum=this.getFormattedPhoneNum.bind(this);
        this.handleValidation=this.handleValidation.bind(this);
        this.handleSuccess=this.handleSuccess.bind(this);
    }
    updateFormState(event)
    {
        let value=""
        if(event.target.name==="phone")
        {
            value=this.getFormattedPhoneNum(event.target.value);
            document.querySelector("#phone").value=value;
        }
        else
            value=event.target.value;

        this.setState({
            [event.target.name]:value
        })
    }
    handleCheckout(event)
    {
        event.preventDefault();
        
    //  return <Redirect to="/Login" />;
     
      console.log(this.handleValidation())
        if(!this.handleValidation())
            return false;
        (async () => {
           await  fetch('https://us-central1-reactredux-2a612.cloudfunctions.net/sendMail', {
           // await  fetch('http://localhost:5001/reactredux-2a612/us-central1/sendMail', {
            method: 'post',
            mode: "cors",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "email": this.state.email,
                 "phone":this.state.phone,
                 "products":this.props.cartItems
            })
         }).then((response) => {return response.text()})
         .then((value)=>{
             value=JSON.parse(value);
            if(value.isEmailSend===true)
            {
                this.handleSuccess();
            }
         })
         
       })();
    }
    handleSuccess()
    {
         document.querySelector("#phone").value="";
          document.querySelector("#email").value="";
         document.querySelector("#terms").checked = false;
         this.props.clearMyCart();
          this.props.history.push('/');

    }
    handleValidation(){
        
        let errors = {};
        let formIsValid = true;

        
        let emailFromUser=this.state.email;
        let phoneFromUser=this.state.phone;
        let termSelected=this.state.terms;
        //phone
        if(phoneFromUser.length===0){
           formIsValid = false;
           document.querySelector("#phone").classList.add('error');
           errors["phone"] = "Cannot be empty";
        }
        if(phoneFromUser.length>0)
        {
            let regex=/^(\(\d{3}\))\s(\d{3})\s[.-]\s(\d{4})$/
            if(!regex.test(phoneFromUser))
             {
                 document.querySelector("#phone").classList.add('error');
                 errors["phone"] = "Phone not valid";
             }
             else
                 document.querySelector("#phone").classList.remove('error');
        }
        
        //Email
        if(emailFromUser.length===0){
           formIsValid = false;
           document.querySelector("#email").classList.add('error');
           errors["email"] = "Cannot be empty";
        }

        if(emailFromUser.length>0){
           let lastAtPos = emailFromUser.lastIndexOf('@');
           let lastDotPos = emailFromUser.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && emailFromUser.indexOf('@@') === -1 && lastDotPos > 2 && (emailFromUser.length - lastDotPos) > 2)) {
              formIsValid = false;
              document.querySelector("#email").classList.add('error');
              errors["email"] = "Email is not valid";
            }
            else
                document.querySelector("#email").classList.remove('error');
       } 
       //terms
       if(termSelected!=="on") 
       {
             formIsValid = false;
          document.querySelector("#terms").classList.add('error'); 
       }
       else
            document.querySelector("#terms").classList.remove('error'); 
        console.log(this.state)
       this.setState({errors: errors});
       return formIsValid;
       //return false;
   }
    getFormattedPhoneNum( input ) {
        let output = "(";
        input.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
            {
              if ( g1.length ) {
                output += g1;
                if ( g1.length === 3 ) {
                    output += ")";
                    if ( g2.length ) {
                        output += " " + g2; 
                        if ( g2.length === 3 ) {
                            output += " - ";
                            if ( g3.length ) {
                                output += g3;
                            }
                        }
                    }
                 }
              }
            }       
          );        
        return output;
       }      
        
    render(){
        let {isCheckoutPending, isCheckoutSuccess, checkoutError} = this.props;
        return( 
           <div className="checkoutModalHolder">
            <div className="checkoutModal">
                    <div>
                        <button className="closeCheckout" onClick={this.props.closeModal}>Close</button>
                    </div>
                <form id="checkoutForm" name="checkoutForm" onSubmit={this.handleCheckout}>
                    <div>
                       
                        <div>
                            <label htmlFor="email">
                                Email 
                            </label>
                            <input type="email" name="email" id="email" onChange={this.updateFormState} placeholder="yourmail@mail.com"/>
                        </div>
                        <div>
                            <label htmlFor="phone">
                                Phone
                            </label>
                            <input type="tel" name="phone" id="phone" placeholder="(XXX)-XXX-XXXX" onChange={this.updateFormState}/>
                        </div>
                        <div>
                            <input type="checkbox" id="terms" name="terms" onChange={this.updateFormState}/>
                            <label htmlFor="terms">
                                <span className="styled_checkbox"></span>
                                <div className="termText">Yes, I accept the <a href="/willopenOurTermPage">Terms &amp; Conditions</a> and <a href="/willopenOurPrivacyPage">Privacy Policy</a></div>
                            </label>
                        </div>
                        <div>
                            <div className="info">Note: Checkout will send an email to owner with your order detail. They will contact you shortly to confirm and process your order.</div>
                        </div>
                    </div>
                    <div className="finalSection">
                        <button type="button" onClick={this.handleCheckout}>Send Email</button>
                 </div>
            </form>
            
            { isCheckoutPending && <div>Please wait...</div> }
        { isCheckoutSuccess && <div>Success.</div> }
        { checkoutError && <div>{checkoutError.message}</div> }
        { this.state.provideValue && <div>Please enter user name and password</div> }
        </div></div>);
    }
}
const mapStateToProps = (state) => {
    return {
      cartItems:state.cart.cartItems
    }
  };
   const mapDispatchToProps = (dispatch) => {
    return {
      clearMyCart:()=>dispatch(cartActions.clearCart())
    };
  } 
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout));
