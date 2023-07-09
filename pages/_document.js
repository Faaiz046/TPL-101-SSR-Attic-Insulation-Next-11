import Document, { Html, Head, Main, NextScript } from 'next/document';
import fs from "fs";
import { getDomain } from '../helpers/myFun';

const MyDocument = (props = {}) => {
  const { faviconImage, domain } = props;
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href={`${domain}/manifest.json`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {faviconImage && domain && (
          <>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href={`${process.env.IMAGE_PATH}${domain}/${faviconImage?.imageName}`}
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href={`${process.env.IMAGE_PATH}${domain}/${faviconImage?.imageName}`}
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href={`${process.env.IMAGE_PATH}${domain}/${faviconImage?.imageName}`}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  const { req } = ctx;

  if (!process.browser) {
    const domain = getDomain(req?.headers?.host);

    if (!domain) {
      return initialProps;
    }
    const images= JSON.parse(fs.readFileSync(`${process.cwd()}/public/${domain}/json/images.json`))
    const faviconImage = images.find((image) => image.tagName === 'favicon-32');

    return { ...initialProps, faviconImage, domain };
  }

  return initialProps;
};

export default MyDocument;
