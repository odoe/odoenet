const fs = require('fs');
const markdownlint = require("markdownlint");

// Needed this script to turn <iframe> tag to !() mardkdown

const path = './markdown-pages/blog';
// const path = './posts_bak';

(async () => {
    const files = await fs.promises.readdir(path);
    for (let file of files) {
        try {
            // const md = await fs.promises.readFile(`${path}/${file}/index.md`, 'utf-8');
            const options = {
                files: [
                    `${path}/${file}/index.md`
                ],
                config: {
                    "default": true,
                    "MD013": false,
                    "MD033": false,
                    "MD036": false,
                    "MD045": false
                    // "MD003": { "style": "atx_closed" },
                    // "MD007": { "indent": 4 },
                    // "no-hard-tabs": false,
                    // "whitespace": false
                  }
            };
            // Makes an asynchronous call
            markdownlint(options, function callback(err, result) {
                if (!err) {
                    console.log(result.toString());
                }
            });
        } catch(err) {
            // do nothing
            console.log('oops: ', err.message);
        }
    }

})();
