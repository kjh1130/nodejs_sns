const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
const { renderProfile, renderJoin, renderMain, renderHashtag } = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/',renderMain);
router.get('/hashtag', renderHashtag);

router.get('/',(req,res,next)=> {
    Post.findAll({
        include:[{
            model: User,
            attributes:['id','nick'],
        }, {
            model: User,
            attributes:['id','nick'],
            as: 'Liker',
        }],
    })
        .then((posts)=>{
            res.render('main',{
                title:'NodeBird',
                twits:posts,
                user:req.user,
            });
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

module.exports = router;