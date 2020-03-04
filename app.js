const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DB;

const app = express();

//middlware
app.use(express.json());

//Schema 
const userSchema = new mongoose.Schema({
    deptname: {
      type: String
    },
    deptcode: {
      type: String
    },
    studentsnumber: {
      type: String
    }
  });

  //model
  const User = mongoose.model('User', userSchema);



//Routing 
app.get('/department/notice',async function(req, res){
    const users =await User.find();

    res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
            user: users
        }
    })
});

app.get('/department/notice/:id',async function(req, res){
    const users =await User.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
            user: users
        }
    })
})

app.post('/department/notice',async function(req, res){
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
    
});



app.delete('/department/notice/:id',async function(req, res){
    await User.findByIdAndDelete(req.params.id);

    res.status(300).json({
        status: 'success',
        data: null
    })
    
});

app.patch('/department/notice/:id',async function(req, res){
   const user =  await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    })
    
});


mongoose.connect(DB,{
    useNewUrlParser: true
}).then(function(){
    console.log('DB connect successfull')
}).catch(function(){
    console.log('DB connect faild')
});


//Server create
const port = process.env.PORT || 4000;
app.listen(port,function(){
    console.log('Server run on port 4000');
});