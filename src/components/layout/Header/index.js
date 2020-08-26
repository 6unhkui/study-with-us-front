import React from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import Logo from "assets/image/logo.svg";
import GNB from "./Sections/Gnb";
import SideMenu from "./Sections/SideMenu";

const Header = (props) => {
    return (
        <nav className="header-wrap">
            <span className="logo-wrap">
                <Link to="/"><img src={Logo} className="logo" alt="logo" style={{width : '10rem'}}/></Link>
            </span>

            <GNB/>
                
            <SideMenu {...props}/>
        </nav>
    )
}

export default withRouter(Header);


