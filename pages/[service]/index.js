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
        <link rel="canonical" href={`https://www.${BASE_URL}/${params.service}`} />

        {Object.entries(data?.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/${params.service}`)
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
        type="service"
        images={images}
        BASE_URL={BASE_URL}
      />
      ;
    </>
  );
};

export const getServerSideProps = async ({ req, res, params, query }) => {
  console.log('getServerSideProps params INDEX ', params)
  console.log('getServerSideProps query INDEX ',query)
  console.log('getServerSideProps req INDEX ',req)
  const { service } = params;
  const domain = getDomain(req?.headers?.host);

  console.log('process.env.API_URL ',process.env.API_URL);
  const homeResponse = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain,
    }).toString()}`
  );
  const homeData = await homeResponse.json();
  console.log('homeData ',homeData);

  const serviceSplit = service.split("-")

  if (
    serviceSplit.length > 1 &&
    serviceSplit[0].toLowerCase() === homeData.default_service.toLowerCase() &&
    /^\d+$/.test(serviceSplit[1])
  ) {
    return {
      redirect: {
        destination: `/${serviceSplit[0]}-${homeData.last_url_path}/${serviceSplit[1]}`,
        permanent: true,
        params
      },
    }
  }

  if (!service.endsWith(homeData.last_url_path)) {
    return {
      redirect: {
        destination: `/${service}-${homeData.last_url_path}`,
        permanent: true,
        params
      },
    }
  }

  const breadcrumbs = [
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
  ];

  if (
    service.toLowerCase() === homeData.default_service
  ) {
    res.setHeader("Location", "/");
    res.statusCode = 301;
    res.end();
    return {
      props: {},
    };
  }

  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain,
      type: "service",
      service: service.replace(`-${homeData.last_url_path}`, ""),
    }).toString()}`
  );

  const data = await response.json();

  if (!data || typeof (data) !== "object") {
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
