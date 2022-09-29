const {Router} = require('express')
const router = Router()
const Users = require('../models/User')
const bcrypt = require("bcrypt")

router.post("/login", async (req, res) => {

  const { email, password } = req.body;
  try {
    const user = await Users.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 }); 
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    res.status(400).json({});
  }

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

    // const body = req.body;
    // const user = await Users.findOne({ email: body.email });
    // const user = await Users.find({});
    // if (user) {
    //   const Pass = await bcrypt.compare(body.password, user.password);
    //   if (Pass) {
    //     res.status(200).json({ message: "Successful login" });
    //   } else {
    //     res.status(400).json({ error: "Wrong Password" });
    //   }
    // } else {
    //   res.status(401).json({ error: "User does not exist" });
    // }
  });


  module.exports = router

