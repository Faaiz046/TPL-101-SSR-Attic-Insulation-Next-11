import { Container } from "../common";

const Step = ({ stepNum, des }) => (
  <div className="grid grid-cols-process lg:block text-left text-white">
    <h2 className="italic p-3 bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center text-center">
      {stepNum}
    </h2>
    <h2 className="font-semibold lg:mt-2 text-lg bg-secondary p-3 px-5 lg:p-7 rounded-lg">
      {des}
    </h2>
  </div>
);

export default function Process({ items }) {
  return (
    <Container className="py-16 lg:py-24 text-white bg-primary">
      <div className="w-10/12 lg:w-9/12 grid lg:grid-cols-4 gap-7 grid-rows-1">
        {items.map((item, index) => (
          <Step key={index} stepNum={item.title} des={item.text} />
        ))}
      </div>
    </Container>
  );
}
