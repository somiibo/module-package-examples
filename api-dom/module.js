let somiibo;

async function main(mod) {
  somiibo = mod;

  // First, navigate to Google
  await somiibo.browser().navigate('https://google.com');

  // Then let's search for 'number 1 on wikipedia'
  await somiibo.browser().type(['number 1 on wikipedia', 'Enter']);

  // Lets navigate to the wikipedia page for the number 1
  // First, we need to .select() the link, .scroll() to it, then .click() it
  await somiibo.browser().select('a', {
    filters: [
      // Lets filter the a tags down to the ones that match this Regular Expression
      {match: {innerText: /1 \(number\)/i}},
    ]
  })
  .then(() => somiibo.browser().scroll(undefined, {offsetY: 150}))
  .then(() => somiibo.browser().click());

  // Let's log the selected element so we can see what it looks like
  somiibo.log('somiibo.browser().property.select', somiibo.browser().properties.select);

  // Then let's find a link to the number 2 on wikipedia
  await somiibo.browser().select('a[href="/wiki/2_(number)"]', {
    // We can select a random element out of all those that are selected
    index: '$random'
  })
  .then(() => somiibo.browser().scroll())
  .then(() => somiibo.browser().click());

  // Quit
  return somiibo.stop();
}

module.exports = main;
