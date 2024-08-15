import jwt from "jsonwebtoken"

const isAunthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            res.status(400).json({
                message:'user is not authenticated',
                status:false
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY)
        if(!decode){
            res.status(400).json({
                message:'invalid token',
                status:false
            })
        }
        req.id=decode.userId
        next();

    } catch (error) {
        console.log(error)
    }
}

export default isAunthenticated