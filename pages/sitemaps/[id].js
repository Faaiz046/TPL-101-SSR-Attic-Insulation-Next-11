import { getDomain } from "../../helpers/myFun";
import { getSitemaps } from "../../sitemap-api";

const Sitemap = () => {};

export const getServerSideProps = async ({ req, res, params }) => {
  const id = +params.id;

  const domain = getDomain(req?.headers?.host);

  const sitemaps = await getSitemaps(domain);

  if (!sitemaps[id - 1]) {
    res.setHeader("Location", "/");
    res.statusCode = 301;
    res.end();
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/${domain}/sitemap.xsl" ?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${sitemaps[id - 1]
      .map(
        (url) =>
          `
            <url>
              <loc>
                ${url.loc.startsWith("https://") 
                ? url.loc 
                : `https://${
                  url.loc.startsWith("www.") 
                  ? url.loc 
                  : `www.${url.loc}`
                }`
              }
              </loc>
              ${url.images
                .map(
                  (image) =>
                    `
                  <image:image>
                    <image:loc>
                      ${image}
                    </image:loc>
                  </image:image>
                `
                )
                .join("")}
              <lastmod>${url.lastmod}</lastmod>
            </url>
          `
      )
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
