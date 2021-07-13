const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleWare/auth');
const email=require('../email/email');
const multer = require('multer');
const sharp = require('sharp');

router.post('/user', async (req, res) => {
    const user = new User(req.body);
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // });
    try {
        await user.save();
       email.welcomeEmail(user.email,user.name);
        const token = await user.getAuthToken();
        res.status(201).send({ token, user });
    } catch (err) {
        res.status(400).send(err.message);
    }
});
router.get('/users/me', auth, async (req, res) => {
    try{
        res.status(200).send(req.user);
    }
    catch(err){
        res.status(400).send(err.message);
    }
    // try{
    // const user=await User.find({});
    // res.status(200).send(user);
    // }
    // catch(err){
    //     res.status(400).send(err);
    // }
    // User.find({}).then((user)=>{
    //     res.status(200).send(user);
    // }).catch((err)=>{
    //     res.status(400).send(err);
    // })
})
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.getAuthToken();
        res.status(200).send({ user, token });
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.get('/logoutAll', auth, (req, res) => {
    req.user.tokens = [];
    req.user.save();
    res.status(200).send();
})


router.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.status(200).send();
    } catch (err) {
        res.status(400).send(err);
    }

});
router.patch('/user/me', auth, async (req, res) => {
    const user = req.user;
    const canBeEdit = ["name", "email", "password"];
    const wantsToEdit = Object.keys(req.body);
    const check = wantsToEdit.map((option) => {
        if (!canBeEdit.includes(option)) {
            return -1;
        }
        return 0;
    });
    if (check.includes(-1)) {
        return res.status(404).send('cant use that option');
    }
    //    res.status(404).send();
    try {
        const user = req.user;
        wantsToEdit.map((option) => {
            user[option] = req.body[option];
        })
        await user.save()
        res.send(user);

    } catch (err) {
        res.status(400).send();
    }
})

router.delete('/user/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send(req.user);
    }
    catch (err) {
        res.status(400).send(err);
    }
})

const upload = multer({
    // dest:'image',
    limits: {
        fileSize: 9000000,
    },
    fileFilter(req, file, cb) {
        //!file.originalname.match(/\.(jpg||jpeg||png)$/)
        if (!file.originalname.endsWith('.jpg') && !file.originalname.endsWith('.png') && !file.originalname.endsWith('.jpeg')) {
            return (cb(new Error('file cant be upload only picture is accepted')));
        }
        cb(null, true)
    }
});

router.post('/user/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({
        heigh: 300,
        width: 300
    }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

router.get('/user/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('coulnt find');
        }
        res.set('Content-Type', 'image/png');
        res.status(200).send(user.avatar);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }

})


router.delete('/user/me/avatar', auth, async (req, res) => {
    try {
        console.log(req.user);
        req.user.avatar = null;
        await req.user.save();
        res.status(200).send();
    } catch (err) {
        res.status(400).send();
    }
})

// router.get('/user/:id',async(req,res)=>{
//     const id=req.params.id;
//     try{
//         const user=await User.findOne({_id:id});
//         if(!user){
//             res.status(404).send('not found');
//         }
//         res.status(200).send(user);
//     }catch(err){
//         res.status(500).send(err);
//     }
// User.findOne({_id:id}).then((user)=>{
//     if(!user){
//         res.status(404).send('not found');
//     }
//     res.status(200).send(user);
// }).catch((err)=>{
//     res.status(500).send(err);
// })
// })


module.exports = router;