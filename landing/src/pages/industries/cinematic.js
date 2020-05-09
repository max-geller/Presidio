import React from "react"
import SEO from '../../components/seo';
import Layout from '../../containers/layout/layout'
import Banner from '../../containers/company/banner'
import About from '../../containers/company/about'
import Team from '../../containers/company/team'

export default () => (
    <Layout>
        <SEO title="Cinematic Aerial"/>
        <Banner/>
        <About/>
        <Team/>
    </Layout>
)
