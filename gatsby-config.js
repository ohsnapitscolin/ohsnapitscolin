module.exports = {
  siteMetadata: {
    title: `ohsnapitscolin`,
    description: `Oh snap! It's Colin!`,
    author: `Colin Dunn`,
  },
  plugins: [
    `gatsby-plugin-layout`,
    "gatsby-plugin-styled-components",
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#0000FF`,
        theme_color: `#0000FF`,
        display: `minimal-ui`,
        icon: `src/images/blue-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
