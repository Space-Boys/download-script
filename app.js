var request = require('request'),
    fs      = require('fs');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const nasa = "https://gibs-a.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2020-10-02T00:00:00Z&layer=VIIRS_SNPP_CorrectedReflectance_TrueColor&style=default&tilematrixset=250m";

// NOTICE! YOU MUST SET A VALUE HERE!
//Choose Matrix Setting from 0-8 (Matrix = zoom level) - default 0
const m = 6;

//This will handle the for loop values depending on chose matrix level
let col = "x";
let row = "x";

if (m === 0){
  col = 1; row = 0
} else if (m === 1){
  col = 2; row = 1
} else if (m === 2) {
  col = 4; row = 2
} else if (m === 3) {
  col = 9; row = 4
} else if (m === 4) {
  col = 19; row = 9
} else if (m === 5) {
  col = 39; row = 19
} else if (m === 6) {
  col = 79; row = 39 
} else {
  console.log("error, please declare matrix value between 0-6");
}

if (m < 6) {
  for (var a = 0; a <= row; a++){
      for (var b=0; b <= col; b++) {
          download(`${nasa}&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${m}&TileCol=${b}&TileRow=${a}`, `./matrix${m}/tile-col-${b}row${a}.jpg`, function(){
              console.log('done');
        });
      }
  } else {
      console.log("error");
  }
// } else {solution to server timeout goes here}
