import jwt from "jsonwebtoken";
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
}
export const auth = (req,res,next) => {
    const token = req.headers.authorization.split("")[1];
    let decodedData;
    if(token){
        decodedData = jwt.verify(token, "test", (err, decoded) => {
            if(err){
                return catchError(err, res)
            } else {
                req.userId = decodedData?.id;
                next();
            }
        });
    } else {
        return res.status(403).send({ message: "No token provided!" });
    }
}
