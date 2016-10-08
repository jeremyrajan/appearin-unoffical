const Config = require('electron-config');
const config = new Config();
const rooms = config.get('rooms') || [];
const Dialogs = require('dialogs');
const dialogs = Dialogs(); // eslint-disable-line

const webView = document.getElementById('appearin');

const addRoom = () => {
  dialogs.prompt('Enter room name', '', (name) => {
    if (!name) return 'Not a valid room name';
    rooms.push(name);
    config.set('rooms', rooms);
  });
};

const listRoom = (r) => {
  const menu = $('#myRooms .dropdown-menu');
  const item = document.createElement('a');
  item.href = '#';
  item.innerHTML = r;
  item.classList.add('dropdown-item');
  $(item).click(() => webView.loadURL(`https://appear.in/${r}`));
  menu.append(item);
};

module.exports = {
  init: () => {
    rooms.forEach((r) => listRoom(r));
    $('#add_room').click(() => addRoom());
  }
};
