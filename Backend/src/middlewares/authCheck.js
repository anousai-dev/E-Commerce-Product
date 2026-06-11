const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');


exports.authCheck = async(req,res,next) => {
    try{
        const headerToken = req.headers.authorization;
        
        // ตรวจสอบว่ามี Token หรือไม่ ได้ใส่มาหรือป่าว
        if(!headerToken){
            return res.status(401).json({message:"Unauthorised"});
        }
        // ตัดคำว่า Bearer ออก เหลือแต่ตัว Token
        const token = headerToken.split(" ")[1];

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
        req.users = verifyToken

        const users = await prisma.user.findUnique({
          where:{
            email: req.users.email
          }
        })
        if(!users.enabled){
            return res.status(401).json({message:"User disabled"});
        }
        // console.log("i am admin");
        // console.log(users);


        next();        
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Token error"});
    }
}


exports.adminCheck = async(req,res,next) => {
    try{
        const {email} = req.users
        // console.log(email);
        const adminUser = await prisma.user.findFirst({
          where:{
            email: email
          }
        })

        if(!adminUser || adminUser.role.toLowerCase() !== "admin"){
          return res.status(401).json({message:"User is not admin"});
        }

        // console.log(adminUser);


    next();
}catch(error){
    console.log(error);
    res.status(500).json({message:"Token error"});
}
}