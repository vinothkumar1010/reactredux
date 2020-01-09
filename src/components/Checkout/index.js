import React from "react";
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
        this.updateFormState=this.updateFormState.bind(this)
    }
    updateFormState(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render(){
        let {isCheckoutPending, isCheckoutSuccess, checkoutError} = this.props;
        return( 
           <div className="checkoutModalHolder">
            <div className="checkoutModal">
                    <div>
                        <button class="closeCheckout" onClick={this.props.closeModal}>Close</button>
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
                            <label for="terms">
                                <span class="styled_checkbox"></span>
                                <div className="termText">Yes, I accept the <a href="/willopenOurTermPage">Terms &amp; Conditions</a> and <a href="/willopenOurPrivacyPage">Privacy Policy</a></div>
                            </label>
                        </div>
                        <div>
                            <div className="info">Note: Checkout will send an email to owner with your order detail. They will contact you shortly to confirm and process your order.</div>
                        </div>
                    </div>
                    <div className="finalSection">
                        <button type="submit" onClick={this.handleCheckout}>Send Email</button>
                 </div>
            </form>
            
            { isCheckoutPending && <div>Please wait...</div> }
        { isCheckoutSuccess && <div>Success.</div> }
        { checkoutError && <div>{checkoutError.message}</div> }
        { this.state.provideValue && <div>Please enter user name and password</div> }
        </div></div>);
    }
}
export default Checkout;