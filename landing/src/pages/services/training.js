import React from "react"
import SEO from '../../components/seo';
import Layout from '../../containers/layout/layout'
import Banner from '../../containers/company/banner'
import About from '../../containers/company/about'

export default () => (
    <Layout>
        <SEO title="Company"/>
        <Banner/>
        <About/>
    </Layout>
)
