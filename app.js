// ライブラリのインポート
const webdriver = require('selenium-webdriver');
const readlineSync = require('readline-sync');
const { Builder, By, Key, until } = webdriver;

// Chromeの設定
const capabilities = webdriver.Capabilities.chrome();
capabilities.set('chromeOptions', {
  args: [
    '--no-sandbox',
    '--window-size=1980,1200'
  ]
});

(async () => {
  // 検索するキーワードを格納する
  console.clear();
  let location = await readlineSync.question('どこで食べたい？：');
  let favorite_food = await readlineSync.question('何を食べたい？');

  // ブラウザの立ち上げ
  const driver = await new Builder().withCapabilities(capabilities).build();

  try {
    // Googleを開く
    let index_uri = 'https://www.google.com';
    await driver.get(index_uri);
    
    // 検索する
    let search_word = location + ' ' + favorite_food;
    await driver
      .wait(until.elementLocated(By.name('q')), 5000)
      .sendKeys(search_word, Key.ENTER);

    // 検索結果の情報を取得する
    const result_stats = await driver
      .wait(until.elementLocated(By.id('resultStats')), 5000)
      .getText();

    const top_title = await driver
      .wait(until.elementLocated(By.className('S3Uucc')), 5000)
      .getText();
    
    const top_uri = await driver
      .wait(until.elementLocated(By.className('TbwUpd')), 5000)
      .getText(URL);

    console.clear();
    console.log('ヒット数は "' + result_stats + '" 件です');
    console.log('検索最上位のタイトルは "' + top_title + '" です');
    console.log('検索最上位のURLは "' + top_uri + '" です');

  } catch(err) {
    console.log(err);

  } finally {
    // ブラウザの終了
    await driver.quit();

  }
})();