const gulp = require('gulp');
const packager = require('electron-packager');
const path = require('path');
const del = require('del');
const packageJSON = require('./package.json');

const options = {
  arch: 'x64',
  dir: path.join(__dirname),
  platform: ['win32', 'darwin'],
  'app-version': packageJSON.version,
  'build-version': packageJSON.version,
  icon: path.join(__dirname, 'src', 'images', 'icon.icns'),
  ignore: /(node_modules_dev|bin|patches)/,
  name: 'Appear.in UnOfficial',
  out: path.join(__dirname, 'releases'),
  prune: true,
  asar: true
};

gulp.task('package', () => {
  del.sync([path.join(__dirname, 'releases')]);
  packager(options, (err, appPaths) => {
    if (err) return console.error(err); // eslint-disable-line
    console.log('done!'); // eslint-disable-line
    console.log(appPaths); // eslint-disable-line
  });
});

gulp.task('default', ['package']);
