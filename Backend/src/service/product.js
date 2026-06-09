const prisma = require('../config/prisma');

const headleQuery = async(req,res,query) =>{
    try{
        const products = await prisma.product.findMany({
            where:{
                title:{
                    contains:query
                }
            },
            include:{
                category:{
                    select:{
                        name:true,
                        id:true
                    }
                },
                images:true,
            }
        })
        res.json(products);
        
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

const headlePrice = async(req,res,priceRange) =>{
    try{
        const products = await prisma.product.findMany({
            where:{
                price:{
                    gte:priceRange[0],  //min 1000
                    lte:priceRange[1]   //max 50000
                }
            },
            include:{
                category:true,
                images:true,
            }
        })
        res.json(products);
        
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
    
}


const headleCategory = async(req,res,category) =>{
    try{
        const products = await prisma.product.findMany({
           where:{
            categoryId:{
                in:category.map((id) => parseInt(id))
            }
           },
           include:{
            category:true,
            images:true,
           }
        })
        res.json(products);
        
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}





module.exports = {
    headleQuery,
    headlePrice,
    headleCategory
};
