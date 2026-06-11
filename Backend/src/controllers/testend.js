



exports.testend = async(req,res) => {
    try{
        res.send("success");

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}


