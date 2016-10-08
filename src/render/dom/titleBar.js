const htmlHelpers = require('./htmlHelper');
const BrowserWindow = require('electron').remote.BrowserWindow; // eslint-disable-line

module.exports = () => {
  const window = BrowserWindow.getFocusedWindow();
  htmlHelpers.addEvent(document.querySelector('#min-btn'), 'click', () => {
    if (!window.isFullScreen()) {
      window.minimize();
    } else {
      window.setFullScreen(false);
    }
  });

  htmlHelpers.addEvent(document.querySelector('#max-btn'), 'click', () => window.setFullScreen(true));

  htmlHelpers.addEvent(document.querySelector('#close-btn'), 'click', () => window.close());
};
