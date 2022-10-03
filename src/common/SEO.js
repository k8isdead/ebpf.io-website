/* eslint-disable react/prop-types */
import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';

const SEO = ({
  title,
  description,
  slug,
  canonical,
  preventIndexing,
  keywords,
  ogImage,
  isBlogPage,
  children,
}) => {
  const {
    site: {
      siteMetadata: { siteTitle, siteDescription, siteUrl, siteImage },
    },
  } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteImage
        }
      }
    }
  `);

  const currentTitle = title ?? siteTitle;
  const currentDescription = description ?? siteDescription;
  const currentUrl = slug ? siteUrl + slug : siteUrl;
  const currentImagePath = ogImage ? siteUrl + ogImage : siteUrl + siteImage;
  const currentCanonicalUrl = canonical ? siteUrl + canonical : currentUrl;

  const isRobotsNoindexPage = preventIndexing && preventIndexing !== 'index';

  return (
    <>
      <title>{currentTitle}</title>
      {/* General */}
      <meta name="description" content={currentDescription} />
      <link rel="canonical" href={currentCanonicalUrl} />
      {keywords && <meta name="keywords" content={keywords} />}
      {isRobotsNoindexPage && <meta name="robots" content="noindex" />}
      {/* Open Graph */}
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta
        property="og:image"
        content={currentImagePath}
      />
      <meta property="og:type" content="website" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {isBlogPage && <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/blog/rss.xml"></link>}
      {children}
    </>
  );
};

export default SEO;