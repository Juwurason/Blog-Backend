const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const mongoose = require('mongoose')
const Blog = require("./models/Blogs")
const Users = require("./models/User")
const bcrypt = require("bcrypt")
const PORT = process.env.PORT
const multer = require("multer")
const fs = require('fs')
const Example = require("./models/Example")
const loginRoute = require("./Routes/user")
// const upload = multer({dest: 'uploads/'})
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const auth = require("./middleware/auth")
const router = express.Router()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

mongoose.connect(process.env.MG,{},(err) =>{
app.listen(PORT, ()=> console.log(`app on port ${PORT}`));
    // if (err) throw new Error(err) 
    if (err) console.log(err); 
    console.log("database connected");

});

app.get("/signup", auth, async (req, res) =>{
  const profile = await Users.findById(req.user._id)
  res.send(profile)
})

app.get("/", async(req, res)=>{
    // res.status(200).json({ message: "welcome now"})
    // console.log(req.body);
    const blog = await Blog.find({})
    // res.status(200).json(blog)
    res.status(200).json({blog})
    console.log(blog[0].tittle);
})
app.post("/",(req,res)=>{
    res.status(200).json({message:"Posted"})
    console.log(req.body);
    const {title, body, author} =  req.body
    const blom = Blog.create({
    tittle: title,
    body: body,
    author: author,
    // image: image
})
})

app.get("/signu", async(req, res)=>{
    const user = await Users.find({})
    res.status(200).json({user})
    console.log(user);
})



const handleErrors = (err) =>{
  console.log(err.message, err.code);
  let errors = {email:'', password:''}

  if (err.message === 'incorrect email') {
    errors.email = 'email is not register (Signup and Try again)'
    // return errors
  }

  if (err.message === 'incorrect password') {
    errors.password = 'password incorrect'
  }

  if (err.code === 11000) {
    errors.email = "email already exist"
    return errors
  }


  if (err.message.includes('users validation failed')) {
   Object.values(err.errors).forEach(({properties}) =>{
      errors[properties.path] = properties.message
   })
  }
  return errors
}


app.post("/signup", async (req,res)=>{
  try {
    const {username, email, password, fullname} = req.body
    const user = await Users.create({username, email, password, fullname})
    const jwtData = {id:user._id, email: user.username}
    const token = jwt.sign(jwtData, process.env.JWTSERCET, {expiresIn: "2h"})
    res.send(token)
        // res.status(201).json(user._id)
  } catch (err) {
    //  console.log(error);
   const errors = handleErrors(err)
     res.status(200).json({ errors })
  }
})
// app.use("/", loginRoute)


app.post("/login", async (req, res) => {

  const { email, password } = req.body;
  try {
    const user = await Users.login(email, password);
    // res.status(200).json({ user: user._id, status: true });
    
    const jwtData = {_id:user.id, email: user.email}
    const token = jwt.sign(jwtData, process.env.JWTSERCET, {expiresIn: "2h"})
    res.send(token)
  } catch (err) {
    const errors = handleErrors(err);
    res.json({errors});
  }})


  // app.get("/login", async (req, res)=>{
  //   const body = req.body
  //   const user = await Users.findOne({email:body.email});
  //   console.log({user})
  //   res.send(user)
  // })



  const storage = multer.diskStorage({
      destination:(req,file,cb)=>{
        cb(null, "uploads")
      },
      filename: (req, file, cb)=>{
        cb(null,file.originalname)
      }
   })
 const upload = multer({storage: storage})

 app.post('/up',upload.single('testi'), (req,res)=>{
  const body = req.body
  console.log(body);
  const savei = new Example({
    tittle: body.tittle,
    body: body.body,
    author: body.author,
    img:{
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png"
    }
  })
  savei
  .save()
  .then((res)=>{
    console.log("image is saved")
  })

  .catch((err)=>{
    console.log(err, "error has occur")
  })
  res.send('image is saved')
  // res.send('image is saved', res.send(req.body))
 })

 app.get('/up',async (req,res)=>{
  const allData = await Example.find()
  res.json(allData)
 })

app.post('/delete', async (req,res) =>{
    const {id} = req.body
    console.log(id);
  try {
  await Example.deleteOne({_id: req.body.id})
    res.status(200).json({message:"Deleted"})
  } catch{
    res.status(404).send({error: "id not found"})
  }
  
})

app.get('/:id', async (req,res,next) =>{
    console.log(req.params.id);
  try {
  const result =  await Example.findById(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"not found"})
  }
})


  // app.post("/image", upload.single("image"), (req, res) => {
  //   console.log(req.file)
  //   if (!req.file) {
  //     res.send({code: 500, msg: "err"})
  //   }
  //   else{
  //     res.send({code: 200, msg: "upload successful"})
  //   }
  // })
