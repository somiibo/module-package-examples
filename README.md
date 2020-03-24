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
**Somiibo** is a free platform to develop web automation scripts.

[Site](https://somiibo.com) | [NPM Module](https://www.npmjs.com/package/somiibo) | [GitHub Repo](https://github.com/somiibo/module-package-examples)

</div>

# Module Package Examples for Somiibo
A collection of modules that serve as examples for the Somiibo API.

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
- **description**: The description of the package.
- **author**: Your name.
- **repository**: The repository git link. For example: [https://github.com/somiibo/module-package-examples.git](https://github.com/somiibo/module-package-examples.git).
- **modules**: An array of meta data pertaining to each module in the package.

#### Module Fields
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

While on the module page within Somiibo, you can press <kbd>cmd</kbd>+<kbd>options</kbd>+<kbd>i</kbd> or <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>i</kbd> to open the developer tools.

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

### Flow
#### somiibo.initialize(fn)
- `fn` <[function]\([Object]\)> A [function] to execute
  - `defaults` <[Object]> A mutable object representing the defaults for every method

- returns: <`null`>

This method runs only once and, as such, it is an easy way to implement any configuration or setup that does not need to be executed multiple times. Any subsequent calls to `.initialize()` will be ignored. `defaults` for each method can be overwritten here via `defaults[method][name] = 'new'`.

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
  defaults.scroll.offsetY = 150;
});
```

#### somiibo.loop(fn, delay)
- `fn` <[function]> A [function] to execute
- `delay` <?[number]> Number of milliseconds between calls

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

#### somiibo.stop()
- returns: <`null`>

Stop module executing

Examples:
```js
let somiibo:
async function main(mod) {
  somiibo = mod;
  somiibo.stop();
}
module.exports = main;
```

#### somiibo.wait(time, timeMax)
- `time` <[number]> Time in milliseconds to wait
- `timeMax` <?[number]> Optional time to randomize the wait.
- returns: <[Promise]<[number]>> - The promise resolves when the wait is over with the amount of milliseconds waited.

This method pauses execution of the script.

Examples:
```js
await somiibo.wait(5000); // Waits 5 seconds
```
```js
await somiibo.wait(5000, 10000); // Waits between 5 and 10 seconds
```

### Settings
#### somiibo.getSetting(path, def)
- `path` <[string]> Path to the settings key to retrieve
- returns: <`any`>

Get the user's settings for this module. If `path` is not supplied, the entire settings object will be returned.

Examples:
```js
somiibo.log(somiibo.getSetting('mySettingName'));
```
```js
somiibo.log(somiibo.getSetting());
```

### Development and debugging
#### somiibo.log([, ...args])
- `...args` <...[Serializable]> Arguments to pass to the console
- returns: <`null`>

Executes `console.log` in the module's developer console.

Examples:
```js
somiibo.log('Hello, World!');
```
#### somiibo.openDevTools()
- returns: <`null`>

Opens the module's dev tools.

Examples:
```js
somiibo.openDevTools();
```

### Navigation
#### somiibo.navigate(url, options)
- `url` <[string]> A URL to navigate to
- `options` <?[Object]>
  - `referrer` <?[string]> An HTTP Referrer URL
  - `userAgent` <?[string]> A user agent originating the request
- returns: <[Promise]<`null`>> - The promise resolves when the page finishes loading

Navigates the module webpage.

Examples:
```js
somiibo.navigate('https://google.com');
```
```js
somiibo.navigate('https://google.com', {
  referrer: 'https://reddit.com',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
});
```

#### somiibo.navigateBack()
- returns: <[Promise]> - the promise resolves when the page finishes loading

Navigates the module webpage backwards as if the user pressed the back button.

Examples:
```js
somiibo.navigateBack();
```

#### somiibo.navigateForward()
- returns: <[Promise]> - the promise resolves when the page finishes loading

Navigates the module webpage forwards as if the user pressed the forward button.

Examples:
```js
somiibo.navigateForward();
```

#### somiibo.getURL()
- returns: <[string]>

Returns the webpages current URL.

Examples:
```js
somiibo.log(somiibo.getURL());
```

### Selecting and performing actions on a webpage
#### somiibo.select(selector, options)
- `selector` <[string]> A [selector] to query page for
- `options` <[Object]>
  - `index` <?[number], [string]> Index of the element array to return
  - `filters` <?[Array]<[Object]>> An array of filter objects that narrow down the returned array
  - `retrieve` <?[Array]<[string]>> An array of attributes or element properties to include in the returned array
  - `wait` <?[number]> A maximum number of milliseconds to wait as the selector is periodically polled

- returns: <[Promise]<[Object]>> - This method resolves when the element is found or determined to not exist and returns a jQuery-like representation of the selected elements.

This method runs `document.querySelectorAll` within the page and stores the result in `somiibo.property.select`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()`.

Note: Since the module webpage runs in a separate process, it is not possible to access the [ElementHandle] directly from `somiibo.property.select`. Instead, `somiibo.property.select` will contain a jQuery-like representation of the result.

Examples:
```js
const elements1 = await somiibo.select('a');
```
```js
const elements2 = await somiibo.select('a', {
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
const elements3 = await somiibo.select('a') // select the element
  .then(() => somiibo.scroll(undefined, {offsetY: 100})) // scroll to it
  .then(() => somiibo.click()); // then click it
```

#### somiibo.scroll(position, options)
- `position` <?[string], [Object]> Position or element on page to scroll to
- `options` <[Object]>
  - `offsetX` <?[number]> Offset scroll amount on x axis
  - `offsetY` <?[number]> Offset scroll amount on y axis

- returns: <[Promise]<[Object]>> - This method resolves when the in-page scroll completes or when page navigation completes (if the scroll triggers a navigation) and returns the result of the scroll.

This method scrolls the page based on the current position of the mouse and stores the result in `somiibo.property.scroll`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()`.

If `position` is `undefined` or `$selected`, the method will try to scroll to the currently selected element.

`offsetX` and `offsetY` are absolutely necessary if there are fixed navs or footers on the page or else the element being scrolled to might get stuck under the nav/footer.

Examples:
```js
await somiibo.scroll({x: 100, y: 100}, {offsetX: 50, offsetY: -50});
```
```js
await somiibo.select('a')
  .then(() => somiibo.scroll(undefined, {offsetY: 100}));
```
```js
await somiibo.scroll('$selected', {offsetX: 50, offsetY: -50});
```

#### somiibo.move(position, options)
- `position` <?[string], [Object]> Position or element on page to move the mouse to
- `options` <[Object]>
  - `offsetX` <?[number]> Offset scroll amount on x axis
  - `offsetY` <?[number]> Offset scroll amount on y axis

- returns: <[Promise]<[Object]>> - This method resolves when the in-page mouse movement is complete or when page navigation completes (if the mouse movement triggers a navigation) and returns the result of the mouse movement.

This method moves the mouse to a position or element and stores the result in `somiibo.property.mouse`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()`.

Examples:
```js
await somiibo.move({x: 100, y: 100}, {offsetX: 50, offsetY: -50});
```
```js
await somiibo.select('a')
  .then(() => somiibo.move(undefined, {offsetY: 100}));
```
```js
await somiibo.move('$selected', {offsetX: 50, offsetY: -50});
```

#### somiibo.click(position, options)
- `position` <?[string], [Object]> Position or element on page to move the mouse to
- `options` <[Object]>
  - `offsetX` <?[number]> Offset click amount on x axis
  - `offsetY` <?[number]> Offset click amount on y axis

- returns: <[Promise]<[Object]>> - This method resolves when the in-page mouse click is complete or when page navigation completes (if the click triggers a navigation) and returns the result of the mouse click.

This method moves the mouse to a position or element and stores the result in `somiibo.property.mouse`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()`.

If `position` is `undefined` or `$selected`, the method will try to click on the currently selected element.

Examples:
```js
await somiibo.click({x: 100, y: 100});
```
```js
await somiibo.select('a')
  .then(() => somiibo.click());
```
```js
await somiibo.click('$selected');
```

#### somiibo.type(input, options)
- `input` <[Array]<[string]>> An array of strings to type
- `options` <[Object]>
  - `delayMin` <?[number]> Minimum delay between keystrokes
  - `delayMax` <?[number]> Maximum delay between keystrokes

- returns: <[Promise]<[Object]>> - This method resolves when the in-page typed string is complete or when page navigation completes (if the typed string triggers a navigation) and returns the result of the keyboad type.

This method runs `document.querySelectorAll` within the page and stores the result in `somiibo.property.type`. This method is chainable with `.scroll()`, `.click()`, `.move()`, and `.type()`.

Special keys such as `Enter` must be **in their own array element**:
```js
['Space', 'Tab', 'Backspace', 'Delete', 'Up', 'Down', 'Left', 'Right', 'Escape', 'Enter']
```

Examples:
```js
await somiibo.type(['Hello, World!']);
```
```js
await somiibo.type(['Hello, World!', 'Enter']);
```
```js
await somiibo.type(['Hello, World!'], {delayMin: 90, delayMax: 140});
```

#### somiibo.getVariable(path, compare, options)
- `path` <[string]> Path to the variable
- `compare` <?[function]> Function to compare the result of the variable
- `options` <[Object]>
  - `wait` <?[number]> A maximum number of milliseconds to wait as the variable is periodically polled

- returns: <[Promise]<`any`>> - This method resolves when the variable is retrieved an either matches the compare function or times out.

Get and return a variable from within the webpage. Only global scoped variables are acessible.

Examples:
```js
await somiibo.getVariable('myVariable');
```
```js
await somiibo.getVariable('my.variable.is.nested');
```
```js
await somiibo.getVariable('myVariable', function (value) {
  return typeof value !== 'undefined';
}, {wait: 10000})
```

#### somiibo.execute(fn, options)
- `fn` <?[string]> Function as a string to execute within the module webpage
- `options` <[Object]>
  - `trusted` <?[boolean]> Whether the code should be executed as a user gesture

- returns: <[Promise]<`any`>> - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

This method executes a function in the context of the module webpage. In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

Examples:
```js
await somiibo.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => { console.log(result) })
```

### Workers
#### somiibo.worker(fn, options)
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

- returns: <[Promise]<[Object]>> - This method resolves when the worker launches. The resolve will always happen before the worker times out.

This method launches a worker process--an isolated webpage that acts like an iframe--within the module webpage. Workers are useful for bulk tasks.

Note: Currently, launching a worker requires a page navigation to a custom inner page prior to execution. This process happens automatically. For workers to be enabled on a module, the `main.json` module properties must contain `webview: true`.

Examples:
```js
await somiibo.worker(async function (one, two, three) {
  let _ = require('lodash');
  console.log('Arg one', one);
  console.log('Arg two', two);
  console.log('Arg three', three);
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

### Miscellaneous methods
#### somiibo.getOS()
- returns: <[Object]>

This method returns the current user's operating system data as an object.

Examples:
```js
somiibo.log(somiibo.getOS());
```
```js
{
  platform: 'win32',
  name: 'windows',
  version: '10.0.17763',
}
```
```js
{
  platform: 'darwin',
  name: 'mac',
  version: '10.15.4',
}
```
```js
{
  platform: 'linux',
  name: 'mac',
  version: '10.15.4',
}
```

#### somiibo.alert(options)
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
  button: 'Goodbye',
});
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

### Events
#### event: 'change'
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

#### event: 'submit'
- `data` <[Object]> The user's settings serialized into a JSON object

Emitted when the settings are saved by the user. Any changes made to the `data` object will overwrite the user's settings.

Examples:
```js
async function main(settings) {
  settings.on('submit', function (data) {
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
      input: 'fieldName' // Supplying the name of the setting will automatically highlight it for the user
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

#### Settings.json Fields
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

## Using Your Package in Somiibo
When you import a custom package into Somiibo, you can supply a local path or a URL.

If you supply a local path, the package will be loaded directly from your computer while, conversely, if you supply a URL Somiibo will attempt to load the package from your remote server.

1. Open the settings page in Somiibo by navigating to <a href="somiibo://settings">somiibo://settings</a> or pressing <kbd>cmd</kbd>+<kbd>,</kbd> or <kbd>ctrl</kbd>+<kbd>,</kbd>.
2. Select the **Module packages** tab.
3. Click the plus button **(+)**.
4. Enter the local file path or the remote URL that points to your package's `main.json`.
5. Select **Add package** and you're done!

You should now see your custom package added to the list of packages.

## Publishing Your Package
1. Commit/upload your package as a [repository](https://help.github.com/en/github/getting-started-with-github/create-a-repo) on GitHub.
2. Open the repository settings by selecting the gear icon on the right.
3. Scroll down until you see the **GitHub Pages** section. Change the first dropdown to **master branch**.

Great! Now your module package is hosted for free on GitHub pages!

Your remote URL will be something like `https://<username>.github.io/<repo>/main.json`.

For example, this package is hosted on GitHub pages at this address: [https://somiibo.github.io/module-package-examples/main.json](https://somiibo.github.io/module-package-examples/main.json).


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
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[ElementHandle]: #class-elementhandle "ElementHandle"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
