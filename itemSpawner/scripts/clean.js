var fs = require('fs');


// Credits to https://stackoverflow.com/a/52526549/8523745
function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(file => {
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        //console.log(`Deleting file "${path}"...`)
        fs.unlinkSync(curPath);
      }
    });

    //console.log(`Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
};

console.log('Cleaning dist...')
deleteFolderRecursive('dist');
console.log('Done cleaning files!');