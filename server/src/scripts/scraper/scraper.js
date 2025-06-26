const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const https = require('https');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const BASE_URL = process.env.BASE_URL;

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(filepath, () => reject(err));
    });
  });
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    protocolTimeout: 300000, // gives more time to Puppeteer internals
    args: ['--lang=en-GB,en',
      '--start-maximized'
    ]
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-GB,en;q=0.9'
  });

  sleep(12000);
  const allWineData = [];
  const maximumPages = 48;
  let currentPage = 1;
  let _Id = 1;

  const outputPath = path.join(__dirname, 'wines.json');
  const imagesDir = path.join(__dirname, 'images');
  fs.mkdirSync(imagesDir, { recursive: true });

  while (currentPage <= maximumPages) {

    const pageUrl = `${BASE_URL}/explore?currency_code=EUR&min_rating=1&order_by=best_picks&order=desc&page=${currentPage}&price_range_max=500&price_range_min=7&vc_only=&wsa_year=null&discount_prices=false&wine_type_ids[]=1&wine_type_ids[]=2&wine_type_ids[]=3&wine_type_ids[]=4`;

    console.log(`Navigating to Page: ${currentPage}`);
    await page.goto(pageUrl, { waitUntil: 'networkidle2' });

    await page.waitForSelector('[data-testid="vintagePageLink"]');
    const wineUrls = await page.$$eval('[data-testid="vintagePageLink"]', anchors => {
      return anchors.map(a => a.getAttribute('href'));
    });
    console.log(`Found ${wineUrls.length} wine links`);

    for (let i = 0; i < wineUrls.length; i++) {
      const fullUrl = BASE_URL + wineUrls[i];
      console.log(`Visiting wine ${i + 1}/${wineUrls.length}: ${fullUrl}`);

      const detailPage = await browser.newPage();
      await detailPage.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en;q=0.9'
      });

      try {
        await detailPage.goto(fullUrl, { waitUntil: 'networkidle2' });

        const data = await detailPage.evaluate((_Id) => {
          const cleanText = (selector) => document.querySelector(selector)?.textContent.replace(/[^0-9.,]/g, ' ').trim() || null;
          const getText = (selector) => document.querySelector(selector)?.textContent.trim() || null;
          const getByAttr = (attr) => document.querySelector(`[${attr}]`)?.textContent.trim() || null;

          const getWineDescription = () => {
            const rows = document.querySelectorAll('.wineFacts__wineFacts--2Ih8B tr');
            for (const row of rows) {
              const label = row.querySelector('th')?.innerText.trim().toLowerCase();
              if (label.includes('wine description') || label.includes('weinbeschreibung')) {
                return row.querySelector('td')?.innerText.trim() || null;
              }
            }
            return null;
          };

          const imgSrc = document.querySelector('img.wineLabel-module__image--3HOnd')?.getAttribute('src') || null;
          const fullImgUrl = imgSrc ? (imgSrc.startsWith('//') ? 'https:' + imgSrc : imgSrc) : null;

          return {
            id: _Id,
            name: getText('.wineHeadline-module__vintage--1UHSo a'),
            year: Array.from(document.querySelector('.wineHeadline-module__vintage--1UHSo')?.childNodes || [])
              .find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim())?.textContent.trim() || null,
            grape: getByAttr('data-cy="breadcrumb-grape"'),
            wineType: getByAttr('data-cy="breadcrumb-winetype"'),
            country: getByAttr('data-cy="breadcrumb-country"'),
            region: getByAttr('data-cy="breadcrumb-region"'),
            price: cleanText('.purchaseAvailability__currentPrice--3mO4u') || 'Request price',
            image: fullImgUrl,
            foodPairing: Array.from(document.querySelectorAll('.foodPairing__foodContainer--1bvxM a'))
              .map(a => a.querySelector('div:last-of-type')?.textContent.trim())
              .filter(Boolean) || 'no foodparing found',
            description: getWineDescription() || 'No description found'
          };
        }, _Id);

        if (data.image) {
          const imgFilename = `${_Id}.png`;
          const imgDownloadPath = path.join(imagesDir, imgFilename);
          const imgReferencePath = `images/${imgFilename}`;

          try {
            await downloadImage(data.image, imgDownloadPath);
            console.log(`Downloaded image for wine ID ${_Id}`);
            data.image = imgReferencePath;
          } catch (imgErr) {
            console.warn(`Failed to download image for ${data.name}: ${imgErr.message}`);
            data.image = null;
          }
        } else {
          data.image = null;
        }

        allWineData.push(data);

        console.log(`Scraped: ${data.name}, ${data.year}`);
        _Id++;

        await detailPage.close();
        await sleep(300);

      } catch (err) {
        console.log(`Failed to scrape ${fullUrl}: ${err.message}`);
        await detailPage.close();
      }
    }

    fs.writeFileSync(outputPath, JSON.stringify(allWineData, null, 2));
    console.log(`Saved ${allWineData.length} wines to wines.json`);
    currentPage++;
  }

  await browser.close();
  console.log(`Scraping complete. Total wines saved: ${allWineData.length}`);
})();
