const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req,res,next) => {

    // First check request headers has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'Token not found'})

    // Request jwt token from request headers
    const token = req.headers.authorization.split('')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'})

        try {
            // Verify the jwt token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach user info to request object
            req.user = decoded;
            next()
        } catch (error) {
            console.error(error)
            res.status(401).json({error: 'Invalid token!'})
        }
    }


//function to generate JWT token
const generateToken = (userData) => {
    // generate a new JWT token using user data
    return jwt.sign({userData}, process.env.JWT_SECRET, {expiresIn: 30000});
}


module.exports = {jwtAuthMiddleware,generateToken}