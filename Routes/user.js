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

