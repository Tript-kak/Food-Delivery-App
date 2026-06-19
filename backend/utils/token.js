import jwt from "jsonwebtoken"

const genToken=async ()=>{
    try {
        const token=await jwt.sign({userId},process.env.JWT_SECRET,{expires:"7d"});
    } catch (error) {
        console.log(error)
    }
}

export default genToken