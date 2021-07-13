require('./src/DB/mongoose');

const task=require('./src/models/task');
const User = require('./src/models/user');


// User.findByIdAndRemove('5f2850a151527329b4132091').then((user)=>{
//     console.log(user);
//     return task.find({completed:false})
// }).then((task1)=>{
//     console.log(task1);
// }).catch((err)=>{
//     console.log(err);
// })


const deleteTaskAndCount=async(id)=>{
    const task1=await task.findByIdAndRemove(id);
    const count=await task.countDocuments({completed:false});
    return count;
}
deleteTaskAndCount('5f28533c11dda81a04769d26').then((count)=>{
    console.log(count);
}).catch((err)=>{
    console.log(err);
})