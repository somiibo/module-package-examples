let settings;
async function main(mod) {
  settings = mod;

  // listen for the submit event and handle interval
  settings.on('submit', function (data) {

    // check if the search query is two or more words
    if (data.searchQuery.split(' ').length < 2) {

      // if it's not 2+ words, we can return an error like this so the user is notified
      return {
        error: new Error('This field must be 2 or more words.'),
        input: 'searchQuery'
      }

    }

  })

}

module.exports = main;
