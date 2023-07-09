/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import PageGenerator from "../generator/PageGenerator";
import fs from "fs";
import { getDomain } from "../helpers/myFun";

export default function Page({ data, breadcrumbs, BASE_URL, images }) {
  return (
    <>
      <Head>
        <title>{data.meta_title}</title>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#97040c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={data.meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://www.${BASE_URL}/contact-us`} />

        {Object.entries(data?.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/contact-us`)
                  .replaceAll("[phone]", data.phone),
              }}
            />
          );
        })}
      </Head>
      <PageGenerator
        data={data}
        breadcrumbs={breadcrumbs}
        type="contact-us"
        BASE_URL={BASE_URL}
        images={images}
      />
    </>
  );
}

export const getServerSideProps = async ({ req }) => {

  const domain = getDomain(req?.headers?.host);

  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
      type: "contact"
    }).toString()}`
  );

  const data = await response.json();

  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Contact",
      href: `/contact-us`,
    },
  ];

  return {
    props: {
      data,
      BASE_URL: domain,
      breadcrumbs,
      images: JSON.parse(fs.readFileSync(`${process.cwd()}/public/${domain}/json/images.json`))
    },
  };
};
