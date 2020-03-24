let somiibo;
async function main(mod) {
  somiibo = mod;

  await somiibo.execute('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', {
    trusted: true,
  })
  .then((result) => {
    somiibo.log(result); // Will be the JSON object from the fetch call
  })
  .catch((e) => {
    somiibo.log('Error during .execute()', e);
  })

  somiibo.stop();
}

module.exports = main;
