/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Script from "next/script";
import PageGenerator from "../generator/PageGenerator";
import fs from "fs";
import { getDomain } from "../helpers/myFun";

export default function Home({ data, BASE_URL, images }) {
  return (
    <>
      <Head>
        <title>{data.meta_title}</title>

        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#97040c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={data.meta_description} />
        <link rel="canonical" href={`https://www.${BASE_URL}`} />
        {Object.entries(data?.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", BASE_URL)
                  .replaceAll("[phone]", data.phone),
              }}
            />
          );
        })}
      </Head>
      <PageGenerator data={data} BASE_URL={BASE_URL} images={images} />
      <Script
        id="passive"
        dangerouslySetInnerHTML={{
          __html: `
            const elements = document.querySelectorAll('*');

            elements.forEach(element => {
              element.addEventListener('scroll', null, { passive: true });
            });
          `,
        }}
      />
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  const domain = getDomain(req?.headers?.host);
  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
    }).toString()}`
  );
  const data = await response.json();

  return {
    props: {
      data,
      BASE_URL: domain,
      images: JSON.parse(fs.readFileSync(`${process.cwd()}/public/${domain}/json/images.json`))
    },
  };
};
