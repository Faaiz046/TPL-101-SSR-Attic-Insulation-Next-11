import { ContactButton, Container, Divider, FullContainer } from "../common";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import React from "react";

export default function Choice({ items, slogan, phone }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <FullContainer className="py-10 lg:py-12 bg-secondary/10 text-black">
      {/* {
        isMobile && phone &&
        <ContactButton
            textClass="font-extrabold"
            className="py-4"
            data={phone}
          />
      } */}
      <Container id="InformationDetailSection" className="text-center">
        <h2 className="text-3xl font-extrabold uppercase lg:text-3xl font-extrabold  text-center md:text-left text-black">
          {slogan}
        </h2>
        <Divider className="bg-black" />
        {items.map((item, index) => (
          <div key={index} className="my-4">
            <h3 className="text-3xl font-extrabold lg:text-3xl font-extrabold  text-left w-9/12 text-black">
              {item.heading}
            </h3>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              className="mt-3 text-black text-left"
            >
              {item.text}
            </ReactMarkdown>
          </div>
        ))}
      </Container>
    </FullContainer>
  );
}
