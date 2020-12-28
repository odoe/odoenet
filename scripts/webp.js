const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGiflossy = require('imagemin-giflossy');

(async () => {
    // const files = await fs.promises.readdir('./assets/blog');
    // for (let file of files) {
    //     console.log(file)
    //     try {
    //         await imagemin([`./assets/blog/${file}/images/*.{jpg,png,gif}`], {
    //             destination: `./assets/blog/${file}/images/`,
    //             plugins: [
    //                 // imageminMozjpeg({quality: 50}),
    //                 // imageminPngquant({quality: [0.3, 0.5]}),
    //                 // imageminGiflossy({lossy: 60}),
    //                 imageminWebp()
    //             ]
    //         });
    //         console.log('Images converted successfully');
    //     } catch(err) {
    //         // do nothing
    //     }
    // }
    await imagemin([`./assets/blog/new-site/images/*.jpg`], {
        destination: `./assets/blog/new-site/images/`,
        plugins: [
            // imageminMozjpeg({quality: 50}),
            // imageminPngquant({quality: [0.3, 0.5]}),
            // imageminGiflossy({lossy: 80}),
            imageminWebp()
        ]
    });
})();
