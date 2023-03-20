const express=require('express');
const {generateimage,chatgenerate}=require("../controller/openaicontroller")
const router=express.Router();

router.post('/generateimage',generateimage)
router.post('/chatgenerate',chatgenerate)

module.exports=router;