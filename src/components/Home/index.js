import React from "react";
import Products from "../Products"
import "./home.css"
class Home extends React.PureComponent
{
    render()
    {
    return <div className="content"><Products /></div>;
    }
}
export default Home;