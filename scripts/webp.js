const fs = require('fs');
const path = require('path');
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

(async () => {
    // const files = await fs.promises.readdir('./assets/uses');
    // for (let file of files) {
    //     console.log(file)
    //     try {
    //         await imagemin([`./assets/uses/${file}/images/*.{jpg,png}`], {
    //             destination: `./assets/uses/${file}/images/`,
    //             plugins: [imageminWebp()]
    //         });
    //         console.log('Images converted successfully');
    //     } catch(err) {
    //         // do nothing
    //     }
    // }
    await imagemin([`./assets/made/images/*.{jpg,png}`], {
        destination: `./assets/made/images/`,
        plugins: [imageminWebp()]
    });
})();
