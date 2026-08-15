import Address from "../models/Address.js";
export const addAddress=async(req,res)=>{
    try{
        let userId=req.userId;
        let addAddress=req.body;
        await Address.create({...addAddress,userId});
        res.json({success:true,message:"address added successfully"})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;

        const addresses = await Address.find({ userId });

        res.json({
            success: true,
            addresses: addresses
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};