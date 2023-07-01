const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnauthenticatedError } = require("../errors")

const register = async (req, res, next) => {
  const user = await User.create({ ...req.body })
  // Here I use the method that I creates in model
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  // Check for the password and email
  if (!email || !password) {
    throw new BadRequestError("Please provide login and password")
  }

  // Looking for user with given email
  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  // Checking the password with method created in schema
  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  // Create token and send it to the client
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login }
