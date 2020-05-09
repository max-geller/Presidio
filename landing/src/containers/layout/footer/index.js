import React from 'react';
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from "gatsby"
import parse from 'html-react-parser'
import Logo from '../../../components/shared/logo'
import FooterMenu from './footer-menu'
import Text from '../../../components/shared/text'
import Heading from '../../../components/shared/heading'
import Link from '../../../components/shared/link'
import Social, {SocialLink} from '../../../components/shared/social'
import {
    FooterWrap, 
    FooterTop, 
    FooterMiddle,
    FooterMiddleLeft,
    FooterMiddleRight, 
    AddressWrap,
    Address,
    ScrollTop,
	FooterBottom,
	FooterBottomLeft,
	FooterBottomRight
} from './footer.stc'

const Footer = ({
	logoStyle,
	headingStyle, 
	emailTextStyle, 
	emailLinkStyle, 
	widgetTitleStyle,
	addresTextStyle,
	addresSpanStyle, 
	copyrightStyle,
	socialStyle}) => {


	const scrollHandler = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

    const siteQueryData = useStaticQuery(graphql `
        query footerSiteDataQuery {
            site {
                siteMetadata {
				  copyright
                  contact {
                    postal_code
					address
					email
                    social {
                      facebook
                      linkedin
                      twitter
                    }
                  }
                }
            }
        }      
    `);

    const {copyright, contact} = siteQueryData.site.siteMetadata;
	const {postal_code, email, address, social: {facebook, twitter, linkedin}} = contact

    return (
		<FooterWrap>
			<FooterTop>
				<Logo {...logoStyle}/>
				<div className="ft-menu">
					<FooterMenu/>
				</div>
			</FooterTop>
			<FooterMiddle>
				<FooterMiddleLeft>
					<Heading {...headingStyle}>Let’s talk!</Heading>
					{email && <Text {...emailTextStyle}><Link {...emailLinkStyle}>{email}</Link></Text>}
				</FooterMiddleLeft>
				<FooterMiddleRight>
					<Heading {...widgetTitleStyle}>Quick Information:</Heading>
					<AddressWrap>
						{postal_code && (
							<Address>
								<Text {...addresTextStyle}> 
									<Text {...addresSpanStyle}>Address:</Text> 
									{parse(postal_code)}
								</Text>
							</Address>
						)}
						{address && (
							<Address>
								<Text {...addresTextStyle}> 
									<Text {...addresSpanStyle}>Presidio Aerial Solutions</Text> 
									{parse(address)}
								</Text>
							</Address>
						)}
					</AddressWrap>
					<ScrollTop className="creative-cursor" onClick={scrollHandler}>
						<div className="arrow-top"></div>
						<div className="arrow-top-line"></div>
					</ScrollTop>
				</FooterMiddleRight>
			</FooterMiddle>
			<FooterBottom>
				{copyright && (
					<FooterBottomLeft>
						<Text {...copyrightStyle}>{new Date().getFullYear()} {copyright}</Text>
					</FooterBottomLeft>
				)}
				<FooterBottomRight>
					<Social {...socialStyle}>
						{facebook && <SocialLink path={facebook}>Facebook</SocialLink>}
						{twitter && <SocialLink path={twitter}>Twiiter</SocialLink>}
						{linkedin && <SocialLink path={linkedin}>Linkedin</SocialLink>}
					</Social>
				</FooterBottomRight>
			</FooterBottom>
		</FooterWrap>
    )
}

Footer.propTypes = {
	logoStyle: PropTypes.object,
	headingStyle: PropTypes.object,
	emailTextStyle: PropTypes.object,
	emailLinkStyle: PropTypes.object,
	widgetTitleStyle: PropTypes.object,
	addresTextStyle: PropTypes.object,
	addresSpanStyle: PropTypes.object,
	copyrightStyle: PropTypes.object,
	socialStyle: PropTypes.object 
}
 
Footer.defaultProps = {
	logoStyle: {
		responsive: {
			medium: {
				maxwidth: '125px'
			}
		}
	},
	headingStyle : {
		as: 'h1',
        color: '#f8f8f8',
        fontSize: '100px',
        fontweight: 700,
		lineHeight: 1,
		responsive: {
			xlarge:{
				fontSize: '65px'
			},
			medium:{
				fontSize: '30px'
			}
		}
	},
	emailTextStyle: {
		m: 0
	},
	emailLinkStyle: {
		color: '#fff',
		fontSize: '30px',
		fontweight: 500,
		opacity: 0.7,
		responsive: {
			xlarge: {
				fontSize: '20px'
			},
			medium:{
				fontSize: '16px'
			}
		}
	},
	widgetTitleStyle: {
        color: '#c1c1c1',
        fontSize: '16px',
        fontweight: 600,
        texttransform: 'uppercase',
		letterspacing: '1px',
		responsive: {
			small: {
				fontSize: '14px',
			}
		}
	},
	addresTextStyle: {
        color: '#fff',
		opacity: 0.7,
		responsive: {
			medium: {
				fontSize: '12px',
				lineHeight: '24px'
			}
		}
	},
	addresSpanStyle: {
		as: 'span',
		display: 'block'
	},
	copyrightStyle: {
        color: '#fff',
        m: 0,
        fontSize: '14px',
        letterspacing: '1px',
        fontweight: 400,
		opacity: 0.7,
		responsive: {
			medium: {
				fontSize: '10px',
				letterspacing: '0.5px'
			}
		}
	},
	socialStyle: {
		opacity: .7,
		space: 30,
		responsive: {
			medium: {
				space: 20,
				fontSize: '12px'
			}
		}
	}
}

export default Footer;
