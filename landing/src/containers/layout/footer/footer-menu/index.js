import React from 'react';
import {Link} from 'gatsby';
import {FooterMenuWrap, FooterMenuList} from './footer-menu.stc'

const FooterMenu = () => {
    return (
        <FooterMenuWrap>
            <FooterMenuList>
                <Link to="/privacy" className="no-cursor">Privacy</Link>
            </FooterMenuList>
            <FooterMenuList>
                <Link to="/cookies" className="no-cursor">Cookies</Link>
            </FooterMenuList>
            <FooterMenuList>
                <Link to="/site-map" className="no-cursor">Sitemap</Link>
            </FooterMenuList>
            <FooterMenuList>
                <Link to="/press" className="no-cursor">Press</Link>
            </FooterMenuList>
            <FooterMenuList>
                <Link to="/careers" className="no-cursor">Careers</Link>
            </FooterMenuList>
        </FooterMenuWrap>
    )
}

export default FooterMenu;