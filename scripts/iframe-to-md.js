const fs = require('fs');

// Needed this script to turn <iframe> tag to !() mardkdown

const path = './markdown-pages/blog';
// const path = './posts_bak';

(async () => {
    const files = await fs.promises.readdir(path);
    for (let file of files) {
        try {
            const md = await fs.promises.readFile(`${path}/${file}/index.md`, 'utf-8');
            if (md.includes('[gist')) {
                // const mdUpdate = md.replace(/<iframe\s+.*?\s+src=("(.*?)").*?<\/iframe>/gi, '!($2)');
                const mdUpdate = md.replace(/\[gist\s+id=(.*?)\]/gi, '[gist](https://gist.github.com/odoe/$1)');
                await fs.promises.writeFile(`${path}/${file}/index.md`, mdUpdate);
            }
            console.log('updated successfully');
        } catch(err) {
            // do nothing
            console.log('oops: ', err.message);
        }
    }

})();
