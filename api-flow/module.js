let somiibo;
let counter;

async function main(mod) {
  somiibo = mod;

  // Configure can only run once in a given module's lifecycle
  // It should be used to configure the module or set up things
  await somiibo.initialize(() => {
    somiibo.log('This will only run once!');

    counter = 0;
  });

  // After 3 loops, quit
  if (counter >= 3) {
    return somiibo.stop();
  }

  // Wait between 1 and 2 seconds.
  await somiibo.wait(1000, 2000);

  somiibo.log(`This is run #${counter}`);

  counter++;

  return somiibo.loop(main);  
}

module.exports = main;
