const jwt = require("jsonwebtoken");

module.exports.isAuthorized = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error)
        res.status(405).json({ error: 'Invalid token' });
    }
}
