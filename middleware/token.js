var jwt = require('jsonwebtoken');

var getToken = async (username) => {
    var token = await jwt.sign(username, "helloworld", {
        expiresIn: 60
    });
    console.log(await jwt.verify(token, "helloworld"));
    return token;
}

var verifyToken = async (req, res, next) => {
    var authHeader = req.headers.authorization;
    authHeader = true;
    if (authHeader) {
        //var token = authHeader.split(' ')[1];
        var token = "eyJhbGciOiJIUzI1NiJ9.c2FnYXIxMDEyODNjc2VAZ21haWwuY29t.E90ScPFIcQYjWB_VSGninmHttw65dqmhZ5HmFQHcc5Y";
    
        jwt.verify(token, "helloworld", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.body.email = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    getToken,
    verifyToken
}