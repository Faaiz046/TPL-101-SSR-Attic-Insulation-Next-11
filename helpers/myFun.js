export const cleanDomain = (domain) => {
  if (!domain) {
    return domain;
  }
  return domain
    .replace(' ', '')
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '');
};

export const getDomain = (host) => {
  let domain = process.env.DOMAIN.split(',')[0];
  if (host && host != 'localhost:3000' && !host.includes('amplifyapp.com') && !host.includes('cloudfront.net')) {
    domain = cleanDomain(host);
  }
  return domain;
};
