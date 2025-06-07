const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { inngest } = require('../ingest/client');
const user = require('../models/user');
const { authenticate} = require("../middleware/authMiddleware");

const userSignUp = async(req,res) => {
  const { email, password, skills = [] } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, skills });
    
    //fire  inngest event
    await inngest.send({
      name:"user/signup",
      data: {
        email
      }
    })

    const token= jwt.sign(
      {
        _id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET_KEY
    )
   
    res.status(200).json({
      success: true,
      message: "user onboard successfully!",
      token:token,
   })
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "something got wrong: during signup",
      error:err.message
    })
  }
}

const userLogin = async(req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, message: "password is wrong" });

    
    const token= jwt.sign(
      {
        _id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET_KEY
    )

    res.status(200).json({
      success: true,
      message: "user logged in",
      token,
    })
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "something got wrong: during signin",
      error:err.message
    })
  }
};

const updateUser = async (req, res) => {
  const { skills=[],role ,email } = req.body;
  try {
    if (req.user?.role !== "admin") return res.status(401).json({ error: "only admin can update" });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "user not found" });
    const updatedUser = await User.updateOne(
      { email }, {
        skills: skills.length ? skills : user.skills,
        role
      }
    )
    return res.status(200).json({
      success: false,
      message: "user updated successfully",
      data:updateUser
    })
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "something got wrong: during updating",
      error:err.message
    })
  }
}

const getUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(401).json({ error: "forbidden" });
    const user = await User.find().select("-password");
    return res.json({ users: user });
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "something got wrong: during accessing user",
      error:err.message
    })
  }
}


module.exports = {
  userLogin,userSignUp,updateUser,getUser
}