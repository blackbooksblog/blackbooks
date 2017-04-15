var Router = require('express').Router;
var router = Router();
const uuid = require('uuid/v4');
let fs = require('fs');
let resize = require('resizer-stream');
var PNGDecoder = require('png-stream/decoder');
var PNGEncoder = require('png-stream/encoder');
var JPGDecoder = require('jpg-stream/decoder');
var fsp = require('fs-promise');
const fileType = require('file-type');
const sharp = require('sharp');

let processFile = async function(filepath, filename, mimetype) {
    // let stream = fs.createReadStream(filepath);
    // let newFile = fs.createWriteStream(filepath + '-resized');
    // let type = (_ => {
    //     if (mimetype.endsWith('png') || filename.endsWith('.png')) {
    //         return 'png';
    //     }

    //     if (mimetype.endsWith('jpeg') || mimetype.endsWith('jpg') || filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
    //         return 'jpg';
    //     }

    //     throw new Error("Couldn't guess type of image. It should be JPG or PNG");
    // })();

    // let decoder = type == "png" ? _ => new PNGDecoder : _ => new JPGDecoder({width: 500, height: 500});
    // let encoder = PNGEncoder;

    // stream.pipe(new decoder).pipe(resize({ width: 500, height: 500, fit: true })).pipe(new encoder).pipe(newFile);

    // let streamClose = async function() {
    //     return new Promise(resolve => {
    //         newFile.on('close', _ => {
    //             resolve();
    //         });
    //     });
    // };

    await sharp(filepath).resize(600, 500).toFile(filepath + '-resized');

    // await streamClose();
    return;
}

let getFile = async function (id) {
    let resizedPath = global.__root + 'images/' + id + '-resized';
    let originalPath = global.__root + 'images/' + id;
    let resizedExists = await fsp.exists(resizedPath);
    let originalExists = await fsp.exists(originalPath);

    if (resizedExists) {
        return fs.createReadStream(resizedPath);
    }

    if (!originalExists) {
        throw new Error("File not found");
    }

    let data = await fsp.readFile(originalPath);

    let type = fileType(data);

    await processFile(originalPath, type.ext, type.mime);

    return fs.createReadStream(resizedPath);
}


router.post('/save',async function (req, res) {
    if (req.files && req.files.file) {
        let id = uuid();
        let filePath = __root + 'images/' + id;
        let fileName = req.files.file.name;
        let fileMimetype = req.files.file.mimetype;
        req.files.file.mv(filePath, async err => {
            if (err) {
                throw err;
            }

            await processFile(filePath, fileName, fileMimetype);

            res._json({
                id: id
            });
        });
    }
}.catchy());

router.all('/:id',  async function (req, res) {
    let stream = await getFile(req.params.id);
    
    res.header('Content-type', 'image/png');
    stream.pipe(res);
}.catchy());

module.exports = router;