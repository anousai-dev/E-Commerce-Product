const prisma = require("../config/prisma");





exports.list = async(req, res) => {
    try{
        const category = await prisma.category.findMany();
        res.json(category);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
};




exports.create = async(req, res) => {
   try{
        const {name} = req.body;
        // ปรับเวลาให้เป็นเวลา ICT (UTC+7)
        const localTime = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
        const category = await prisma.category.create({
            data:{
                name:name,
                createdAt: localTime,
                updatedAt: localTime
            }
        })

        res.json({message:"Create category Success !!"});
   }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"});
   }
};




exports.remove = async(req, res) => {
   try{
        const {id} = req.params;

        const category = await prisma.category.delete({
            where:{
                id: Number(id)
            }
        })
        // รีเซ็ต AUTO_INCREMENT ให้รันต่อจาก ID ล่าสุดที่มีอยู่ (หรือเริ่มที่ 1 หากไม่มีข้อมูล)
        await prisma.$executeRawUnsafe(`ALTER TABLE Category AUTO_INCREMENT = 1`);

        // console.log(req.params);
        res.json({message:"Remove category Success !" , category});
   }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"});
   }
};