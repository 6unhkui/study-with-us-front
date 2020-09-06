import React from 'react';
import { Divider} from 'antd';
import Logo from "assets/image/footer-logo.png";

const Footer = () => {
    return (
        <div className="footer-wrap">
            <Divider/>
            <div className='container'>
                <img src={Logo} alt="logo" className='logo'/>
                <span>Study with us © {new Date().getFullYear()}</span>
            </div>
        </div>
    )
}

export default Footer;
