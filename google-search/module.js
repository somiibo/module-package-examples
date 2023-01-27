let somiibo;
let settings;

async function main(mod) {

  somiibo = mod;

  // Let's save all our user-supplied settings to a variable so we can access them later
  await somiibo.initialize(() => {
    settings = somiibo.getSetting();
  });

  // If we made it to a site, we can close the module!
  if (!somiibo.browser().getURL().match(/google.com/)) {
    somiibo.alert({type: 'success', title: 'We did it!', content: 'We made it to a site!', button: 'Cool!'});
    return somiibo.stop();
  }    

  // Supply an array to .type() to type multiple strings.
  // This is useful if you need to type special characters, such as 'Enter', which needs to be an exact match
  await somiibo.browser().type([settings.searchQuery, 'Enter']);

  // Use .select() to select a link on the Google search results page (we also need to use the index property to tell it to select a specifc one)
  // We can chain .scroll() and .click() to scroll to and then click the element, respectively
  // We supply an offsetY on .scroll() to compensate for the height of the nav bar on the page or else it might get stuck behind that  
  await somiibo.browser().select('a h3', {index: '$random'})
    .then(() => somiibo.browser().scroll('$selected', {offsetY: 150}))
    .then(() => somiibo.browser().click())

  // Let's log this property so you can see what the returned selected element looks like
  // You can press CMD + Option + i / CTRL + Shift + i to open the dev tools
  somiibo.log('Selected element', somiibo.browser().properties.select);

  // Finally, loop the module
  somiibo.loop(main);
}

module.exports = main;
