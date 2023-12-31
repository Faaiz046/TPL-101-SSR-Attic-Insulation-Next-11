import { Fragment } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { Container, Divider, FullContainer } from '../common';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function Reviews({ review_heading, review_list }) {
  let stars = (count) =>
    new Array(count)
      .fill(0)
      .map((_, index) => (
        <StarIcon key={index} className="h-4 text-yellow-300" />
      ));

  return (
    <FullContainer className="bg-secondary/10 py-10 text-black lg:py-16">
      <Container>
        <h2 className="text-center text-3xl font-extrabold uppercase text-black lg:text-3xl">
          {review_heading}
        </h2>
        <Divider className="bg-black" />
        <div className="flex flex-col items-center">
          {review_list?.map((item, index) => (
            <div className="mt-5 flex flex-col gap-4 md:flex-row" key={index}>
              {item?.review_title && (
                <h3 className="mb-3 text-3xl  font-extrabold text-black">
                  {item?.review_title}
                </h3>
              )}
              <div>
                <div className="text-left">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {item?.review_text}
                  </ReactMarkdown>
                </div>
                {item?.review_text && (
                  <p className="mt-2 flex items-center justify-center text-lg">
                    <span className="mr-2 mt-1">{item?.review_rating}</span>
                    {item?.review_rating &&
                      stars(+item?.review_rating[0])
                        .map((item, index) => (
                          <Fragment key={index}>{item}</Fragment>
                        ))
                        .slice(0, item?.stars)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
