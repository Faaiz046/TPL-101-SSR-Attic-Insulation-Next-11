import fs from "fs";

const withBaseUrl = (domain, relativeUrl) =>
  `${domain}${!!relativeUrl
    ? relativeUrl.startsWith('/')
      ? relativeUrl
      : `/${relativeUrl}`
    : ''
  }`

export async function getSitemaps(domain) {

  const imagess= JSON.parse(fs.readFileSync(`${process.cwd()}/public/${domain}/json/images.json`))


  const starSetImage = imagess.find(
    (image) => image?.tagName === "star-set-yellow"
  );
  const bankCardsImage = imagess.find(
    (image) => image?.tagName === "bank-cards"
  );
  const instagramImage = imagess.find(
    (image) => image?.tagName === "instagram-icon-white"
  );
  const twitterImage = imagess.find(
    (image) => image?.tagName === "twitter-icon-white"
  );
  const facebookImage = imagess.find(
    (image) => image?.tagName === "fb-icon-white"
  );
  const linkedinImage = imagess.find(
    (image) => image?.tagName === "linkedin-icon-white"
  );
  const bannerImage = imagess.find(
    (image) => image?.tagName === "banner-bg"
  );
  const blogImage = imagess.find(
    (image) => image?.tagName === "blog-1"
  );
  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
    }).toString()}`
  )

  const data = await response.json()

  const blogResponse = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
      type: "blog"
    }).toString()}`
  )

  const blogData = await blogResponse.json()

  const footerImages = [
    withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${starSetImage?.imageName}`),
    withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${bankCardsImage?.imageName}`),
    withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${instagramImage?.imageName}`),
    withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${twitterImage?.imageName}`),
    withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${facebookImage?.imageName}`),
    withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${linkedinImage?.imageName}`),
  ]

  const urls = [
    ...data.main_menu
      .filter((item) => !item.href.endsWith('#'))
      .map((item) => {
        let images = [...footerImages]
        if (item.href === '/') {
          images.push(withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${bannerImage?.imageName}`))
        } else if (item.href === "/blog") {
          images = [...images, ...blogData.blog_list.map((item) => {
            // const blogSlug = item.href.split(/[\n|\r|?]/).join("")
            // const blogImageUrl = withBaseUrl(domain, `/img/${blogSlug.replace(new RegExp(`-${data.last_url_path}`), '')}-blog.jpg`)
            const blogImageUrl = withBaseUrl(
              domain,
              `${process.env.IMAGE_PATH}${domain}/${blogImage?.imageName}`
            );
            return blogImageUrl
          })]
        }
        return {
          loc: withBaseUrl(domain, item.href),
          images,
          lastmod: new Date(),
        }
      }),
    ...data.zip_list.map((item) => ({
      loc: withBaseUrl(domain,
        `${data.default_service}-${data.last_url_path}${item.path}`
      ),
      images: [...footerImages, withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${bannerImage?.imageName}`)],
      lastmod: new Date(),
    })),
    ...data.service_list.map((item) => ({
      loc: withBaseUrl(domain, `${item.path}-${data.last_url_path}`),
      images: [...footerImages, withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${imagess.find(
        (image) => image?.tagName === `${item.path}-banner-bg`)?.imageName}`)],
      lastmod: new Date(),
    })),
    ...data.service_list.reduce(
      (prev, service) => [
        ...prev,
        ...data.zip_list.map((item) => ({
          loc: withBaseUrl(domain, `${service.path}-${data.last_url_path}${item.path}`),
          images: [...footerImages, withBaseUrl(domain, `${process.env.IMAGE_PATH}${domain}/${imagess.find(
            (image) => image?.tagName === `${service.path}-banner-bg`)?.imageName}`)],
          lastmod: new Date(),
        })),
      ],
      []
    ),
    ...blogData.blog_list.map((item) => {
      const blogSlug = item.href.split(/[\n|\r|?]/).join("")
      const blogLink = withBaseUrl(domain, `/blog/${blogSlug}`)
      const blogImageUrl = withBaseUrl(domain, 
        `${process.env.IMAGE_PATH}${domain}/${blogImage?.imageName}`
      )
        // `/img/${blogSlug.replace(new RegExp(`-${data.last_url_path}`), '')}-blog.jpg`)
      return ({
        loc: blogLink,
        images: [...footerImages, blogImageUrl],
        lastmod: new Date(),
      })
    })
  ]

  const sitemaps = []

  while (urls.length) {
    sitemaps.push(urls.splice(0, 200))
  }

  return sitemaps
}
