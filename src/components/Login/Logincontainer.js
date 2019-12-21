import React from "react";
import { withRouter } from 'react-router-dom';
import Login from "./index";
class Logincontainer extends React.Component
{
    constructor(props)
    {
        super(props);
        if(props.user)
            props.history.push("/");
    }
    render()
    {
        return (<div><Login /></div>);
    }
}
  

export default withRouter(Logincontainer)