import Link from "next/link";

export default function ZipCodes({ data, params, default_service }) {
  return (
    <div className="bg-primary p-10 text-center lg:text-left">
      <h2 className="text-3xl text-white lg:text-3xl font-extrabold ">
        {data.title}
      </h2>
      <div className="mt-5 lg:mt-8 grid grid-cols-3 lg:grid-cols-6 gap-2">
        {data.items.map((item, index) => (
          <div
            className="px-4 py-2 text-sm rounded border text-white hover:text-black  border-white/80 text-center hover:bg-white transition-all cursor-pointer"
            key={index}
          >
            <Link
              href={`/${
                params?.service ||
                `${default_service.toLowerCase()}-${data.last_url_path}`
              }${item.path}`.replace("//", "/")}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
