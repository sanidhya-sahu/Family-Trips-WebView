const express = require('express')
const cors = require('cors');
const parser = require('body-parser')
const fs = require('fs')
const path = require('path')
const app = express()
app.use(express.json());
app.use(express.static(__dirname));
app.use(parser.urlencoded({ extended: true }));
// Middleware for CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get(`/`, (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
})
app.get(`/list`, (req, res) => {
    // var imageData = []
    // var supplyData = []
    // var directoryData = []
    // fs.readdir(__dirname + '/Data/Lonar', (err, data) => {
    //     directoryData.push(data)
    //     supplyData.push(directoryData)
    //     console.log(directoryData)
    // })
    // // directoryData.forEach(element =>{
    // //     fs.readdir(__dirname + `/Data/${element}/`, (err, data) => {
    // //         imageData.push(data)
    // //         supplyData.push(imageData)
    // //     })
    // console.log(supplyData)
    // // })
    // res.json(supplyData)
    // Read child directories from the parent folder
    const parentFolderPath = __dirname+'/Data';
    fs.readdir(parentFolderPath, (err, children) => {
        if (err) {
            console.error('Error reading child directories:', err);
            return res.status(500).json({ error: 'Error reading child directories' });
        }

        const imagesData = [];

        // Iterate through each child directory
        children.forEach((childDirectory) => {
            const childPath = path.join(parentFolderPath, childDirectory);

            // Check if it's a directory
            if (fs.lstatSync(childPath).isDirectory()) {
                // Read names of images in the child directory
                fs.readdir(childPath, (err, images) => {
                    if (err) {
                        console.error(`Error reading images from ${childDirectory}:`, err);
                        return;
                    }

                    // Filter image files (you can add more image extensions if needed)
                    const imageFiles = images.filter((fileName) =>
                        /\.(jpg|jpeg|png|gif|bmp)$/i.test(fileName)
                    );

                    // Store the data in the array
                    imagesData.push({
                        directory: childDirectory,
                        images: imageFiles,
                    });

                    // Check if we have collected data from all child directories
                    if (imagesData.length === children.length) {
                        // console.log(imagesData)
                        res.json(imagesData);
                    }
                });
            }
        });
    });
});

app.listen(80, () => {
    console.log(`Server Started at port : http://127.0.0.1`);
});