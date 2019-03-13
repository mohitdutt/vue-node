const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    console.log('req', bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretKey', (err, decoded) => {
            if (err) {
                console.log('error')
                res.sendStatus(403)
            } else {
               req.body.userData =  decoded;
               next();
            }
        })
    } else {
        console.log('error')
        res.sendStatus(403)
    }
}
