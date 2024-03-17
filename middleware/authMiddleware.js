const protect = (req, res, next) => {
  const {username} = req.session

  console.log(username);
  if (!username) {
    return res.status(401).json({
      status: "fail",
      message: "you are not logged in",
    });
  }
  next()
}

module.exports = protect;