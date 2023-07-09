/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import PageGenerator from "../../generator/PageGenerator";
import fs from "fs"
import { getDomain } from "../../helpers/myFun";

const Page = ({ data, params, breadcrumbs, BASE_URL, images }) => {
  return (
    <>
      <Head>
        <title>{data.meta_title}</title>

        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#97040c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={data.meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://www.${BASE_URL}/${params.service}/${params.zip}`} />

        {Object.entries(data?.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/blog/${params.id}`)
                  .replaceAll("[phone]", data.phone),
              }}
            />
          );
        })}
      </Head>
      <PageGenerator
        data={data}
        params={params}
        breadcrumbs={breadcrumbs}
        type="zip"
        images={images}
        BASE_URL={BASE_URL}
      />
      ;
    </>
  );
};

export const getServerSideProps = async ({ req, params, query }) => {
  console.log('getServerSideProps params req.headers.host ', req.headers.host)
  console.log('getServerSideProps params ZIP ', params)
  console.log('getServerSideProps query ZIP ',query)
  console.log('getServerSideProps req ZIP ',req)
  const { service, zip } = query;
  const domain = getDomain(req?.headers?.host);


  console.log('process.env.API_URL ',process.env.API_URL);
  const homeResponse = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain,
    }).toString()}`
  );
  
  const homeData = await homeResponse.json();
  console.log('homeData ',homeData);

  if (!service.endsWith(homeData.last_url_path)) {
    return {
      redirect: {
        destination: `/${service}-${homeData.last_url_path}/${zip}`,
        permanent: true,
        params
      },
    }
  }

  const zipSplit = zip.split("-")

  if (zipSplit.length > 1) {
    return {
      redirect: {
        destination: `/${service}/${zipSplit[0]}`,
        permanent: true,
        params
      },
    }
  }

  const isDefault = service.toLowerCase() === homeData.default_service?.toLowerCase();

  let breadcrumbs;

  if (isDefault) {
    breadcrumbs = [
      {
        name: "Home",
        href: "/",
      },
      {
        name: zip,
        href: `/${service}/${zip}`,
      },
    ];
  } else {
    breadcrumbs = [
      {
        name: "Home",
        href: "/",
      },
      {
        name: service
          .replace(`-${homeData.last_url_path}`, "")
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" "),
        href: `/${service}`,
      },
      {
        name: zip,
        href: `/${service}/${zip}`,
      },
    ];
  }

  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain,
      type: "zip",
      zip,
      service: service.replace(`-${homeData.last_url_path}`, ""),
    }).toString()}`
  );

  const data = await response.json();

  if (!data || typeof(data) !== "object") {
    return {
      notFound: true,
    };
  }

  data.schemas?.push(
    homeData.schemas.find(
      (item) => item["@type"] === "HowTo"
    )
  )

  data.schemas?.push(
    homeData.schemas.find(
      (item) => item["@type"] === "FAQPage"
    )
  )

  return {
    props: {
      data: {
        ...data,
        zip_list: homeData.zip_list,
        service_list: homeData.service_list,
      },
      params,
      breadcrumbs,
      BASE_URL: domain,
      images: JSON.parse(fs.readFileSync(`${process.cwd()}/public/${domain}/json/images.json`))
    },
  };
};

export default Page;
