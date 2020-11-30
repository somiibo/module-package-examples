
<div align="center">
  <a href="https://somiibo.com">
    <img src="https://cdn.itwcreativeworks.com/assets/somiibo/images/app/somiibo-appicon-320x320.png?cb=1584692584">
  </a>
  <br>
  <br>

<!-- ![GitHub package.json version](https://img.shields.io/github/package-json/v/somiibo/module-package-examples.svg) -->

<!-- ![David](https://img.shields.io/david/somiibo/module-package-examples.svg) -->
<!-- ![David](https://img.shields.io/david/dev/somiibo/module-package-examples.svg)  -->
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/somiibo/module-package-examples.svg)
<!-- ![npm bundle size](https://img.shields.io/bundlephobia/min/module-package-examples.svg) -->
<!-- ![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/somiibo/module-package-examples.svg) -->
<!-- ![npm](https://img.shields.io/npm/dm/module-package-examples.svg) -->
<!-- ![node](https://img.shields.io/node/v/module-package-examples.svg) -->
![Website](https://img.shields.io/website/https/somiibo.com.svg)
![GitHub](https://img.shields.io/github/license/somiibo/module-package-examples.svg)
![GitHub contributors](https://img.shields.io/github/contributors/somiibo/module-package-examples.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/somiibo/module-package-examples.svg)

# Somiibo
**Somiibo** is a free platform to develop web automation scripts. The Somiibo API makes it extremely easy and efficient to write bots to automate any website and help complete repetitive tasks. The API automatically includes algorithms that emulate human-like behavior such as mouse movements and keyboard strokes.

To get started, you simply need to download the free host software at [https://somiibo.com/download](https://somiibo.com/download).

Happy automating!

[Site](https://somiibo.com) | [GitHub Repo](https://github.com/somiibo/module-package-examples)

</div>

# Module Package Examples for Somiibo
A collection of modules that serve as examples for the Somiibo API.

## Using Any Module Package in Somiibo
When you import a custom package into Somiibo, you can supply a local path or a URL.
- Local example: `/Users/you/Desktop/Somiibo/module-package-examples/main.json`
- Remote example: [https://somiibo.github.io/module-package-examples/main.json](https://somiibo.github.io/module-package-examples/main.json)

If you supply a local path, the package will be loaded directly from your computer while, conversely, if you supply a URL Somiibo will attempt to load the package from your remote server.

1. Open the settings page in Somiibo by navigating to <a href="https://app.somiibo.com?page=somiibo://settings" target="\_blank">somiibo://settings</a> or pressing <kbd>cmd</kbd>+<kbd>,</kbd> or <kbd>ctrl</kbd>+<kbd>,</kbd>.
<!-- 1. Open the settings page in Somiibo by navigating to [somiibo://settings](https://app.somiibo.com?page=somiibo://settings){:target="\_blank"} or pressing <kbd>cmd</kbd>+<kbd>,</kbd> or <kbd>ctrl</kbd>+<kbd>,</kbd>. -->
2. Select the **Module packages** tab.
3. Click the plus button **(+)**.
4. Enter the local file path or the remote URL that points to your package's `main.json`.
5. Select **Add package** and you're done!

You should now see your custom package added to the list of packages.


## File Structure
```
root/
  ├── <module-name>/
  │   ├── module.js
  │   ├── settings.html
  │   ├── settings.js
  │   ├── settings.json
  ├── ...
  ├── main.json
```

### main.json
This file contains meta data for the package as a whole, as well as the meta data for the individual modules contained in the package.

#### Fields
- **id**: A uuid that uniquely identifies the package. You can generate one here: [https://www.uuidgenerator.net/](https://www.uuidgenerator.net/).
- **title**: The title that is displayed on the module selection screen for this package.
- **description**: The description of the package. Markdown syntax for `**bold**` and `*italic*` is supported!
- **author**: Your name.
- **repository**: The repository git link. For example: [https://github.com/somiibo/module-package-examples.git](https://github.com/somiibo/module-package-examples.git).
- **modules**: An array of meta data pertaining to each module in the package.
  - **id**: A uuid that uniquely identifies the module. You can generate one here: [https://www.uuidgenerator.net/](https://www.uuidgenerator.net/).
  - **name**: The inner name of the module. Must match the file name in the root folder for this module.
  - **title**: The title of the module displayed to the user.
  - **description**: The description of the module displayed to the user.
  - **icon**: The icon displayed to the user. You can use any free solid FontAwesome icon: [https://fontawesome.com/icons?d=gallery&s=solid&m=free](https://fontawesome.com/icons?d=gallery&s=solid&m=free)
  - **version**: The version of the module. You should update this when you make a change to your module so users are always using your latest version.
  - **versionRequired**: The minimum version of Somiibo required to use your package.
  - **status**: The status of the module. Can be:
    - `online`: the module is available to users.
    - `development`: the module is not available to users and listed as under maintenance.
    - `offline`: the module is not available to users and listed as offline.
  - **url**: The starting page of the module.
  - **width**: The width of the module browser window.
  - **height**: The height of the module browser window.
  - **userAgent**: A custom user agent for the module browser window.


### Module Folder
For each module in your package you need to have a folder for the assets that pertain to that module.

#### Files
- **module.js**: The logic of the module itself. This script will be executed in a Node.js environment.
- **settings.html**: The interface for the settings page. This interface will be displayed in an HTML environment. Scripts are not allowed in this file.
- **settings.js**: The logic of the settings interface. This script will be executed in a Node.js environment.
- **settings.json**: The meta data for the settings fields including defaults, min, max, etc...

## Somiibo module.js API
The `module.js` script is the actual logic behind a module. It exists in a separate context from the module webpage.

While on the module page within Somiibo, you can press <kbd>cmd</kbd>+<kbd>option</kbd>+<kbd>i</kbd> or <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>i</kbd> to open the DevTools which includes a console.

From within the `module.js` script you can `require` any core Node.js module as well as any of the supported 3rd party modules.

### Skeleton script
As basic `module.js` looks something like this:
```js
let somiibo:
async function main(mod) {
  somiibo = mod;
  somiibo.loop(main);
}
module.exports = main;
```
The `Somiibo` library is the first argument passed to the exported function, so as seen here, `mod` can be stored to a variable `somiibo` in the global scope so that it can be accessed throughout the rest of the module's lifecycle.

#### Flow
##### somiibo.initialize(fn)
- `fn` <[function]\([Object]\)> A [function] to execute
  - `defaults` <[Object]> A mutable object representing the defaults for every method
- returns: <`null`>

This method runs only once and, as such, it is an easy way to implement any configuration or setup that does not need to be executed multiple times. Any subsequent calls to `.initialize()` will be ignored. `defaults` for each method can be overwritten here via `defaults[library][method][name] = 'new'`.

Examples:
```js
somiibo.initialize((defaults) => {
  somiibo.log('Hello, World! I only run once.');
});
```
```js
somiibo.initialize((defaults) => {
  // Overwrite some defaults
  defaults.loop.delay = 5000;
  defaults.browser.scroll.offsetY = 150;
});
```

##### somiibo.loop(fn, delay)
- `fn` <[function]> A [function] to execute
- `delay` <?[number]> Number of milliseconds to wait before the script loops
- returns: <`null`>

`.loop()` drives the repeating nature of modules by executing the `fn` passed to it, effectively starting the module from the top again.

Examples:
```js
let somiibo:
async function main(mod) {
  somiibo = mod;
  somiibo.loop(main);
}
module.exports = main;
```

##### somiibo.stop()
- returns: <`null`>

Stop module execution. Calling this is the same as if the user pressed the 'stop' button on the module manager page.

Examples:
```js
let somiibo:
async function main(mod) {
  somiibo = mod;
  somiibo.stop();
}
module.exports = main;
```

##### somiibo.error(reason)
- `reason` <[Error]>
- returns: <[Error]>

Stop module execution and displays an error message with `reason`.

Examples:
```js
let somiibo:
async function main(mod) {
  somiibo = mod;
  somiibo.error(new Error('Oops!'));
}
module.exports = main;
```

##### somiibo.wait(minTime, maxTime)
- `minTime` <[number]> Time in milliseconds to wait
- `maxTime` <?[number]> Optional time to randomize the wait.
- returns: <[Promise]<[number]>> The promise resolves when the wait is over with the amount of milliseconds waited.

This method pauses execution of the script for the amount of `minTime` specified in milliseconds. If `maxTime` is also supplied, a random duration between the two is waited.

Examples:
```js
await somiibo.wait(5000); // Waits 5 seconds
```
```js
await somiibo.wait(5000, 10000); // Waits between 5 and 10 seconds
```

#### Settings
##### somiibo.getSetting(path, def)
- `path` <[string]> Path to the settings key to retrieve
- returns: <`any`>

Get the user's settings for this module. If `path` is not supplied, the entire settings object will be returned.

Examples:
```js
// Gets one settings
somiibo.log(somiibo.getSetting('mySettingName'));
```
```js
// Gets all settings as an object
somiibo.log(somiibo.getSetting());
```

#### Development and debugging
##### somiibo.log([, ...args])
- `...args` <...[Serializable]> Arguments to pass to the console
- returns: <`null`>

Executes `console.log` in the module's DevTools console.

Examples:
```js
somiibo.log('Hello, World!');
```
##### somiibo.openDevTools()
- returns: <`null`>

Opens the module's dev tools.

Examples:
```js
somiibo.openDevTools();
```

#### Workers
##### somiibo.worker(fn, options)
- `fn` <[function]> Function to be passed to the worker process
- `options` <[Object]>
  - `arguments` <?[Array]> Arguments to be passed to the worker script
  - `url` <?[string]> The URL to open the worker to
  - `referrer` <?[string]> An HTTP Referrer URL
  - `userAgent` <?[string]> A user agent originating the request
  - `proxy` <?[string]> A proxy that the worker should connect to  -
  - `timeout` <?[number]> A maximum number of milliseconds before the worker is automatically closed.
  - `width` <?[number]> The width of the worker window
  - `height` <?[number]> The height of the worker window

- returns: <[Promise]<[Object]>> - This method resolves when the worker launches successfully. The resolve will always happen before the worker times out.

This method launches a worker process--an isolated subpage--within the module webpage. Workers are useful for bulk tasks.

Note: Currently, launching a worker requires a page navigation to a custom inner page prior to execution. This process happens automatically. For workers to be enabled on a module, the `main.json` module properties must contain `webview: true`.

Examples:
```js
await somiibo.worker(async function (one, two, three) {
  let _ = require('lodash');
  console.log('Args', one, two, three);
  console.log('lodash', _.get(three, 'key'));
  console.log(window.location.href);
}, {
  arguments: ['one', 23 * 3, {key: 3}],
  url: 'https://app.somiibo.com/tools/diagnostic/',
  proxy: '209.97.189.171:8080',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  referrer: 'https://google.com',
  timeout: 60000,
});
```

#### Miscellaneous methods
##### somiibo.alert(options)
- `options` <[Object]>
  - `type` <?[string]> Type of the alert
  - `title` <?[string]> Title of the alert
  - `content` <?[string]> HTML enabled content of the alert
  - `button` <?[string]> Text on the alert's button
- returns: <`null`>

Display an alert message to the user.

Examples:
```js
somiibo.alert({
  type: 'success', // 'success', 'warning', 'danger', 'info',
  title: 'Hello, World!',
  content: '<h1>Greetings</h1> <br> This is my message.',
  button: 'Goodbye'
});
```

#### Events
##### event: 'error'
- `event` <[Event]>
- `error` <[Error]>
- `meta` <[Object]> Includes information about the error
  - `navigation` <[boolean]> Whether or not the error was due to navigation

Emitted when the module.js script encounters a fatal error. The default behavior is to stop the module and display an error to the user but this can be prevented with `event.preventDefault()`. Usually (but not always), navigation errors can be recovered from and calling `event.preventDefault()` is advised.

Examples:
```js
somiibo.on('error', (event, error, meta) => {
  somiibo.log('Oops! There was an error', error, meta);

  // If it was a navigation error, we can probably continue safely
  if (meta.navigation) {
    // Calling event.preventDefault() will prevent the module from stopping
    event.preventDefault();
  }
});
```

##### event: 'new-worker'
- `event` <[Event]>
- `payload` <[Object]> Includes information on the success or failure to setup the worker

Emitted when a worker completes its setup phase.

Examples:
```js
somiibo.on('new-worker', (event, payload) => {
  somiibo.log('A worker has been set up!', payload);
});
```

### somiibo.browser() methods
This API is responsible for navigating and interacting with the single browser window that each module gets.

#### Navigation
##### somiibo.browser().navigate(url, options)
- `url` <[string]> A URL to navigate to
- `options` <?[Object]>
  - `referrer` <?[string]> An HTTP Referrer URL
  - `userAgent` <?[string]> A user agent originating the request
- returns: <[Promise]<`null`>> The promise resolves when the page finishes loading

Navigates the module webpage.

Examples:
```js
await somiibo.browser().navigate('https://google.com');
```
```js
await somiibo.browser().navigate('https://google.com', {
  referrer: 'https://reddit.com',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
});
```

##### somiibo.browser().navigateBack(offset)
- `offset` <[number]> An offset to navigate backwards
- returns: <[Promise]> - the promise resolves when the page finishes loading

Navigates the module webpage backwards as if the user pressed the back button. `offset` is the number of pages in the history to go back and defaults to `1`.

Note: If the `offset` doesn't exist, no navigation will occur.

Examples:
```js
await somiibo.browser().navigateBack();
```

##### somiibo.browser().navigateForward(offset)
- `offset` <[number]> An offset to navigate backwards
- returns: <[Promise]> - the promise resolves when the page finishes loading

Navigates the module webpage forwards as if the user pressed the forward button. `offset` is the number of pages in the history to go forward and defaults to `1`.

Note: If the `offset` doesn't exist, no navigation will occur.

Examples:
```js
await somiibo.browser().navigateForward();
```

##### somiibo.browser().reload()
- returns: <[Promise]> - the promise resolves when the page finishes reloading

Reloads the current webpage without affecting the history index.

Examples:
```js
await somiibo.browser().reload();
```

##### somiibo.browser().getURL()
- returns: <[string]>

Returns the webpages current URL.

Examples:
```js
somiibo.log(somiibo.browser().getURL());
```


#### Selecting and performing actions on a webpage
##### somiibo.browser().select(selector, options)
- `selector` <[string]> A [selector] to query page for
- `options` <[Object]>
  - `index` <?[number], [string]> Index of the element array to return
  - `filters` <?[Array]<[Object]>> An array of filter objects that narrow down the returned array
  - `retrieve` <?[Array]<[string]>> An array of attributes or element properties to include in the returned array
  - `wait` <?[number]> A maximum number of milliseconds to wait as the selector is periodically polled
- returns: <[Promise]<[Object]>> This method resolves when the element is found or determined to not exist and returns a jQuery-like representation of the selected elements.

This method runs `document.querySelectorAll` within the page and stores the result in `somiibo.browser().properties.select`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()` and subsequent calls to `.select()` are *not necessary* for each of these methods since the currently selected element is stored until overwritten by another call of `.select()`.

Note: Since the module webpage runs in a separate process, it is not possible to access the [ElementHandle] directly from `somiibo.browser().properties.select`. Instead, `somiibo.browser().properties.select` will contain a jQuery-like representation of the result.

Examples:
```js
const elements1 = await somiibo.browser().select('a');
```
```js
const elements2 = await somiibo.browser().select('a', {
  filters: [
    { splice: [0, 10] },
    { match: { innerText: /my text/i } },
    { match: { innerHTML: /<span>hello<\/span>/i } },
  ],
  index: 3, // can also supply '$random'
  retrieve: ['href'],
  wait: 30000,
});
```
```js
const elements3 = await somiibo.browser().select('a') // select the element
  .then(() => somiibo.browser().scroll(undefined, {offsetY: 100})) // scroll to it
  .then(() => somiibo.browser().click()); // then click it
```

##### somiibo.browser().scroll(position, options)
- `position` <?[string], [Object]> Position or element on page to scroll to
- `options` <[Object]>
  - `offsetX` <?[number]> Offset scroll amount on x axis
  - `offsetY` <?[number]> Offset scroll amount on y axis
- returns: <[Promise]<[Object]>> This method resolves when the in-page scroll completes or when page navigation completes (if the scroll triggers a navigation) and returns the result of the scroll.

This method scrolls the page based on the current position of the mouse and stores the result in `somiibo.browser().properties.scroll`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()`.

If `position` is `undefined` or `somiibo.browser().$selected`, the method will try to scroll to the currently selected element.

`offsetX` and `offsetY` are absolutely necessary if there are fixed navs or footers on the page or else the element being scrolled to might get stuck under the nav/footer.

Examples:
```js
await somiibo.browser().scroll({x: 100, y: 100}, {offsetX: 50, offsetY: -50});
```
```js
await somiibo.browser().select('a')
  .then(() => somiibo.scroll(somiibo.browser().$selected, {offsetY: 100}));
```
```js
await somiibo.browser().scroll(somiibo.browser().$selected, {offsetX: 50, offsetY: -50});
```

##### somiibo.browser().move(position, options)
- `position` <?[string], [Object]> Position or element on page to move the mouse to
- `options` <[Object]>
  - `offsetX` <?[number]> Offset scroll amount on x axis
  - `offsetY` <?[number]> Offset scroll amount on y axis
  - `ignoreScrollOffset` <?[boolean]> Whether to ignore `window.scrollX` & `window.scrollY` when calculating path. This should usually be `true` if the target element exists on an overlay or popup.
- returns: <[Promise]<[Object]>> This method resolves when the in-page mouse movement is complete or when page navigation completes (if the mouse movement triggers a navigation) and returns the result of the mouse movement.

This method moves the mouse to a position or element and stores the result in `somiibo.browser().properties.mouse`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()`.

Examples:
```js
await somiibo.browser().move({x: 100, y: 100}, {offsetX: 50, offsetY: -50});
```
```js
await somiibo.browser().select('a')
  .then(() => somiibo.browser().move(somiibo.browser().$selected, {offsetY: 100}));
```
```js
await somiibo.browser().move(somiibo.browser().$selected, {offsetX: 50, offsetY: -50});
```

##### somiibo.browser().click(position, options)
- `position` <?[string], [Object]> Position or element on page to move the mouse to
- `options` <[Object]>
  - `offsetX` <?[number]> Offset click amount on x axis
  - `offsetY` <?[number]> Offset click amount on y axis
  - `move` <?[boolean]> Whether to move the mouse to the position before the click event is fired
  - `ignoreScrollOffset` <?[boolean]> Whether to ignore `window.scrollX` & `window.scrollY` when calculating path. This should usually be `true` if the target element exists on an overlay or popup.
- returns: <[Promise]<[Object]>> This method resolves when the in-page mouse click is complete or when page navigation completes (if the click triggers a navigation) and returns the result of the mouse click.

This method moves the mouse to a position or element and stores the result in `somiibo.browser().properties.mouse`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()`.

If `position` is `undefined` or `$selected`, the method will try to click on the currently selected element.

Examples:
```js
await somiibo.browser().click({x: 100, y: 100});
```
```js
await somiibo.browser().select('a')
  .then(() => somiibo.browser().click());
```
```js
await somiibo.browser().click(somiibo.browser().$selected);
```

##### somiibo.browser().type(input, options)
- `input` <[Array]<[string]>> An array of strings to type
- `options` <[Object]>
  - `delayMin` <?[number]> Minimum delay between keystrokes
  - `delayMax` <?[number]> Maximum delay between keystrokes
- returns: <[Promise]<[Object]>> This method resolves when the in-page typed string is complete or when page navigation completes (if the typed string triggers a navigation) and returns the result of the keyboad type.

This method runs `document.querySelectorAll` within the page and stores the result in `somiibo.browser().properties.type`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()`.

Special keys such as `Enter` must be **in their own array element**:
```js
['Space', 'Tab', 'Backspace', 'Delete', 'Up', 'Down', 'Left', 'Right', 'Escape', 'Enter']
```

Examples:
```js
await somiibo.browser().type(['Hello, World!']);
```
```js
await somiibo.browser().type(['Hello, World!', 'Enter']);
```
```js
await somiibo.browser().type(['Hello, World!'], {delayMin: 90, delayMax: 140});
```

##### somiibo.browser().getVariable(path, compare, options)
- `path` <[string]> Path to the variable
- `compare` <?[function]> Function to compare the result of the variable
- `options` <[Object]>
  - `wait` <?[number]> A maximum number of milliseconds to wait for as the variable is periodically polled.
- returns: <[Promise]<`any`>> This method resolves when the variable is retrieved and either matches the compare function or times out.

Get and return a variable from within the webpage. Only global scoped variables are acessible. The variable polling will continue until the `compare` function returns `true` or a maximum amount of `wait` time elapses.

Examples:
```js
await somiibo.browser().getVariable('myVariable');
```
```js
await somiibo.browser().getVariable('my.variable.is.nested');
```
```js
// Continue polling for myVariable for a maximum of 10 seconds
await somiibo.browser().getVariable('myVariable', function (value) {
  return typeof value !== 'undefined';
}, {wait: 10000})
```

##### somiibo.browser().execute(fn, options)
- `fn` <[function]> Function as a string to execute within the module webpage
- `options` <?[Object]>
  - `arguments` <?[Array]> Arguments to be passed to the script
  <!-- - `trusted` <?[boolean]> Whether the code should be executed as a user gesture -->
- returns: <[Promise]<[Object]>> A promise that resolves with an object with keys
  - `success` <[boolean]> `true` if the script executed successfully or `false`
  - `result` <`any`> result returned from the `fn` or an [Error] message

This method executes a function in the context of the module webpage

Examples:
```js
await somiibo.browser().execute(async function (one, two, three) {
  console.log('This is execute inside the page so it has access to the window and document', window, document);
  console.log('Arguments', one, two, three);
  await fetch('https://httpbin.org/delay/5');
  return 'Waited 5 seconds';
}, {
  arguments: [1, 1 + 1, 'three']
})
.then((result) => {
  somiibo.log(result); // Should log: {success: true, result: 'Waited 5 seconds'}
})
```

##### somiibo.browser().solveCaptcha(options)
- `options` <?[Object]>
  - `auto` <?[boolean]> Whether the captcha should be automatically detected and solved. Defaults to `true`
  - `mode` <?[string]> The type of captcha to solve (currently `reCaptchaV2` & `hCaptcha` are supported)
  - `service` <?[string]> The service to use (currently `2Captcha` & `antiCaptcha` are supported)
  - `sitekey` <?[string]> The sitekey of the site with the captcha
- returns: <[Promise]<[Object]>> A promise that is rejected with an [Error] if the captcha fails or resolves with an object with keys:
  - `result` <[string>] The result of the captcha solve

This method can detect and solve a captcha on the module webpage. When `auto` is `true`, the API will attempt to determine `mode` & `sitekey` automatically but it is better to supply them if the captcha mode is known. `service` will automatically be set to whatever the **user** has chosen in their preferences but it can be overrriden by setting it manually.

Examples:
```js
await somiibo.browser().solveCaptcha({
  auto: true,
  mode: 'hCaptcha',
  service: '2Captcha',
})
.then(async (response) => {
  somiibo.log('Solved captcha', response.result); // The token or the response
  await somiibo.browser().select('the form submit button')
    .then(() => somiibo.browser().click())
})
.catch(async (e) => {
  somiibo.log('Error solving captcha', e)
  if (e.code === 'INVALID_KEY' || e.code === 'INVALID_SERVICE' || e.toString().includes('ERROR_KEY_DOES_NOT_EXIST')) {
    somiibo.alert({ code: '$captcha-api-key', input: '', });
    somiibo.stop();
  }
});
```


#### Browser Events
##### event: 'new-window'
- `event` <[Event]>
- `window` <[Class]>
  - `.setVisibility(state, options)`
    - `state` <[string]> Visibility state of the window which can be `hide` or `show`
    - `options` <?[Object]> Options for the visibility function
      - `inactive` <?[boolean]> Activity state of the window which can be `true` or `false` where `true` will **not** focus the window
  - `.setAudioMuted(state)`
    - `state` <[boolean]> Audibility state of the window which can be `true` or `false`
  - `.setFocusable(state)`
    - `state` <[boolean]> Controls the user's ability to focus the window which can be `true` or `false`
  - `.setAlwaysOnTop(state)`
    - `state` <[boolean]> Controls the windows position on top of other windows which can be `true` or `false`
  - `.navigate(url)`
    - `url` <[string]> URL to navigate to
    - Note: This operation is `asynchronous` and must be `await`ed
  - `.getURL()` Return the current URL of the window
  - `.openDevTools()` Open the DevTools of the window
  - `.setScript(script, options)`
    - `script` <[function]> Script that will be executed on every navigation of the window
    - `options` <[Object]> Options for the script
      - `arguments` <[Array]> An array of arguments that are passed to the `script`
    - Note: The script has full access to the DOM and window since it is executed directly on the page.
  - `.close()` Close the window

Emitted when the module browser window receives a request to open a new window. The default behavior is to open the new window but the window will be hidden, unfocused, and muted.

Examples:
```js
somiibo.browser().on('new-window', async (event, window) => {
  // At this point, the window is open but hidden, unfocused, and muted

  // We can navigate the window if we want
  await window.navigate('https://google.com');

  // We can show the window
  window.setVisibility(true, {inactive: true});

  // We can unmute the window
  window.setAudioMuted(false);

  // We can open the DevTools
  window.openDevTools(false);

  // Finally, we can close the window after 10 seconds
  somiibo.setTimeout(function () {
    window.close();
  }, 10000)
});
```
If you do not expect your module to open windows, you should listen for this event and call `window.close()` immediately.


### .device() methods
##### somiibo.device().getOS()
- returns: <[Object]>

Returns the current user's operating system data as an object.

Examples:
```js
somiibo.log(somiibo.device().getOS());
```
```js
// Example output for Windows
{
  platform: 'win32',
  name: 'windows',
  version: '10.0.17763',
}

// Example output for Mac
{
  platform: 'darwin',
  name: 'mac',
  version: '10.15.4',
}

// Example output for Linux
{
  platform: 'linux',
  name: 'linux',
  version: '10.15.4',
}
```

### .tabs() methods
##### somiibo.tabs().query(fn)
- `fn` <?[function]> Function that is called on tab object with `tab` and `index`
  - Returns
  - `tab` <?[Object]> An **read-only** object representing the tab
    - `id` <?[number]> The ID of the tab
    - `active` <?[boolean]> Boolean representing if the tab has focus
    - `url` <?[string]> The url of the tab
    - `type` <?[string]> Type of the tabs (`module` or `browser`)
    - `module` <?[Object]> Object representing the module if type is `module`
      - `moduleId` <?[string]> The ID of the module from the module's package
      - `packageId` <?[string]> The ID of the package
      - `properties` <?[Object]> An object of module properties
      - `running` <?[Boolean]> The run state of the module
      - `settings` <?[Object]> Object representing the module's settings
      - `webContentsId` <?[number]> The webContents ID
    - `session` <?[string]> The Session ID of the tab
    - `partition` <?[string]> The Session partition of the tab
    - `userAgent` <?[string]> The userAgent string of the tab
  - `index` <?[number]> The index of the loop
- returns: <[Array]> of tabs matching the query filter

Iterates through all opened tabs returns an array of tabs matching the filter `fn`. Return `true` inside the `fn` to include the tab in the result.

Examples:
```js
const allTabs = somiibo.tabs().query((tab, index) => true)

const someTabs = somiibo.tabs().query((tab, index) => {
  return tab.url.includes('https://google.com');
})

const runningModules = somiibo.tabs().query((tab, index) => {
  return tab.type === 'module' && tab.module.running;
})
```

##### somiibo.tabs().add(options)
- `options` <?[Object]> Options for the new tab
  - `url` <?[string]> The URL of the new tab
  - `session` <?[string]> The Session ID of the new tab
- returns: <[Promise]<[Object]>> The promise resolves when the tab is opened and passes the new tab object.

Opens a new tab with the `options`. In the future, this method will be able to open tabs with the `module` type. You can get the `session` ID of a Session from [somiibo://settings](https://app.somiibo.com/?url=somiibo://settings) in the Sessions panel.

Examples:
```js
await somiibo.tabs().add({
  url: 'https://somiibo.com',
  session: 'default',
})
.then(tab => {
  somiibo.log('New tab opened', tab);
})
```

##### somiibo.tabs().close(id)
- `id` <?[Number]> ID of the tab to close
- returns: <[Promise]<[null]>> The promise resolves when the tab is closed.

Closes a tab with the `id`.

Examples:
```js
await somiibo.tabs().close(69);
```

##### somiibo.tabs().navigate(id, url, options)
- `id` <[number]> The id of the tab to navigate
- `url` <[string]> A URL to navigate to
- `options` <?[Object]>
  - `referrer` <?[string]> An HTTP Referrer URL
  - `userAgent` <?[string]> A user agent originating the request
- returns: <[Promise]<`null`>> The promise resolves when the page finishes loading

Navigates the tab webpage.

Examples:
```js
await somiibo.tabs().navigate('https://google.com');
```
```js
await somiibo.tabs().navigate('https://google.com', {
  referrer: 'https://reddit.com',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
});
```

##### somiibo.tabs().start(id)
- `id` <[number]> The id of the tab to start
- returns: <[Promise]<`null`>> The promise resolves when the module finishes starting

Starts the tab's module. At the moment, you can only use this method to start a manually opened module.

Examples:
```js
await somiibo.tabs().start(69);
```

##### somiibo.tabs().stop(id)
- `id` <[number]> The id of the tab to stop
- returns: <[Promise]<`null`>> The promise resolves when the module finishes stopping

Stops the tab's module. At the moment, you can only use this method to stop a manually opened module.

Examples:
```js
await somiibo.tabs().stop(69);
```

## Somiibo settings.html API
The `settings.html` API works in conjunction with `settings.js` and `settings.json` to deliver a customizable experience to the user.

The `settings.html` file **must not** contain `html`, `head`, or `body` tags, as it will be inserted into an existing DOM. It also cannot contain any `script` tags, as that is what the `settings.js` is for.

The `settings.html` file will automatically be styled by our custom implementation of [Bootstrap] so the use of Bootstrap classes is highly encouraged.

### Skeleton file
As basic `settings.html` file looks something like this:
```html
<settings>
  <form>
    <!-- Put your form fields here -->
    <button type="submit" class="btn btn-lg btn-block btn-primary">Save settings</button>
  </form>
</settings>
```

## Somiibo settings.js API
The `settings.js` API works in conjunction with `settings.html` and `settings.json` to deliver a customizable experience to the user.

From within the `settings.js` script you can `require` any core Node.js module as well as any of the supported 3rd party modules.

### Skeleton script
As basic `settings.js` module looks something like this:
```js
async function main(settings) {

}
module.exports = main;
```
The `Settings` library is the first argument passed to the exported function, so as seen here, `settings` is used to access the API.

#### Events
##### event: 'change'
- `event` <[Event]>
- `name` <[string]> The name of the field
- `value` <[any]> The value of the field
- `target` <[ElementHandle]> The element that the edit occurred on

Emitted when any field in the `settings.html` page is edited by the user.

Examples:
```js
async function main(settings) {
  settings.on('change', function (name, value, target) {
    console.log('change event:', name, value, target);
  })
}
module.exports = main;
```

##### event: 'submit'
- `event` <[Event]>
- `data` <[Object]> The user's settings serialized into a JSON object

Emitted when the settings are saved by the user. Any changes made to the `data` object will overwrite the user's settings.

Examples:
```js
async function main(settings) {
  settings.on('submit', function (data) {
    // Here it is possible to modify the data before it is saved
    data.mySetting = 'new value';
    console.log('submit event:', data);
  })
}
module.exports = main;
```

The default behavior of the `submit` event is to continue with the save but you can prevent this by returning a custom object like so:

```js
async function main(settings) {
  settings.on('submit', function (data) {
    return {
      error: new Error('This field has an error!'),
      input: 'fieldName' // Supplying the name of a setting will automatically highlight it for the user
    }
  })
}
module.exports = main;
```

## Somiibo settings.json API
The `settings.json` API works in conjunction with `settings.html` and `settings.js` to deliver a customizable experience to the user.

The `settings.json` file can be in [JSON] format as well as [JSON5]. JSON5 is a newer implementation of JSON that allows comments, and trailing commas, among a few other things.

### Skeleton file
As basic `settings.json` module looks something like this:
```json
{
  "fields": [

  ]
}
```
Only the settings that are included in this file are passed to the `module.js` script.

##### Settings.json Fields
- `name` <[string]> The name of the settings field
- `default` <?[any]> The default value of the field
- `required` <?[boolean]> Determines if the field is required
- `type` <?[string]> Specify the type of the setting (`string`, `number`, `boolean`)
- `min` <?[number]> Minimum value for a [number] field or the minimum length of a [string] field
- `max` <?[number]> Maximum value for a [number] field or the maximum length of a [string] field

The only required field is `name`. Although `type` is not required, it is useful to set as it will automatically convert the user's settings to match the type. For example, if the type is `number` but a `string` is provided, the string will be converted to a number prior to being saved.

Examples:
```js
{
  "fields": [
    {
      "name": "myNumber",
      "required": true,
      "default": 1,
      "min": 1,
      "max": 10
    },
    {
      "name": "myText",
      "required": true
    },
    {
      "name": "myTextArea",
      "required": true
    },
    {
      "name": "myCheck"
    },
    {
      "name": "mySelect",
      "required": true,
      "type": "number"
    }
  ]
}
```

## Publishing Your Package for Free
1. Commit/upload your package as a [repository](https://help.github.com/en/github/getting-started-with-github/create-a-repo) on GitHub.
2. Open the repository settings by selecting the **gear** icon on the right.
3. Scroll down until you see the **GitHub Pages** section. Change the first dropdown to **master branch** to enable hosting.

Great! Now your module package is hosted for free on GitHub pages!

Your remote URL will be something like `https://<username>.github.io/<repo>/main.json`.

For example, this package is hosted on GitHub pages at this address: [https://somiibo.github.io/module-package-examples/main.json](https://somiibo.github.io/module-package-examples/main.json).

You can put this URL directly into the package manager inside Somiibo!

## Tips and Tricks
Building any sort of automation process can be rewarding but also frustrating. Remember, computers are dumb and they only become smart when **you** make them smart. That being said, here's a few things to remember:
* **Don't rely on something happening the same way every time**. Sometimes things don't load fast enough, sometimes there are network dropouts, and sometimes things just randomly don't work right.
* **Build recursive checks into your modules**. Similar to the above, sometimes things aren't always what they seem and you need to check a few different angles before making a conclusion.
* **Good modules take a long time to build**. If you're fast, you might be able to hammer out a module in a day or two. But to get it working flawlessly for long periods of time you can expect development to take *weeks* or even *months* to get right. Don't get discouraged!
* **Our development channel on Discord is a lifesaver**. If all else fails, you can [join our Discord server](https://somiibo.com/discord) and find the channel called **#development**. Developers like you ask and answer questions all the time here!

[Bootstrap]: https://getbootstrap.com/ "Bootstrap 4"
[JSON]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON "JSON"
[JSON5]: https://json5.org/ "JSON5"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[Event]: https://nodejs.org/api/events.html "Event"
[Class]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes "Class"
[Error]: https://nodejs.org/api/errors.html "Error"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[ElementHandle]: #class-elementhandle "ElementHandle"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
