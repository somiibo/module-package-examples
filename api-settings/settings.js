async function main(settings) {

  // We can listen for the 'change' event
  // 'change' fires whenever an input field changes
  settings.on('change', function (name, value, target) {
    // We can test this by updating a <p> element with id 'my-visualizer' with the name and value.
    document.getElementById('my-visualizer').innerText = `'change' fired: ${name} = ${value}`;
  })

  // We can listen for the 'submit'
  settings.on('submit', function (data) {
    if (data.myText !== 'Hello') {
      // We can return a custom Error object like so to prevent the settings from being saved
      // The input will automatically be highlighted for the user
      return {
        error: new Error('Please make this field exactly match: "Hello"'),
        input: 'myText'
      }
    }
  })
}

module.exports = main;
