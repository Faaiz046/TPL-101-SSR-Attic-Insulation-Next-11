import { ContactButton, Container, FullContainer } from "../common";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function ReasonToContact({ items, phone }) {
  return (
    <FullContainer className="py-12 lg:py-16 bg-white">
      <Container className="lg:text-lg">
        <div className="flex mb-5 lg:mb-10 justify-center">
          { phone&& <ContactButton data={phone} />}
        </div>
        {items.map((item, index) => (
          <div key={index} className="my-2 lg:my-4">
            <h3 className="text-xl lg:text-3xl text-black font-extrabold  text-left w-9/12">
              {item.heading}
            </h3>
            <div className="mt-2 lg:mt-3 text-gray-700 text-left">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {item.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </Container>
    </FullContainer>
  );
}
