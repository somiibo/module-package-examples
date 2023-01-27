let somiibo;

async function main(mod) {
  somiibo = mod;

  // Execute code in the browser
  await somiibo.browser().execute(async () => {
    return await fetch('https://jsonplaceholder.typicode.com/users/1').then(resp => resp.json())
  }, {trusted: true})  
    .then((response) => {
      // The response will be the JSON object from the fetch call
      somiibo.log('Execute response', response);
    })
    .catch((e) => {
      somiibo.log('Error during .execute()', e);
    })

  return somiibo.stop();
}

module.exports = main;
