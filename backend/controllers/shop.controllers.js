import Shop from "../models/shop.model.js";
import uploadOnCLoudinary from "../utils/cloudinary"

export const createEditShop=async(req,res)=>{
    try{
        const {name,city,state,address}=req.body
        
        let image;
        if(req.file){
            image = await uploadOnCLoudinary(req.file.path) // returns a string
        }
        let shop = await Shop.findOne({owner:req.userId})

        if(!shop){
            shop=await Shop.create({
            name,city,state,address,image,owner: req.userId
        })

        await shop.populate("owner")
        return res.status(201).json(shop)
        }

        else{
            shop=await Shop.findByIdAndUpdate(shop._id,{
                name,city,state,address,image,owner:req.userId
            },{new:true})
        }
}

    catch(error){
        return res.status(500).json({message: `create shop error ${error}`})
    }

}
   


