let somiibo;
async function main(mod) {
  somiibo = mod;

  // First, navigate to Google
  await somiibo.navigate('https://google.com');

  // Then let's search for 'number 1 on wikipedia'
  await somiibo.type(['number 1 on wikipedia', 'Enter']);

  // Lets navigate to the wikipedia page for the number 1
  // First, we need to .select() the link, .scroll() to it, then .click() it
  await somiibo.select('a', {
    filters: [
      // Lets filter the a tags down to the ones that match this Regular Expression
      {match: {innerText: /1 \(number\)/i}},
    ]
  })
  .then(() => somiibo.scroll(undefined, {offsetY: 150}))
  .then(() => somiibo.click());

  // Let's log the selected element so we can see what it looks like
  somiibo.log('somiibo.property.select', somiibo.property.select);

  // Then let's find a link to the number 2 on wikipedia
  await somiibo.select('a[href="/wiki/2_(number)"]', {
    // We can select a random element out of all those that are selected
    index: '$random'
  })
  .then(() => somiibo.scroll())
  .then(() => somiibo.click());

  somiibo.stop();
}

module.exports = main;
