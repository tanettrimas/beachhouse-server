const jwt = require('jsonwebtoken')

function makeCreateTokenService ({ jwt }) {
  function createToken({ id, username, role } = {}) {
    return new Promise((resolve, reject) => {
      const payload = { id, username, role }
      jwt.sign(payload, process.env.LOGIN_SECRET, 
      { algorithm: 'HS256', expiresIn: '1h'}, 
      (err, token) => {
        if(err) {
          reject(err)
        }
        resolve(token)
      })
    })
  }

  function verifyToken(token, signature) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, signature, (err, decoded) => {
        if(err) {
          reject(err)
        }
        resolve(decoded)
      })
    })
  }

  return Object.freeze({
    createToken, 
    verifyToken
  })
}

module.exports = makeCreateTokenService({ jwt })