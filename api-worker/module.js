let somiibo;
let counter = 0;
async function main(mod) {
  somiibo = mod;

  counter++;

  await somiibo.worker(function (counter) {
    // Currently, workers do not have access to any special libraries like modules do.
    // For now, you must use native DOM manipulation methods as seen in the worker script below
    if (!window.location.href.includes('/search/')) {
      // Type a search query where counter is the argument passed in to the worker script
      document.querySelector('input[name="q"').value = `number ${counter} on wikipedia`;
      // Click the search button
      document.querySelectorAll('input[type="submit"]')[2].click();
    }
  }, {
    arguments: [counter],
    url: 'https://google.com',
    // proxy: '',
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
    width: 600,
    height: 800,
    referrer: 'https://google.com',
    timeout: 60000,
    debug: true,
  })
  .catch(function (e) {
    somiibo.log('Failed to set up worker', e);
  });

  if (counter < 3) {
    somiibo.loop(main);
  } else {
    somiibo.stop();
  }

}

module.exports = main;
