
const fs = require('fs');
function loadFromDirectory() {

  var asset_dir = "C:\Users\bbgam\OneDrive\Desktop\Mini Projects\Cabo\Cabo-Phaser-Game\client\public\assets";

  var file_list = []

  fs.readdir("assets/", function (err, files) {
    if (err) {
      console.error("Error reading Asset Directory");
      process.exit(1);
    }

    files.forEach(function (file, index) {
      file_list.push(file);


    })
    var myJsonString = JSON.stringify(file_list);
    fs.writeFile("image_names.json", myJsonString, (error) => {
      if (error) {
        throw error;
      }
    });
  })



}

loadFromDirectory();
