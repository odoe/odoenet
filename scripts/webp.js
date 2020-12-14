const fs = require('fs');
const path = require('path');
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

(async () => {
    const files = await fs.promises.readdir('./assets/blog');
    for (let file of files) {
        console.log(file)
        try {
            await imagemin([`./assets/blog/${file}/images/*.{jpg,png}`], {
                destination: `./assets/blog/${file}/images/`,
                plugins: [imageminWebp()]
            });
            console.log('Images converted successfully');
        } catch(err) {
            // do nothing
        }
    }

})();
