import React from 'react';
import { Divider} from 'antd';

const Footer = () => {
    return (
        <div className="footer-wrap">
            <Divider/>
            <div className='container'>
            © study with us. {new Date().getFullYear()}
            </div>
        </div>
    )
}

export default Footer;
