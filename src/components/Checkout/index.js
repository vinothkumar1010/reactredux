import React from "react";
import { connect } from 'react-redux';
import "./checkout.css";
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
    }
    updateFormState(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleCheckout(event)
    {
        event.preventDefault();
        console.log(JSON.stringify(this.props.cartItems));
        (async () => {
           //await  fetch('https://us-central1-reactredux-2a612.cloudfunctions.net/sendMail', {
            await  fetch('http://localhost:5001/reactredux-2a612/us-central1/sendMail', {
            method: 'post',
            mode: "cors",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "email": this.state.email,
                 "phone":this.state.phone,
                 "products":this.props.cartItems
            })
         }).then((response) => response.text())
         
       })();

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
                            <input type="checkbox" id="terms" name="terms"/>
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
    
export default connect(
    mapStateToProps
)(Checkout);
