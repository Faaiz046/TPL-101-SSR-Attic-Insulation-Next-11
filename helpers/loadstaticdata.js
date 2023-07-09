require('dotenv').config();
const fs = require('fs');
const path = require('path');
const download = require('image-downloader');
const { randomUUID } = require('crypto');
const { default: fetch } = require('node-fetch');
const { piexif } = require('piexifjs');

async function downloadImage(url, tempPath, imgPath, location) {
  const { GPSLatitude, GPSLongitude } = location;

  const options = {
    url,
    dest: tempPath,
  };

  try {
    const { filename } = await download.image(options);
    const tempFile = fs.readFileSync(filename);
    const tempFileData = tempFile.toString('binary');
    try {
      const exifObj = piexif.load(tempFileData);

      exifObj.GPS[piexif.GPSIFD.GPSLatitude] =
        piexif.GPSHelper.degToDmsRational(GPSLatitude);
      exifObj.GPS[piexif.GPSIFD.GPSLatitudeRef] = 'N';
      exifObj.GPS[piexif.GPSIFD.GPSLongitude] =
        piexif.GPSHelper.degToDmsRational(GPSLongitude);
      exifObj.GPS[piexif.GPSIFD.GPSLongitudeRef] = 'W';

      const exifBytes = piexif.dump(exifObj);

      const imgFileData = piexif.insert(exifBytes, tempFileData);
      const imgFile = Buffer.from(imgFileData, 'binary');

      fs.writeFileSync(imgPath, imgFile);
      console.log('Saved to', imgPath);
    } catch (err) {
      console.log(err);
      fs.writeFileSync(imgPath, tempFile);
      console.log('Saved to', imgPath);
    }
  } catch (err) {
    console.log(err);
  }
}

const loadStaticData = async () => {
  const domains = process.env.DOMAIN.split(',');
  for (const domain of domains) {
    try {
      fs.rmdirSync(`./public/${domain}`, { recursive: true, force: true });
    } catch (err) {
      console.log("Folder doesn't exist");
    }

    fs.mkdirSync(`./public/${domain}`);
    // fs.mkdirSync(`./public/${domain}/img`);
    // fs.mkdirSync(`./public/${domain}/temp`);
    fs.mkdirSync(`./public/${domain}/json`);

    console.log('Loading static json data...');

    try {
      const homeResponse = await fetch(
        `${process.env.API_URL}/api/site?${new URLSearchParams({
          domain,
          type: 'home',
        }).toString()}`
      );

      const homeData = await homeResponse.json();

      fs.writeFile(
        `./public/${domain}/robots.txt`,
        homeData.robots_text,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

      fs.readFile(
        './public/main-sitemap.xsl',
        {
          encoding: 'utf-8',
        },
        (err, fileContents) => {
          if (err) console.log(err);
          else {
            fs.writeFile(
              `./public/${domain}/sitemap.xsl`,
              fileContents
                .replaceAll(
                  '%BASE_URL%',
                  `${domain.startsWith('https://') ? '' : 'https://www.'}${domain}`
                )
                .replaceAll('%CITY_NAME%', homeData.city)
                .replaceAll('%INDUSTRY_NAME%',homeData.industry_name),
                
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
      );

      const { latitude, longitude } = homeData;

      const apiImagesResponse = await fetch(
        `${
          process.env.API_URL
        }/api/template-images/domain?${new URLSearchParams({
          domain,
        }).toString()}`
      );
      
      const apiImages = await apiImagesResponse.json();

      fs.writeFile(
        `./public/${domain}/json/images.json`,
        JSON.stringify(apiImages),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

      // console.log("Downloading images...");

      // for (const image of apiImages) {
      //   const tempPath = path.join(
      //     process.cwd(),
      //     "public",
      //     domain,
      //     "temp",
      //     image.imageName
      //   );
      //   const imgPath = path.join(
      //     process.cwd(),
      //     "public",
      //     domain,
      //     "img",
      //     image.imageName
      //   );
      //   await downloadImage(image.path + `?q=${randomUUID()}`, tempPath, imgPath, {
      //     GPSLatitude: +latitude,
      //     GPSLongitude: +longitude,
      //   });
      // }
      //fs.rmdirSync(`./public/${domain}/temp`, { recursive: true, force: true });
    } catch (err) {
      console.log(
        '🚀 ~ file: loadstaticdata.js:49 ~ loadStaticData ~ err',
        err
      );
    }
  }
};

loadStaticData();
