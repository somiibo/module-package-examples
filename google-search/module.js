let somiibo;
let settings;
async function main(mod) {

  somiibo = mod;

  // Let's save all our user-supplied settings to a variable so we can access them later
  somiibo.initialize(() => {
    settings = somiibo.getSetting();
  });

  // As long as we're on Google, let's try to click a link
  if (somiibo.getURL().match(/google.com/)) {

    // Supply an array to .type() to type multiple strings.
    // This is useful if you need to type special characters, such as 'Enter', which needs to be an exact match
    await somiibo.type([settings.searchQuery, 'Enter']);

    // Select a link on the Google search results page
    // The CSS selector for a link is: .srg a h3
    // We also need to use the index property to tell it to select a specifc one
    // We can chain .scroll() and .click() to scroll to and then click the element, respectively
    // We supply an offsetY on .scroll() to compensate for the height of the nav bar on the page or else it might get stuck behind that
    await somiibo.select('a h3')
    .then((r) => r.scroll(undefined, {offsetY: 150}))
    .then((r) => r.click())

    // Let's log this property so you can see what the returned selected element looks like
    // You can press cmd+option+i / ctrl+shift+i to open the dev tools
    somiibo.log(somiibo.property.selected);

    // Finally, loop the module
    somiibo.loop(main);
  } else {
    // If we made it to a site, we can close the module!
    somiibo.alert({type: 'success', title: 'We did it!', content: 'We made it to a site!', button: 'Cool!'});
    somiibo.stop();
  }
}

module.exports = main;
