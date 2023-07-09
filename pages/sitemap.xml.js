import { getDomain } from "../helpers/myFun";
import { getSitemaps } from "../sitemap-api";

const Sitemap = () => {};

export const getServerSideProps = async ({ req, res }) => {
  const domain = getDomain(req?.headers?.host);
  
  const sitemaps = await getSitemaps(domain);

  const sitemapindex = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/${domain}/sitemap.xsl" ?>
  
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (sitemap, index) => `
        <sitemap>
          <loc>
            ${domain.startsWith("https://") 
              ? domain 
              : `https://${
                domain.startsWith("www.")
                ? domain 
                : `www.${domain}`
              }`
            }/sitemaps/${index + 1}
          </loc>
          <lastmod>${new Date()}</lastmod>
        </sitemap>
      `
    )
    .join("")}
  </sitemapindex>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapindex);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
