const fs = require('fs').promises;
const path = require('path');

function copyDir(
  src = path.join(__dirname, 'files'),
  dest = path.join(__dirname, 'files-copy')
) {
  return fs
    .access(src)
    .catch(() => {
      throw new Error(`Source directory "${src}" does not exist.`);
    })
    .then(() => fs.rm(dest, { recursive: true, force: true }))
    .then(() => fs.mkdir(dest, { recursive: true }))
    .then(() => fs.readdir(src, { withFileTypes: true }))
    .then((entries) => {
      const copyPromises = entries.map((entry) => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          return copyDir(srcPath, destPath);
        } else {
          return fs
            .copyFile(srcPath, destPath)
            .then(() => console.log(`Copied file: ${srcPath} -> ${destPath}`))
            .catch((err) => console.error(`Failed to copy file: ${srcPath}`, err.message));
        }
      });

      return Promise.all(copyPromises);
    })
    .then(() => console.log(`Directory copied successfully from ${src} to ${dest}`))
    .catch((err) => console.error(`Error during directory copy: ${err.message}`));
}

copyDir();