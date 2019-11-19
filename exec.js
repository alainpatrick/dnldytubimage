var execSync = require('child_process').execSync;
var Csvly = require('csvly');
// edit your csv file here
var reader = new Csvly('./3idz.csv', {
  firstLineIsHeaders: true
});

reader.on('line', function(line) {
  var output = execSync(`node ytcmd.js ${line.videoId}`, { encoding: 'utf-8' });
  //console.log('Output was:\n', output);
});
reader.on('end', function() {
  console.log('Awesome! Done downloading all image files!');
});
reader.readAll();

// edit csv file, i.e: videoids.csv
// run node exec.js
// wait for all files to be downloaded
// only last console message appear
