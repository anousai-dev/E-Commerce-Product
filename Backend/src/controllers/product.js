const prisma = require('../config/prisma');
const {headleQuery,headlePrice,headleCategory} = require('../service/product');

// ไว้สำหรับ สร้างข้อมูลสินค้า
exports.create = async(req, res) => {
    try{
        const {title,description,price,stock,categoryId,images} = req.body
        const localTime = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
        const product = await prisma.product.create({
            data:{
                title:title,
                description:description,
                price:parseFloat(price),
                stock:parseInt(stock),
                categoryId:parseInt(categoryId),
                createdAt: localTime,
                updatedAt: localTime,
                images:{
                    create:images.map((item) => ({
                        url: item.url,
                        secure_url: item.secure_url,
                        asset_id: item.asset_id,
                        public_id: item.public_id
                    }))
                }
            }
        })

        res.json({message:"Create Product Success"});
        
       
        
        
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

// ไว้สำหรับ แสดงข้อมูลสินค้า ทั้งหมด หรือ แสดงข้อมูลสินค้า ตามจำนวนที่กำหนด
exports.list = async(req, res) =>{
    try{
        const {count} = req.params
        const product = await prisma.product.findMany({
            take:parseInt(count),
            orderBy:{
                id:"asc" 
            },
            include:{
                category:true,
                images:{
                    take:1
                }
            }
        });

        res.json(product);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

// ไว้สำหรับ แสดงข้อมูลสินค้า 1 ชิ้น หรือ การดูรายละเอียดสินค้า
exports.read = async(req, res) =>{
    try{
        const {id} = req.params
        const product = await prisma.product.findFirst({
            where:{
                id:parseInt(id)
            },
            include:{
                category:true,
                images:true,
            }
        });

        res.json(product);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

// ไว้สำหรับ อัปเดตข้อมูลใหม่ หรือ แก้ไขข้อมูลสินค้า
exports.update = async(req, res) =>{
    try{
        const {title,description,price,stock,categoryId,images} = req.body
        const localTime = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

        // clear old images
        await prisma.image.deleteMany({
            where:{
                productId:parseInt(req.params.id)
            }
        })


        const product = await prisma.product.update({
            where:{
                id:parseInt(req.params.id)
            },
            data:{
                title:title,
                description:description,
                price:parseFloat(price),
                stock:parseInt(stock),
                categoryId:parseInt(categoryId),
                updatedAt: localTime,
                images:{
                    create:images.map((item) => ({
                        url: item.url,
                        secure_url: item.secure_url,
                        asset_id: item.asset_id,
                        public_id: item.public_id
                    }))
                }
            }
        })

        res.json({message:"Update Product Success",product});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

// ไว้สำหรับ ลบข้อมูล
exports.remove = async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await prisma.product.delete({
            where:{
                id:parseInt(id)
            },
            include:{
                images:true //ลบรูปพร้อมสินค้า
            }
        })
        
        await prisma.$executeRawUnsafe(`ALTER TABLE Product AUTO_INCREMENT = 1`);

        res.json({message:"Remove Product Success"});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

// ไว้สำหรับ เรียงข้อมูล หรือ แสดงข้อมูล ตาม order และ limit
exports.listby = async(req, res)=>{
    try{
        // Select product and sort by price or stock
        const {sort, order,limit} = req.body;

        const products = await prisma.product.findMany({
            take:parseInt(limit),
            orderBy:{
                [sort]:order
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


// ไว้สำหรับ ค้นหาข้อมูลสินค้า หรือ แสดงข้อมูลสินค้า ตามเงื่อนไข
exports.filters = async(req, res)=>{
    try{
        const { query,category,price} =req.body
        if(query){
            console.log(`Title: ${query}`);
            await headleQuery(req,res,query);
        }
        if(category){
            console.log(`Category: ${category}`);
            await headleCategory(req,res,category);
        }
        if(price){
            console.log(`Price: ${price}`);
            await headlePrice(req,res,price);
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}