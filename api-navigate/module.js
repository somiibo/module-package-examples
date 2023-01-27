let somiibo;

async function main(mod) {
  somiibo = mod;

  // Lets navigate 3 times 
  await somiibo.browser().navigate('https://en.wikipedia.org/wiki/1');
  await somiibo.browser().navigate('https://en.wikipedia.org/wiki/2');
  await somiibo.browser().navigate('https://en.wikipedia.org/wiki/3');

  // Log the current URL
  somiibo.log('Current URL:', somiibo.browser().getURL());

  // Navigate back and then log
  await somiibo.browser().navigateBack();
  somiibo.log('Current URL after .navigateBack():', somiibo.browser().getURL());

  // Navigate back and then log
  await somiibo.browser().navigateBack();
  somiibo.log('Current URL after .navigateBack():', somiibo.browser().getURL());

  // Navigate forward and then log
  await somiibo.browser().navigateForward();
  somiibo.log('Current URL after .navigateForward():', somiibo.browser().getURL());

  // Navigate back and then log
  await somiibo.browser().navigateForward();
  somiibo.log('Current URL after .navigateForward():', somiibo.browser().getURL());

  return somiibo.stop();
}

module.exports = main;
