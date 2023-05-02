const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const auth = (req, res, next) => {
    let token  = req.headers.authorization
    if (token) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'masai');
            if (decoded) {
                // req.body["authorID"] = decoded.authorID;
                // req.body.author = decoded.author;
                // console.log(decoded)
                next()
            }
            else {
                res.send({"msg":"Please Login First"})
            }
        }
        catch (err) {
            res.send({'msg':err.message})
        }
    }
    else[
        res.send({"msg":"Please Login First"})
    ]
    
}

module.exports = {
    auth
}