let somiibo;
async function main(mod) {
  somiibo = mod;

  await somiibo.navigate('https://en.wikipedia.org/wiki/1');
  await somiibo.navigate('https://en.wikipedia.org/wiki/2');
  await somiibo.navigate('https://en.wikipedia.org/wiki/3');
  somiibo.log('Current URL:', somiibo.getURL());
  await somiibo.navigateBack();
  somiibo.log('Current URL after 1 .navigateBack():', somiibo.getURL());
  await somiibo.navigateBack();
  somiibo.log('Current URL after 2 .navigateBack():', somiibo.getURL());
  await somiibo.navigateForward();
  somiibo.log('Current URL after 1 .navigateForward():', somiibo.getURL());
  await somiibo.navigateForward();
  somiibo.log('Current URL after 2 .navigateForward():', somiibo.getURL());

  somiibo.stop();
}

module.exports = main;
