/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import Image from 'next/image';
import { Breadcrumbs, Container, FullContainer } from '../../components/common';
import { Footer, Nav } from '../../components/containers';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import fs from 'fs';
import { getDomain } from '../../helpers/myFun';

const Page = ({ data, blog, params, breadcrumbs, BASE_URL, images }) => {
  console.log("🚀 ~ file: [id].js:13 ~ Page ~ data:", data)
  console.log("🚀 ~ file: [id].js:13 ~ Page ~ blog:", blog)
  const blogSlug = params.id;
  // const blogImageUrl = `/${BASE_URL}/img/${blogSlug.replace(new RegExp(`-in-${data.city.replaceAll(" ", "-").toLowerCase()}`), '')}-blog.jpg`
  // const blogImageUrl = images.find(
  //   (image) => image?.tagName === `${blog?.articleID?blog?.articleID:"1"}-image`
  //   // `${blogSlug.replace(new RegExp(`-in-${data.city.replaceAll(" ", "-").toLowerCase()}`), '')}-blog`
  // );

  const blogImageUrl = images.find(
      (image) => image?.tagName === `${data?.article_id}-image`
    )?.imageName
      ? images.find(
          (image) => image?.tagName === `${data?.article_id}-image`
        )?.imageName
      : images.find((image) => image?.tagName === `banner-bg`)?.imageName;
      console.log("🚀 ~ file: [id].js:25 ~ Page ~ blogImageUrl:", blogImageUrl)

  return (
    <FullContainer>
      <Head>
        <title>{data.meta_title}</title>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#97040c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={data.meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href={`https://www.${BASE_URL}/blog/${blogSlug}`}
        />

        {Object.entries(data?.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll('[current_url]', `${BASE_URL}/blog/${blogSlug}`)
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

      <Container className="max-w-screen-md pb-16 pt-10">
        <h1 className="text-left text-3xl font-bold text-black lg:text-center lg:text-6xl">
          {blog.headline}
        </h1>
        {blog?.datePublished && (
          <p className="w-full text-left text-sm text-gray-500 md:text-center">
            {new Date(blog?.datePublished).toLocaleDateString('en-US', {
              dateStyle: 'long',
            })}
          </p>
        )}
        <div className="py-4">
          <Image
            // src={`/${BASE_URL}/img/${blogImageUrl?.imageName}`}
            src={`${process.env.IMAGE_PATH}${BASE_URL}/${blogImageUrl}`}
            // src={blogImageUrl}
            width={400}
            height={400}
            alt="blog image"
            className="h-full w-full"
          />
        </div>
        <ReactMarkdown
          className="text-left"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {blog.description}
        </ReactMarkdown>
      </Container>
      <Footer
        footer_title_1={data.footer_title_1}
        phone={data.phone}
        footer_title_2={data.footer_title_2}
        footer_list={data.footer_list}
        params={params}
        last_url_path={data.last_url_path}
        main_menu={data.main_menu}
        footer_5star_slogan={data.footer_5star_slogan}
        footer_site_description={data.footer_site_description}
        footer_payment_title={data.footer_payment_title}
        logo_text={data.logo_text}
        footer_follow_us_slogan={data.footer_follow_us_slogan}
        footer_quick_links_title={data.footer_quick_links_title}
        footer_quick_links_list={data.footer_quick_links_list}
        images={images}
        BASE_URL={BASE_URL}
        instagram_url={data?.instagram_url}
        facebook_url={data?.facebook_url}
        twitter_url={data?.twitter_url}
      />
    </FullContainer>
  );
};

export async function getServerSideProps({ req, params }) {
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
    {
      name: params.id
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' '),
      href: `/blog/${params.id}`,
    },
  ];

  const { id } = params;

  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
      type: 'article',
      blogTitle: id,
    }).toString()}`
  );

  const data = await response.json();

  const blog = data.schemas?.find((schema) => schema['@type'] === 'Article');

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      blog,
      params,
      breadcrumbs,
      BASE_URL: domain,
      images: JSON.parse(
        fs.readFileSync(`${process.cwd()}/public/${domain}/json/images.json`)
      ),
    },
  };
}

export default Page;
