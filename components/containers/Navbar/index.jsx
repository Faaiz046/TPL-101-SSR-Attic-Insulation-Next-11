import { Bars3Icon, MapPinIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ContactButton, FullContainer } from '../../common';
import Dropdown from './Dropdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
const Navbar = ({
  phone,
  services,
  params,
  main_menu,
  // logo_text,
  last_url_path,
  latitude,
  longitude,
  city,
  industry_name,
}) => {
  const router = useRouter();
  const [sidebar, openSidebar] = useState(false);
  const { service } = router.query;
  const handleSidebar = () => {
    openSidebar(!sidebar);
  };
  useEffect(() => {
    openSidebar(false);
  }, [service]);
  const svg1 = (
    <svg
      width="320"
      height="80"
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H282.347L320 80H15.3147L0 0Z" fill="white" />
    </svg>
  );
  const svg2 = (
    <svg
      width="29"
      height="32"
      viewBox="0 0 29 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 0.5L0 32H29L22 0.5Z" fill="white" />
    </svg>
  );
const logo_text="Attic Insulation"
  return (
    <FullContainer className=" sticky top-0 z-20 bg-primary text-white">
      <nav className="flex w-11/12 max-w-screen-2xl grid-cols-2 items-center justify-between lg:grid lg:grid-cols-3 lg:py-0">
        <div className="flex items-center">
          <div className=" items-center text-left text-primary lg:flex">
            <span className="absolute top-0 z-10 flex h-[76px] items-center whitespace-pre-wrap pl-3.5 uppercase">
              <Link
                target="_blank"
                title="map link"
                alt="map link"
                href={`https://www.google.com/maps/place/${industry_name}+in+${city}/@${latitude},${longitude},13z`}
              >
                <MapPinIcon
                  className="text- mr-2 h-10 cursor-pointer lg:mr-3 lg:h-8"
                  alt="map icon"
                />
              </Link>
              <Link
              href="/"
              className="cursor-pointer"
              passHref
            >      
            <a>      
              <ReactMarkdown
                  className="text-2xl md:text-3xl lg:text-2xl font-extrabold uppercase text-primary font-exo2"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    p: ({ children }) => {
                      const words = String(children).split(' ');
                      return (
                        <p>
                          <span className={`${words?.length>1?"text-black":"text-primary"}`}>{words[0]}</span>
                          {'\n'}
                          {words?.slice(1).map((word, index) => (
                            <span key={index} className="text-primary">{word} </span>
                          ))}
                        </p>
                      );
                    },
                  }}
                >
                  {logo_text}
                </ReactMarkdown>
                </a>
                </Link>
            </span>
            <span className="relative">
              <span className="absolute bottom-0 left-0 z-10">{svg2}</span>

              {svg1}
            </span>
          </div>
          <div className="text-2xl font-extrabold uppercase text-white lg:text-3xl">
            {/* <Link
              href="/"
            >
              {logo_text}
            </Link> */}
          </div>
        </div>
        <div className="hidden items-center justify-center space-x-5 lg:flex">
          {main_menu.map((item, index) =>
            item.href === '#' ? (
              <Dropdown
                last_url_path={last_url_path}
                key={index}
                data={services}
                params={params}
                title={item.text}
              />
            ) : (
              <div
                key={index}
                className={
                  router.pathname === `${item.href}`
                    ? 'activeNavLink'
                    : 'NavLink'
                }
              >
                <Link href={item.href}>{item.text}</Link>
              </div>
            )
          )}
        </div>
        <div className="flex items-center justify-end">
          <span className="hidden lg:block">
            {phone && (
              <ContactButton
                textClass="lg:text-3xl font-extrabold"
                className="py-1  bg-[#af6f34] rounded-none"
                data={phone}
              />
            )}
          </span>

          <Bars3Icon
            onClick={handleSidebar}
            className="h-8 text-white lg:hidden"
          />
        </div>
      </nav>
      <div
        className={
          sidebar
            ? 'flex h-screen w-10/12 flex-col items-center py-16 lg:hidden lg:w-9/12'
            : 'hidden'
        }
      >
        {main_menu.map((item, index) =>
          item.href === '#' ? (
            <Dropdown
              last_url_path={last_url_path}
              title={item.text}
              key={index}
              data={services}
              params={params}
            />
          ) : (
            <div
              key={index}
              className="w-full border-b border-primary px-3 pb-5 pt-6 text-2xl"
            >
              <Link href={item.href}>{item.text}</Link>
            </div>
          )
        )}
        <span className="mt-20 flex w-full justify-center">
          {phone && (
            <ContactButton
              textClass="font-extrabold"
              className="py-4 bg-[#af6f34] rounded-none"
              data={phone}
            />
          )}
        </span>
      </div>
    </FullContainer>
  );
};

export default Navbar;
