const router = require("../services/category");




exports.list = async(req, res) => {
    
    try{
        res.json({message:"All categories"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
};




exports.create = async(req, res) => {
   try{
        res.json({message:"Create category"});
   }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"});
   }
};




exports.remove = async(req, res) => {
   try{
        
        // console.log(req.params);
        res.json({message:"Remove category"});
   }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"});
   }
};