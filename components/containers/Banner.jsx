import {
  ChevronDoubleRightIcon,
  ArrowRightCircleIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/20/solid';

import Image from 'next/image';
import { ContactButton, Container, FullContainer } from '../common';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import React from 'react';

export default function Banner({ data, params, images, BASE_URL }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const service = params?.service?.replace(`-${data.last_url_path}`, '');
  const icnSVG = (
    <svg
      width="29"
      height="83"
      viewBox="0 0 29 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.6673 1.30021C28.0266 0.140368 26.5779 -0.307623 25.4264 0.348082C18.5308 4.27477 12.6853 9.71417 8.37631 16.2339C3.63809 23.4031 0.920543 31.6323 0.490175 40.1147C0.0598065 48.5971 1.93139 57.0413 5.92139 64.6193C9.54879 71.5086 14.8138 77.4669 21.2765 82.0189C22.3606 82.7824 23.8462 82.4772 24.5993 81.3858C25.3926 80.236 25.0684 78.6625 23.9337 77.8477C18.2691 73.7801 13.6486 68.5032 10.4458 62.4202C6.85251 55.5957 5.167 47.991 5.55458 40.3519C5.94216 32.7128 8.38953 25.3017 12.6567 18.8453C16.465 13.0832 21.606 8.25801 27.6656 4.73791C28.8664 4.04038 29.3389 2.5157 28.6673 1.30021Z"
        fill="#bc8047"
      />
    </svg>
  );

  const icnSVG2 = (
    <svg
      width="19"
      height="39"
      viewBox="0 0 19 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5376 0.411049C16.2094 0.22781 16.9098 0.599144 17.1141 1.26483C19.6192 9.42938 19.6309 18.0574 17.1352 26.24C14.6227 34.4775 9.66737 41.9408 2.80781 47.8383C2.32339 48.2548 1.60209 48.222 1.14606 47.7747C0.615393 47.2541 0.654652 46.3891 1.21503 45.9006C7.59963 40.3356 12.2155 33.3307 14.5706 25.6093C16.9185 17.9116 16.9289 9.79869 14.6148 2.11013C14.3963 1.38438 14.8064 0.610497 15.5376 0.411049Z"
        fill="black"
      />
    </svg>
  );

  const icnSVG3 = (
    <svg
      width="15"
      height="8"
      viewBox="0 0 15 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.0818 3.03405C13.9854 1.69726 12.8265 0.683486 11.4946 0.833417C8.22934 1.20101 5.00873 1.87109 1.87783 2.83426C0.561756 3.23912 -0.0916595 4.6882 0.409748 5.9706C0.892822 7.2061 2.27061 7.82524 3.53955 7.43842C6.23774 6.61592 9.00927 6.03484 11.8187 5.70259C13.1601 5.54396 14.1788 4.3813 14.0818 3.03405Z"
        fill="#bc8047"
      />
    </svg>
  );

  const listIcn = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="white" />
      <path
        d="M22 11.0801V12.0001C21.9988 14.1565 21.3005 16.2548 20.0093 17.9819C18.7182 19.7091 16.9033 20.9726 14.8354 21.584C12.7674 22.1954 10.5573 22.122 8.53447 21.3747C6.51168 20.6274 4.78465 19.2462 3.61096 17.4372C2.43727 15.6281 1.87979 13.4882 2.02168 11.3364C2.16356 9.18467 2.99721 7.13643 4.39828 5.49718C5.79935 3.85793 7.69279 2.71549 9.79619 2.24025C11.8996 1.76502 14.1003 1.98245 16.07 2.86011"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 4L12 14.01L9 11.01"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 11.0801V12.0001C21.9988 14.1565 21.3005 16.2548 20.0093 17.9819C18.7182 19.7091 16.9033 20.9726 14.8354 21.584C12.7674 22.1954 10.5573 22.122 8.53447 21.3747C6.51168 20.6274 4.78465 19.2462 3.61096 17.4372C2.43727 15.6281 1.87979 13.4882 2.02168 11.3364C2.16356 9.18467 2.99721 7.13643 4.39828 5.49718C5.79935 3.85793 7.69279 2.71549 9.79619 2.24025C11.8996 1.76502 14.1003 1.98245 16.07 2.86011"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 4L12 14.01L9 11.01"
        stroke="#bc8047"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  const bannerImagePath =
    !service || service.toLowerCase() === data.default_service.toLowerCase()
      ? isMobile
        ? 'mobile-banner-bg'
        : 'banner-bg'
      : `${service}-banner-bg`;
  const bannerImage = images.find((image) => image.tagName === bannerImagePath)
    ? images.find((image) => image.tagName === bannerImagePath)
    : images.find((image) => image.tagName === 'banner-bg');
    const current_city_title="Attic Insulation"
  return (
    <>
      <FullContainer className="relative items-center justify-center text-white bg-gradient-to-r from-white/60 to-transparent">
        <Image
        src="/banner-bg.jpeg"
          // src={`${process.env.IMAGE_PATH}${BASE_URL}/${bannerImage?.imageName}`}
          alt={bannerImage?.alt}
          title={bannerImage?.title}
          layout="fill"
          loading="eager"
          objectFit="cover"
          className="absolute -z-10"
        />
        <Container className="flex !w-[98%] flex-col items-center justify-center pt-2 md:py-5 lg:py-10">
          <div className="z-10 flex w-full flex-col items-center justify-center md:grid md:grid-cols-2">
            <div>
              <div className="flex flex-col md:flex-col">
                {data?.phone && (
                  <ContactButton
                    textClass="font-extrabold bg-primary text-white relative top-1 z-10 p-1 -left-6 pl-8 pr-6 rounded-r-3xl -ml-4 font-exo2 text-[22px] font-black"
                    className="text- gap-0 bg-transparent px-5 text-left lg:px-5"
                    data={data.phone}
                    phoneClass="bg-primary text-white p-[30px] md:p-6 rounded-full relative z-20"
                    phoneIconClass="h-5 lg:h-7"
                    callClass="bg-black text-white relative -left-8 rounded-tr-lg z-0 rounded-tr-3xl w-11/12 h-7 font-exo2 text-xl font-medium"
                    icon1={icnSVG}
                    icon1Class="absolute -left-3 top-0"
                    icon2={icnSVG2}
                    iconClass2="absolute right-[-3px] top-[27px]"
                    icon3={icnSVG3}
                    iconClass3="absolute left-[23px] top-[-9px]"
                  />
                )}
                <div className="w-full rounded-2xl px-3 py-2 lg:mt-5">
                  <ReactMarkdown
                    className="font-exo2 text-2xl font-extrabold uppercase text-primary md:text-3xl lg:text-5xl"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: ({ children }) => {
                        const words = String(children).split(' ');
                        return (
                          <p>
                            <span
                              className={`${
                                words?.length > 1
                                  ? 'text-black'
                                  : 'text-primary'
                              }`}
                            >
                              {words[0]}
                            </span>{' '}
                            {words?.slice(1).map((word, index) => (
                              <span key={index} className="text-primary">
                                {word}{" "}
                              </span>
                            ))}
                          </p>
                        );
                      },
                    }}
                  >
                    {current_city_title}
                  </ReactMarkdown>
                  <h1 className="mt-1 text-lg font-extrabold text-white md:mt-3 md:text-3xl lg:text-3xl">
                    <ReactMarkdown
                      className="mb-0 mt-0 font-exo2 text-xl font-extrabold text-black md:text-2xl lg:text-3xl"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {data.meta_heading_h1}
                    </ReactMarkdown>
                  </h1>
                </div>
              </div>
              <div className="grid w-full bg-white/30 p-4 md:grid-cols-2">
                {[...Array(9).keys()].map((item, index) => (
                  <div
                    key={index}
                    className={`flex w-11/12 items-center space-x-2 py-2 pr-3 text-sm text-black md:w-auto lg:w-auto  lg:text-base`}
                  >
                    <div className={`flex space-x-2 text-sm lg:text-xl `} />
                    {/* <ArrowRightCircleIcon className="h-5 text-black" /> */}
                    {listIcn}

                    <ReactMarkdown
                      className="truncate text-left"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {data[`pros_${item + 1}`]}
                    </ReactMarkdown>
                  </div>
                ))}
              </div>
            </div>

            <div className="z-10 hidden w-full flex-col items-center justify-center md:flex">
              <div className="w-[362px] bg-white/50 p-3">
                <h2 className="text-center font-bold text-black">
                  Request a quote and we'll send you our best price.
                </h2>
                <form className="mt-2 flex flex-col gap-4">
                  {/* Field Group Name */}
                  <div className="flex flex-row items-center gap-2 bg-white p-2">
                    <div className="font-size-[20px] border-r border-solid border-gray-500 pr-2">
                      <UserIcon class="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border-0 p-1 text-black"
                      />
                    </div>
                  </div>
                  {/* /Field Group Name */}
                  {/* Field Group Email */}
                  <div className="flex flex-row items-center gap-2 bg-white p-2">
                    <div className="font-size-[20px] border-r border-solid border-gray-500 pr-2">
                      <EnvelopeIcon class="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Email"
                        className="w-full border-0 p-1 text-black"
                      />
                    </div>
                  </div>
                  {/* /Field Group Email */}
                  {/* Field Group Phone */}
                  <div className="flex flex-row items-center gap-2 bg-white p-2">
                    <div className="font-size-[20px] border-r border-solid border-gray-500 pr-2">
                      <PhoneIcon class="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Phone"
                        className="w-full border-0 p-1 text-black"
                      />
                    </div>
                  </div>
                  {/* /Field Group Phone */}
                  {/* Field Group Message */}
                  <div className="flex flex-row items-center gap-2 bg-white p-2">
                    <div className="w-full">
                      <textarea
                        placeholder="Message"
                        className="w-full border-0 p-1 text-black"
                      ></textarea>
                    </div>
                  </div>
                  {/* /Field Group Message */}
                  {/* Field Group Message */}
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-full">
                      <button className="w-full bg-primary p-2 text-xl">
                        Claim My Free Estimate.
                      </button>
                    </div>
                  </div>
                  {/* /Field Group Message */}
                </form>
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>
      <div className="item-center mt-[20px] flex w-full justify-center md:hidden">
        {data?.phone && (
          <ContactButton
          textClass="font-extrabold bg-primary text-white relative top-1 z-10 p-1 -left-6 pl-8 pr-6 rounded-r-3xl -ml-4 font-exo2 text-[22px] font-black"
            className="text- gap-0 bg-transparent px-5 text-left lg:px-5"
            data={data.phone}
            phoneClass="bg-primary text-white p-[30px] md:p-6 rounded-full relative z-20"
            phoneIconClass="h-5 lg:h-7"
            callClass="bg-black text-white relative -left-8 rounded-tr-lg z-0 rounded-tr-3xl w-11/12 h-7 font-exo2 text-xl font-medium"
            icon1={icnSVG}
            icon1Class="absolute -left-3 top-0"
            icon2={icnSVG2}
            iconClass2="absolute right-[-3px] top-[27px]"
            icon3={icnSVG3}
            iconClass3="absolute left-[23px] top-[-9px]"
          />
        )}
      </div>

      <Container className="mb-4 block w-11/12 md:hidden">
        <div className="z-10 w-full flex-col items-center justify-center md:flex">
          <div className="w-full bg-white p-3">
            <h2 className="text-center font-bold text-black">
              Request a quote and we'll send you our best price.
            </h2>
            <form className="mt-2 flex flex-col gap-4">
              {/* Field Group Name */}
              <div className="flex flex-row items-center gap-2 border border-solid border-gray-500 bg-white p-2">
                <div className="font-size-[20px] border-r border-solid border-gray-500 pr-2">
                  <UserIcon class="h-6 w-6 text-gray-500" />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border-0 p-1 text-black"
                  />
                </div>
              </div>
              {/* /Field Group Name */}
              {/* Field Group Email */}
              <div className="flex flex-row items-center gap-2 border border-solid border-gray-500 bg-white p-2">
                <div className="font-size-[20px] border-r border-solid border-gray-500 pr-2">
                  <EnvelopeIcon class="h-6 w-6 text-gray-500" />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full border-0 p-1 text-black"
                  />
                </div>
              </div>
              {/* /Field Group Email */}
              {/* Field Group Phone */}
              <div className="flex flex-row items-center gap-2 border border-solid border-gray-500 bg-white p-2">
                <div className="font-size-[20px] border-r border-solid border-gray-500 pr-2">
                  <PhoneIcon class="h-6 w-6 text-gray-500" />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-full border-0 p-1 text-black"
                  />
                </div>
              </div>
              {/* /Field Group Phone */}
              {/* Field Group Message */}
              <div className="flex flex-row items-center gap-2 border border-solid border-gray-500 bg-white p-2">
                <div className="w-full">
                  <textarea
                    placeholder="Message"
                    className="w-full border-0 p-1 text-black"
                  ></textarea>
                </div>
              </div>
              {/* /Field Group Message */}
              {/* Field Group Message */}
              <div className="flex flex-row items-center gap-2">
                <div className="w-full">
                  <button className="w-full bg-primary p-2 text-xl text-white">
                    Claim My Free Estimate.
                  </button>
                </div>
              </div>
              {/* /Field Group Message */}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
