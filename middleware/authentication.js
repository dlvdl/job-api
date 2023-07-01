const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors")

const auth = async (req, res, next) => {
  // Check header
  if (req.headers.authorization) {
    throw new UnauthenticatedError("Authentification invalid")
  }

  const token = jwt.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError("Authentification invalid")
  }
}

module.exports = auth
