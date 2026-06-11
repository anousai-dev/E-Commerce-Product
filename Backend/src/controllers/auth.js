const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async(req, res) => {
    try{
        const {name , email , password } = req.body;
        // validate the input
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        // Check Email is Exsist 
        const user = await prisma.user.findUnique({
            where : { email : email }
        })
        if(user){
            return res.status(400).json({message:"Email is already exist"}); // อีเมลซ้ำ หรือ มีแล้ว
        }
            // Hash Password
            const hashedPassword = await bcrypt.hash(String(password), 10);
            console.log("hashedPassword", hashedPassword);

            // Create User 
            await prisma.user.create({
                data:{
                    name,
                    email,
                    password:hashedPassword
                }
            })

        res.json({message:"User created successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }




};

// Login user
exports.login = async(req, res) => {
  try{
    const {email, password} = req.body;
    // Check Email is Exsist
    const user = await prisma.user.findFirst({
      where : { email : email }
    })
    if(!user || !user.enabled) return res.status(400).json({message:"User not found or not enabled"})
    // Check Password is Correct 
    const isPasswordMatch = await bcrypt.compare(String(password), user.password)
    if(!isPasswordMatch) return res.status(400).json({message:"Invalid password"})
    
    
    // Create payload
    // เพื่อดืงข้อมูล DB มาบันทืกเข้า Token 
    const payload ={
      id:user.id,
      email:user.email,
      role:user.role
    }
    // Create token
    // เหมือนทำ บัตร ประชาชน 
    jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "1d"}, (err,token)=>{
      if(err){
        return res.status(500).json({message: "Error signing token"})
      }

      res.json({payload,token});
    })
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"});
  }
};

// Current user and current admin
exports.currentUser = async(req, res) => {
  try{
    
    res.send('OK');
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"});
  }
};

