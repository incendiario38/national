let express = require('express');
let router = express.Router();
let fs = require('fs');
let multer = require('multer');

let models = require('../models');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let now = new Date();
        let folder = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)}`;

        // Проверяем есть ли папка для загрузки
        let dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 744);
        }

        // Проверяем есть ли папка сегодняшнего числа
        let path = dir + `/${folder}`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, 744);
        }
        cb(null, path);
    },
    filename: (req, file, cb) => {
        //console.log(req);
        let fileExtension = file.originalname.split('.')[1];
        cb(null, Date.now() + '.' + fileExtension);
    }
});

let upload = multer({storage: storage});

router.post('/upload', upload.single('photo'), (req, res) => {
    return models.Image
        .create({
            appealId: req.body.appealId,
            kind: req.body.kind,
            linkImage: req.file.path.replace(/\\/g, "/")
        })
        .then((image) => res.status(201).send(image))
        .catch((error) => res.status(400).send(error));
});

module.exports = router;