import jwt from "jsonwebtoken";

const auth = (req,res,next) => {
    const token = req.headers.authorization.split("")[1];
    let decodedData;
    if(token){
        decodedData = jwt.verify(token, "test", (err, decoded) => {
            if(err){
                res.json({auth: false, message: "authentication failed"})
            } else {
                req.userId = decodedData?.id;
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
}

export default auth; 