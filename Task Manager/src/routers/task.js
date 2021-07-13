const express=require('express');
const auth=require('../middleWare/auth');
const User=require('../models/user');
const Task=require('../models/task');
const router=new express.Router();

router.post('/task',auth,async(req, res) => {
    const task = new Task({
       ...req.body,
       owner:req.user._id,
    });
    try{
        await task.save();
        res.status(201).send(task);
    }catch(err){
        res.status(400).send(err);
    }
    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })
})
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/task/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const task=await Task.find({_id:id});
        if(!task){
            res.statusCode(404).send("not found");
        }
        res.status(200).send(task);
    }catch(err){
        res.status(500).send(err);
    }
    // Task.find({_id:id}).then((task)=>{
    //     res.status(200).send(task);
    // }).catch((err)=>{
    //     res.status(500).send(err);
    // })
})
router.patch('/task/:id',auth,async(req,res)=>{
    const userUpdate=Object.keys(req.body);
   const update=["description","completed"];
   const check=userUpdate.map((option)=>{
     if(!update.includes(option)){
       return -1;
     }
     return 0;
   });
   if(check.includes(-1)){
       return res.status(404).send('not valid options');
   }

   try{
       const taskUpdate=await Task.findOne({_id:req.params.id,owner:req.user._id});
       if(!taskUpdate){
        res.status(404).send('couldnt found');
    }
       userUpdate.forEach((update)=>{
         taskUpdate[update]=req.body[update];
       });
       await taskUpdate.save();
    //    const taskUpdate=await Task.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,new:true});
       
       res.status(200).send(taskUpdate);
   }catch(err){
       res.status(400).send(err);
   }
})
router.delete('/task/:id',auth,async(req,res)=>{
   try{
   const userDelete=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
   if(!userDelete){
       res.status(404).send('sorry didnt find the task');
   }
   res.status(200).send(userDelete);
   }catch(err){
   res.status(400).send(err.message);
   }
})

module.exports=router;