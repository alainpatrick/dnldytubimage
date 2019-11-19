const request = require('sync-request');
const fs = require('fs');
const path = require('path');

const DIR = 'YtThumbs';
const VALIDSTATUS = [200, 304];

(URLS = {
  // Small auto-generated
  //  1: 'http://img.youtube.com/vi/*/1.jpg',
  //  2: 'http://img.youtube.com/vi/*/2.jpg',
  //  3: 'http://img.youtube.com/vi/*/3.jpg',
  // Custom
  //  Small: 'http://img.youtube.com/vi/*/mqdefault.jpg',
  Medium: 'http://img.youtube.com/vi/*/0.jpg'
  //  Large: 'http://img.youtube.com/vi/*/maxresdefault.jpg'
}),
  (KEYS = Object.keys(URLS));

function makeDirectory(dir) {
  try {
    fs.mkdirSync(dir);
  } catch (e) {
    console.error(e);
    //if (e.code == 'EEXIST') console.warn(e.message);
    //else throw e;
  }
}

function downloadThumbnails(vidId) {
  makeDirectory(DIR);
  for (var i = 0; i < KEYS.length; i++) {
    makeDirectory(path.join(DIR, KEYS[i]));
    url = URLS[KEYS[i]].replace('*', vidId);
    var res = request('GET', url);

    if (!~VALIDSTATUS.indexOf(res.statusCode))
      throw new Error(
        'Invalid status code received for image - unable to download:',
        KEYS[i]
      );
    else {
      //console.log('Type:', res.headers['content-type']);
      //console.log('Image Size:', res.headers['content-length'], '\n');
      var fileOut = vidId + '.jpg';
      var finalFile = path.join(DIR, KEYS[i], fileOut);
      fs.writeFileSync(finalFile, res.body, 'binary');
    }
  }
  //console.log('Single image downloaded, OK!');
}

exports.downloadThumbnails = downloadThumbnails;

// only errors will appea in console
