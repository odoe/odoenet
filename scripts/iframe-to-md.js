const fs = require('fs');

// Needed this script to turn <iframe> tag to !() mardkdown

(async () => {
    const files = await fs.promises.readdir('./posts');
    for (let file of files) {
        try {
            const md = await fs.promises.readFile(`./posts/${file}/index.md`, 'utf-8');
            if (md.includes('<iframe')) {
                const mdUpdate = md.replace(/<iframe\s+.*?\s+src=("(.*?)").*?<\/iframe>/gi, '!($2)');
                await fs.promises.writeFile(`./posts/${file}/index.md`, mdUpdate);
            }
            console.log('updated successfully');
        } catch(err) {
            // do nothing
            console.log('oops: ', err.message);
        }
    }

})();
