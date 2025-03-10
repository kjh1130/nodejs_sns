const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {afterUploadImage, uploadPost} = require('../controllers/post');
const {isLoggedIn} = require('../middlewares');
const Post = require('../models/post');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('Making uploads directory...');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext)+Date.now()+ext);
        },
    }),
    limits: {fileSize:5*1024*1024},
});

//POST /post/img
router.post('/img',isLoggedIn,upload.single('img'), afterUploadImage);

//POST /post
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

router.post('/:id/delete',async(req,res,next) => {
    try{
        const post=await Post.findOne({where:{id:req.params.id, userId:req.user.id}});
        await post.destroy();
        res.redirect('/')
    } catch(error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;