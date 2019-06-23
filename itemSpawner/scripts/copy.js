const fs = require('fs');

const copy = (a, b) => { fs.copyFile(a, b, err => { if (err) throw err; });};
const mkdir = d => { if (!fs.existsSync(`dist/${d}`)) { fs.mkdirSync(`dist/${d}`); }};
const recurse = d => { fs.readdirSync(d).forEach(f => { copy(`${d}/${f}`, `dist/${d}/${f}`); }); };

// HTML
console.log('Copying HTML...');
copy('index.html', 'dist/index.html');

// CSS
console.log('Copying CSS...');
mkdir('css');
recurse('css');

// Images
mkdir('img');
recurse('img');

// CCLoader package
console.log('Copying package.json...');
copy('cc-package.json', 'dist/package.json');
copy('cc-mod.js', 'dist/mod.js');

console.log('Done copying files!');
