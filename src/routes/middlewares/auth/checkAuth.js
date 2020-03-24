const tokenService = require('../../../utils/services/token')

// TODO: Refactor
function checkAuth({ requiresAdmin = false } = {}) {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization
      if(!authHeader) {
        res.status(400)
        throw new Error('No Authorization header provided')
      }
      const [bearer, tokenString] = authHeader.split(' ')
      if (bearer && tokenString) {
        const token = await tokenService.verifyToken(tokenString, process.env.LOGIN_SECRET)
        if(requiresAdmin) {
          if(token.role === 'admin') {
            req.user = token
            return next()
          } else {
            res.status(403)
            throw new Error('Unable to grant access to resource')
          }
        } else {
          req.user = token
          return next()
        }
      }
      res.status(401)
      throw new Error('Unable to verify credentials')
    } catch (error) {
      next(error)
    }
  }
}



module.exports = checkAuth