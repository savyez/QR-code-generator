import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

// Function to prompt user for a URL
inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Please enter a URL to generate a QR code:',
      validate: function (input) {
        var valid = input.startsWith('http://') || input.startsWith('https://');
        return valid || 'Please enter a valid URL (must start with http:// or https://)';
      }
    },
  ])
  
  .then((answers) => {
    const url = answers.url;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_code.png'));
    console.log('QR code generated and saved as qr_code.png');
    saveUrlToFile(url);
  })

  .catch((error) => {
    console.error('Error during user input:', error);
  });


// Function to save the URL to a text file
function saveUrlToFile(url) {
  fs.appendFile('url.txt', url + '\n', 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('URL saved to url.txt');
    }
  });
}

