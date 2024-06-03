import * as fs from 'fs';
export function loadFromDirectory(game) {

  var asset_dir = "C:\Users\bbgam\OneDrive\Desktop\Mini Projects\Cabo\Cabo-Phaser-Game\client\src\assets";

  fs.readdir(asset_dir, function (err, files) {
    if (err) {
      console.error("Error reading Asset Directory");
      process.exit(1);
    }

    files.forEach(function (file, index) {
      var name = file.split('.')[0];
      game.load.image(name, file);
    })
  })
}