const jwt= require('jsonwebtoken')

class midlewareController {
    // verifyToken
   async verifyToken (req, res, next){
        const token= req.cookies.token
        if(token){
           const Accesstoken= token
           jwt.verify(Accesstoken, process.env.JWT_ACCESS_KEY, function(err, user){
                if(err){
                    res.status(403).json('het thoi han')
                }
                req.user= user
                next()
           })
        }else{
            res.status(401).json('ban khong phai nguoi dung')
        }
    }


}

module.exports= new midlewareController