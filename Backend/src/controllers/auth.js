

// Register a new user
exports.register = async(req, res) => {
    try{
        console.log(req.body);
        res.send('OK');
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }




};


// Login user
exports.login = async(req, res) => {
  try{
    console.log(req.body);
    res.send('OK');
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

