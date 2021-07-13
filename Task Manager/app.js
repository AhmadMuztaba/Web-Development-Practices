  const express = require('express');
    require('./src/DB/mongoose');
    const app = express();
    const UserRouter=require('./src/routers/User');
    const taskRouter=require('./src/routers/task');
    app.use(express.json());
    app.use(UserRouter);
    app.use(taskRouter);
module.exports=app;