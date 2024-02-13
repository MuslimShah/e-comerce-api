const jwt=require('jsonwebtoken');

//creating token
exports.createJwt=(payload)=>{
    const secretKey=process.env.JWT_SECRET;
    const lifeTime=process.env.JWT_EXPIRE;    
    const token= jwt.sign(payload,secretKey,{expiresIn:lifeTime});
    return token;
}

//verify token
exports.isTokenValid=(token)=>jwt.verify(token,process.env.JWT_SECRET);


//create token and then attatch token to cookie
exports.attachCookieToResponse=(res,payload)=>{
    const token= this.createJwt(payload);
    const oneDay=1000*60*60*24;
    res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now()+oneDay)
    });
}