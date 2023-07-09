import { ContactButton, Container } from "../common";

export default function NeedHelp({ data, contact }) {
  return (
    <Container className="bg-secondary px-10 text-white py-16">
      <h2 className="text-3xl font-extrabold lg:text-3xl font-extrabold text-center  mb-10">
        {data.title}
      </h2>
      { contact&& <ContactButton data={contact} />}
    </Container>
  );
}
