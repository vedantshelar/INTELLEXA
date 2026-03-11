const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { protect } = require('../uitls/methods');

// Define a route for the user home page
router.get('/', (req, res) => {
    res.send('Users home page');
  });

router.get("/userData",protect,async(req,res,next)=>{
  try {
    res.json({success:true,data:req.user});
  } catch (error) {
    console.log("error in userData route : ",error);
    res.json({success:false,data:error});
  }
})

module.exports = router;