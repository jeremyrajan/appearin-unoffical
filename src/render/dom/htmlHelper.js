const shell = require('electron').remote.shell; // eslint-disable-line

/**
 * Creates an element (with data attributes) and returns it
 * @param {string} type - Type of element, eg: div, p
 * @param {string} className - Name of class
 * @param {string} id - ID for the element
 * @param {string} html - set innerHTML
 * @param {object} data - data attributes eg: {key: value, key: value}
 * @return {object} element
 */
const createElement = (type, className, id, html, data = null) => {
  const element = document.createElement(type);
  element.className += className;
  element.setAttribute('id', id);
  if (type !== 'input') {
    element.innerHTML = html;
  } else {
    element.setAttribute('value', html);
  }
  if (!!data) {
    for (let key in data) { // eslint-disable-line
      if (data.hasOwnProperty(key)) {
        let value;
        if (key === 'value') {
          value = '';
        } else {
          value = `-${key}`;
        }
        element.setAttribute(`data-balloon${value}`, data[key]);
      }
    }
  }
  return element;
};

/**
 * Adds event listener for the element
 * @param {object} elem - DOM element
 * @param {string} eventType - Type of event to bind to. eg: click
 * @param {function} handler - function to execute when invoked
 */
const addEvent = (elem, eventType, handler) => {
  if (elem.addEventListener) {
    elem.addEventListener(eventType, handler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent(`on${eventType}`, handler);
  }
};

/**
 * Refresh the page or UI
 */
const refresh = () => {
  location.reload();
};

const setStorage = (key, value, parent) => {
  if (!!localStorage.getItem(parent)) {
    const parentJSON = JSON.parse(localStorage.getItem(parent));
    parentJSON[key] = value;
    localStorage.setItem(parent, JSON.stringify(parentJSON));
  }
  localStorage.setItem(parent, {});
};

const getStorageValue = (key, parent) => {
  const parentJSON = JSON.parse(localStorage.getItem(parent));
  return parentJSON[key];
};

const openLoc = (loc) => {
  shell.openExternal(loc);
};

module.exports = {
  createElement: createElement,
  addEvent: addEvent,
  refresh: refresh,
  setStorage: setStorage,
  getStorageValue: getStorageValue,
  openLoc: openLoc
};
