import React from 'react';
import { Link, withRouter } from "react-router-dom";

import Logo from "assets/image/logo.png";
import GNB from "./Sections/Gnb";
import SideMenu from "./Sections/SideMenu";


const NavBar = (props) => {
    return (
        <nav className="header-wrap">
            <span className="logo-wrap">
                <Link to="/"><img src={Logo} className="logo" alt="logo"/></Link>
            </span>

            <GNB/>
                
            <SideMenu {...props}/>
        </nav>
    )
}

export default withRouter(NavBar);


