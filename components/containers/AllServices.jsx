import Link from "next/link";
import { Container, Divider, FullContainer } from "../common";

export default function AllServices({ data, params }) {
  return (
    <FullContainer
      id="allServices"
      className="bg-white py-16 lg:py-20 text-white"
    >
      <Container className="lg:text-lg">
        <h2 className="text-3xl font-extrabold text-center uppercase lg:text-3xl text-black">
          {data.title}
        </h2>
        <Divider className="bg-black" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-5 w-full">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="hover:shadow-primary shadow-md bg-primary py-3 px-1 rounded border border-white/40 lg:text-sm text-center hover:text-black hover:bg-white transition-all cursor-pointer"
            >
              <Link
                key={index}
                href={`/${item.path}-${data.last_url_path}${
                  !!params?.zip ? `/${params?.zip}` : ""
                }`.replace("//", "/")}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
