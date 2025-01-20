const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.access(folderPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error('Directory does not exist:', err.message);
    return;
  }

  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err.message);
      return;
    }

    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const { name, ext } = path.parse(file.name);

        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error('Error reading file stats:', err.message);
            return;
          }

          const fileSizeKB = stats.size / 1024;
          const fileSizeMB = fileSizeKB / 1024;
          const fileSize = fileSizeKB > 1024 ? `${fileSizeMB.toFixed(3)}MB` : `${fileSizeKB.toFixed(3)}KB`;

          console.log(`${name} - ${ext.slice(1)} - ${fileSize}`);
        });
      }
    });
  });
});
