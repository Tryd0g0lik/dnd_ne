import puppeteer from 'puppeteer';

describe('Interface bottom Delete testing from the cell on www-page', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      detools: true
    });

    page = await browser.newPage();
  });

  test('bottom delet is tessting;', async () => {
    await page.goto('http://localhost:9000');
    await page.waitForSelector('main');

    const task = await page.$('#column-01 .task'); // выбираем ячейку
    await task.hover();
    let f = await task.$('.delete-task'); // выбираем кнопку 'удалить'
    await f.click();

    await page.screenshot({ path: './pic/screenshot.png' });
  });

  afterEach(async () => {
    await browser.close();
  });
});
