let somiibo;
let counter;
async function main(mod) {
  somiibo = mod;

  // Configure can only run once in a given module's lifecycle
  // It should be used to configure the module or set up things
  somiibo.configure(() => {
    counter = 0;
  });

  if (counter < 3) {
    // Wait between 1 and 2 seconds.
    await somiibo.wait(1000, 2000);
    counter++;
    somiibo.loop(main);
  } else {
    somiibo.stop();
  }
}

module.exports = main;
