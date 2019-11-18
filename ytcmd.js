const GetThumbs = require('./yt-downloader.js').downloadThumbnails;

function CmdThumb() {
  var args = process.argv.slice(2, process.argv.length);
  args.forEach(function(arg) {
    GetThumbs(arg);
  });
}
CmdThumb();

// youtube image downloader
// Run command line: node ytcms.js yt-video-id
// example: node ytcms.js XPtVZ69lomk
