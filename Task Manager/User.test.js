const request=require('supertest');
const app=require('./app');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const User=require('./src/models/user');
const { use } = require('./app');
const _userId=new mongoose.Types.ObjectId();
const tok=jwt.sign({_id:_userId.toString()},'thisIsAKabab');
const userOne={
    _id:_userId,
    email:'ahmadmuztabasazid@gmail.com',
     password:'notunEduniya',
     name:'ahmad',
     tokens:[{
         token:tok,
     }]
}
beforeEach(async()=>{
   await User.deleteMany();
   await new User(userOne).save();
})

test('should signup a new user',async()=>{
   await request(app).post('/user').send({
        email:'onefistbro@gmail.com',
        password:'KemonJaniLage',
        name:'sazid'
    }).expect(201);   
});

test('Login',async()=>{
 const response=await request(app).post('/login').send({
      email:userOne.email,
      password:userOne.password
  }).expect(200);
  const user=await User.findById(response.body.user._id);
  console.log(user.tokens[0].token);
expect(user).not.toBeNull();

  expect(response.body)
  .toMatchObject({
      user:{
        email:'ahmadmuztabasazid@gmail.com',
        name:'ahmad',
      },
      token:tok,
  });
})

test('badLoginEmail',async()=>{
    request(app).post('/login').send(
        {email:'onefistbro@gmail.com',
        password:'notunEduniya'}).expect(400);
})

test('badLoginPassword',async()=>{
    request(app).post('/login').send(
        {email:'ahmadmuztabasazid@gmail.com',
        password:'Pikapikapikachu'}).expect(400);
})

test('gettingOwnProfile',async()=>{
   await request(app).get('/users/me')
   .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
   .send()
   .expect(200);
})

test('delete',async()=>{
  await request(app)
    .delete('/user/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

