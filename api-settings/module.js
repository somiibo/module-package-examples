let somiibo;
let settings;
async function main(mod) {
  somiibo = mod;

  somiibo.initialize(() => {
    // The .initialize() method is a great place to make changes to the settings
    // Any changed settings are removed after the module stops, so you don't need to worry about accidentally overwriting
    settings = somiibo.getSetting();
    settings.myNumber *= 2;
  });

  somiibo.log('Individual setting (myNumber):', somiibo.getSetting('myNumber'));
  somiibo.log('Individual setting (myText):', somiibo.getSetting('myText'));
  somiibo.log('Individual setting (myTextArea):', somiibo.getSetting('myTextArea'));
  somiibo.log('Individual setting (myCheck):', somiibo.getSetting('myCheck'));
  somiibo.log('Individual setting (mySelect):', somiibo.getSetting('mySelect'));
  somiibo.log('All settings:', settings);

  somiibo.stop();
}

module.exports = main;
