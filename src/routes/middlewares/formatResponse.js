/**
 * 
 * In order for this to work properly, you need to set 
 * res.responseValue = THE_VALUE_YOU_WANT_TO_SEND_BACK
 * inside of the router
 * 
 * @param {*} req Express request handler
 * @param {*} res Express response handler
 * @param {*} next Express next handler
 * @description Formats the response to be of a pre-defined set of return values to the client.
 *  
 */

const formatResponse = (req, res, next) => {
  try {
    if(!res.responseValue) {
      throw new Error('Something went wrong processing the response!')
    }
    res.send({
      requestId: req.requestId,
      status: res.statusCode,
      message: 'Response successful!', 
      data: res.responseValue,
      length: (typeof res.responseValue !== 'string' && res.responseValue.length ) || null
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
}

module.exports = formatResponse


