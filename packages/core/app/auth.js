module.exports = async (decoded, request, h) => {
  const { User } = request.server.models()
  const userCheck = await User.query().findOne({
    username: decoded.username
  })

  if (userCheck) {
    return { isValid: true }
  }

  return { isValid: false }
}
