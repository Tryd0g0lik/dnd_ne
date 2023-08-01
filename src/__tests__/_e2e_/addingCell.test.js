import puppeteer from 'puppeteer';

describe("Test interfice It's adding cell", () => {
  let browser;
  let page;


  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('Adding a cell from the first collumn: ', async () => {
    await page.goto('http://localhost:9000');
    await page.waitForSelector('main');

    const collumn01 = await page.$('#column-01 footer .cell');
    await collumn01.click();

  });
  afterEach(async () => {
    await browser.close();
  });
});
