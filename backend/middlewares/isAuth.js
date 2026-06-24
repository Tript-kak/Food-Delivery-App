import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const isAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized (Token not found)"})
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodeToken){
            return res.status(401).json({message:"Unauthorized (Invalid token)"})
        }
       
        req.userId = decodeToken.userId;
        next();

    }

    catch(error){
        return res.status(401).json({message:"Unauthorized (Invalid token)"})
    }
}

export default isAuth;