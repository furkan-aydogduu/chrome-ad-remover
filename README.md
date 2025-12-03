# Chrome browser extension for blocking ads on websites

## Running This Extension

1. Clone this repository.
2. Load this directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. Click the extension icon in the Chrome toolbar, then select the "Chrome Ad Remover v1" extension. A popup will appear displaying the extension enable/disable button.
4. Switch the slider in the popup to enable mode and refresh the page.

#### $\large{\textbf{\textcolor{orange}{Note:}}}$ Supported websites can be seen in <code>manifest.json</code> configuration file. You can extend website support by adding new configuration (by modifying manifest.json and adding new [<code><site.com></code>] classes) for new websites that should be convenient to project structure.

#### $\large{\textbf{\textcolor{orange}{Note:}}}$ This version of project uses built-in web [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) implementation to catch ads on the websites.

<h4>Tested on Chrome Browser versions:</h4> 
<ul>
  <li>Version 143.0.7499.41 (Official Build) (64-bit)</li>
</ul>

You can visit the google chrome developer website below for an example extension development tutoiral:

For more details, visit the [official tutorial](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world).
