import Image from 'next/image';
import Link from 'next/link';
import { Container, FullContainer } from '../common';

export default function Footer({
  footer_title_1,
  footer_title_2,
  logo_text,
  footer_list,
  params,
  footer_5star_slogan,
  footer_site_description,
  footer_payment_title,
  footer_follow_us_slogan,
  footer_quick_links_title,
  footer_quick_links_list,
  last_url_path,
  images,
  BASE_URL,
  instagram_url,
  facebook_url,
  twitter_url,
}) {
  const starSetImage = images.find(
    (image) => image?.tagName === 'star-set-yellow'
  );
  const bankCardsImage = images.find(
    (image) => image?.tagName === 'bank-cards'
  );
  const instagramImage = images.find(
    (image) => image?.tagName === 'instagram-icon-white'
  );
  const twitterImage = images.find(
    (image) => image?.tagName === 'twitter-icon-white'
  );
  const facebookImage = images.find(
    (image) => image?.tagName === 'fb-icon-white'
  );
  const linkedinImage = images.find(
    (image) => image?.tagName === 'linkedin-icon-white'
  );

  return (
    <FullContainer className="border-t bg-white py-16 text-black">
      <div className="grid w-10/12 max-w-screen-2xl gap-7 text-left lg:grid-cols-footer">
        <div>
          <div className="text-3xl font-extrabold uppercase text-black  lg:text-3xl">
            <Link href={'/'}>{logo_text}</Link>
          </div>
          <p className="mt-2 font-semibold text-gray-700 md:text-xl">
            {footer_5star_slogan}
          </p>
          <Image
            src={`${process.env.IMAGE_PATH}${BASE_URL}/${starSetImage?.imageName}`}
            alt={starSetImage?.alt}
            title={starSetImage?.title}
            height={50}
            width={256}
            className="!right-[100%] mt-3 !h-auto !min-h-[0] w-auto !w-auto !min-w-[0]"
          />
          <p className="mt-4">{footer_site_description}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <h3 className="mb-5 text-lg font-extrabold text-black lg:text-3xl">
            {footer_payment_title}
          </h3>
          <Image
            src={`${process.env.IMAGE_PATH}${BASE_URL}/${bankCardsImage?.imageName}`}
            alt={bankCardsImage?.alt}
            title={bankCardsImage?.title}
            height={50}
            width={400}
            className="!h-auto !min-h-[0] w-auto !w-auto !min-w-[0]"
          />
          <h3 className="mt-10 h-auto text-left text-xl font-semibold text-black">
            {footer_follow_us_slogan}
          </h3>
          <div className="mt-2 flex items-center">
            {instagram_url && (
              <a
                target="_blank"
                title="Instagram"
                href={instagram_url}
                className="socialLink"
                rel="noreferrer"
              >
                <Image
                  src={`${process.env.IMAGE_PATH}${BASE_URL}/${instagramImage?.imageName}`}
                  alt={instagramImage?.alt}
                  title={instagramImage?.title}
                  height={20}
                  width={20}
                />
              </a>
            )}
            {twitter_url && (
              <a
                target="_blank"
                title="Twitter"
                href={twitter_url}
                className="socialLink"
                rel="noreferrer"
              >
                <Image
                  src={`${process.env.IMAGE_PATH}${BASE_URL}/${twitterImage?.imageName}`}
                  alt={twitterImage?.alt}
                  title={twitterImage?.title}
                  height={20}
                  width={20}
                />
              </a>
            )}
            {facebook_url && (
              <a
                target="_blank"
                title="Facebook"
                href={facebook_url}
                className="socialLink"
                rel="noreferrer"
              >
                <Image
                  src={`${process.env.IMAGE_PATH}${BASE_URL}/${facebookImage?.imageName}`}
                  alt={facebookImage?.alt}
                  title={facebookImage?.title}
                  height={20}
                  width={20}
                />
              </a>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold  text-black">
            {footer_quick_links_title}
          </h3>
          <ul className="mt-2 grid text-lg lg:space-y-1">
            {footer_quick_links_list.map((item, index) => (
              <li key={index} className="py-1">
                <a href={item.path}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-black">
            {footer_title_2}
          </h2>
          <ul className="mt-2 text-lg lg:space-y-1">
            {footer_list
              .map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.path}-${last_url_path}${
                      !!params?.zip ? `/${params?.zip}` : ''
                    }`.replace('//', '/')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))
              .slice(0, 10)}
          </ul>
        </div>
      </div>
    </FullContainer>
  );
}
