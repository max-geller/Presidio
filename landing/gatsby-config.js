/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Presidio Aerial Solutions",
    titleTemplate: `Your FAA Part 107 Partner`,
    description: `Presidio Aerial Solutions is a aerial photography and videography company in San Francisco, CA`,
    author: `Max M. Geller`,
    twitterUsername: `presidio-aerial`,
    image: 'bg-image-1.jpg',
    siteUrl: 'http://www.presidioaerial.com/',
    contact: {
      postal_code: '2351 Powell Street #509 <br> San Francisco, CA 94133',
      address: '2351 Powell Street #509 <br> San Francisco, CA 94133 <br> (415) 854-6600',
      email: 'success@presidioaerial.com',
      company_email: 'success@presidioaerial.com',
      company_address: '2351 Powell Street #509 <br> San Francisco, CA 94133',
      phone: '(415) 854-6600',
      phone2: '(415) 542-8218',
      social: {
        facebook: 'https://facebook.com/presidioaerial/',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
      }
    },
    copyright: "Presidio Aerial Solutions, All Rights Reserved."
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Presidio`,
        short_name: `Presidio`,
        start_url: `/index-video`,
        background_color: `#333333`,
        theme_color: `#001c43`,
        display: `standalone`,
        "icons": [
          {
            "src": "/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'http://thern.rainbowit.net/',
        sitemap: 'http://thern.rainbowit.net/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1920
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Poppins`,
            subsets: [`latin`],
            variants: [`300`, `300i`, `400`, `400i`, `500`, `600`, `700`, `900`]
          }
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    }
  ]
}
