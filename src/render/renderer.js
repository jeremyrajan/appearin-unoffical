window.$ = window.jQuery = require('jquery');
const settings = require('./tasks/settings');
const path = require('path');
const fs = require('fs');
const titleBar = require('./dom/titleBar');

// initialize everything first.
settings.init($);
titleBar();

const webView = document.getElementById('appearin');

$('#home').click(() => webView.loadURL('https://appear.in'));

webView.addEventListener('dom-ready', () => {
  // Open the DevTools if running dev
  if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath)) {
    webView.openDevTools();
  }

  // insert js
  const jsFile = fs.readFileSync(path.join(__dirname, 'inject', 'index.js')).toString();
  webView.executeJavaScript(jsFile);
});
