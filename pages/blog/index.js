/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import Link from 'next/link';
import { Breadcrumbs, Container } from '../../components/common';
import { Footer, Nav } from '../../components/containers';
import fs from 'fs';
import { getDomain } from '../../helpers/myFun';

const Page = ({ data, breadcrumbs, BASE_URL, images }) => {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>{data.meta_title}</title>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#97040c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={data.meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://www.${BASE_URL}/blog`} />

        {Object.entries(data?.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll('[current_url]', `${BASE_URL}/blog`)
                  .replaceAll('[phone]', data.phone),
              }}
            />
          );
        })}
      </Head>
      <Nav
        services={{ title: data.service_header, items: data.service_list }}
        phone={data.phone}
        title={data.meta_heading_h1}
        logo_text={data.logo_text}
        main_menu={data.main_menu}
        last_url_path={data.last_url_path}
        latitude={data.latitude}
        longitude={data.longitude}
        city={data?.city}
        images={images}
        industry_name={data?.industry_name}
      />
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <Container className="mb-20">
        <h1 className="my-10 text-center text-3xl font-extrabold text-primary lg:text-3xl">
          Blog
        </h1>
        <div className="flex w-full flex-col items-center">
          {data.blog_list.map((item, index) => {
            const blogSlug = item.href.split(/[\n|\r|?]/).join('');
            const blogLink = `/blog/${blogSlug}`;
            const blogImageUrl = `${process.env.IMAGE_PATH}${BASE_URL}/${
              images.find(
                (image) => image?.tagName === `${item?.articleID}-image`
              )?.imageName
                ? images.find(
                    (image) => image?.tagName === `${item?.articleID}-image`
                  )?.imageName
                : images.find((image) => image?.tagName === `banner-bg`)
                    ?.imageName
            }`;
            return (
              <div
                key={index}
                className="mb-10 grid w-full gap-5 lg:mb-8 lg:grid-cols-blog lg:gap-7"
              >
                <div className="overflow-hidden rounded-md">
                  <Link href={blogLink}>
                    <div
                      style={{
                        backgroundImage: `url(${blogImageUrl})`,
                      }}
                      className="h-[200px] w-full bg-cover bg-center p-20 transition-all hover:scale-110"
                    ></div>
                  </Link>
                </div>
                <div className="flex flex-col space-y-2 lg:block lg:space-y-3">
                  <h2 className="text-xl text-black">{item.title}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      dateStyle: 'long',
                    })}
                  </p>
                  <p className="text-gray-600">
                    {item.description.slice(0, 180).replaceAll('<p>', '')}...
                  </p>
                  <Link href={`/blog/${item.href.split(/[\n|\r|?]/).join('')}`}>
                    <button className="btnPrimary mt-3 text-sm lg:mt-5">
                      Read Blog
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
      <Footer
        footer_title_1={data.footer_title_1}
        phone={data.phone}
        footer_title_2={data.footer_title_2}
        footer_list={data.footer_list}
        main_menu={data.main_menu}
        footer_5star_slogan={data.footer_5star_slogan}
        last_url_path={data.last_url_path}
        footer_site_description={data.footer_site_description}
        logo_text={data.logo_text}
        footer_payment_title={data.footer_payment_title}
        footer_follow_us_slogan={data.footer_follow_us_slogan}
        footer_quick_links_title={data.footer_quick_links_title}
        footer_quick_links_list={data.footer_quick_links_list}
        images={images}
        BASE_URL={BASE_URL}
        instagram_url={data?.instagram_url}
        facebook_url={data?.facebook_url}
        twitter_url={data?.twitter_url}
      />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  const breadcrumbs = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
  ];

  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
      type: 'blog',
    }).toString()}`
  );

  const data = await response.json();

  return {
    props: {
      data,
      breadcrumbs,
      BASE_URL: domain,
      images: JSON.parse(
        fs.readFileSync(`${process.cwd()}/public/${domain}/json/images.json`)
      ),
    },
  };
}

export default Page;
