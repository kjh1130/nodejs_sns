const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');
const User = require("../models/user");


const router = express.Router();

//POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow);

router.post('/:id/unfollow',isLoggedIn, async(req,res,next)=>{
    try{
        const user=await User.findOne({where:{id:req.user.id}});
        if(user){
            await user.removeFollowing(parseInt(req.params.id,10));
            res.send('success');
        }else{
            res.status(404).send('no user');
        }
    }catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;