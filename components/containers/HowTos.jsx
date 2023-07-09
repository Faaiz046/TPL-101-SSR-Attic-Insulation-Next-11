import React from "react";
import { ContactButton, Container, Divider, FullContainer } from "../common";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function HowTos({ phone, items, title, description }) {
  return (
    <FullContainer className="py-10 lg:py-16 bg-secondary/10 w-full mx-auto overflow-hidden">
      <Container>
        <h2 className="text-3xl font-extrabold lg:text-3xl font-extrabold  uppercase my-4 text-black text-center">
          {title}
        </h2>
        <Divider className="bg-black mx-auto" />
        <p className="my-4 text-black pt-4">{description}</p>
        <div className="w-full text-left">
          {items?.map((item, index) => (
            <div key={index} className="mt-2 text-black grid grid-cols-howTo mb-3">
              <span className="text-lg font-bold">{item.name}:{" "}</span>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {item.text}
              </ReactMarkdown>
            </div>
          ))}
        </div>
        { phone&& <ContactButton className="mt-12" data={phone} />}
      </Container>
    </FullContainer>
  );
}
