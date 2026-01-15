const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //get token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user",
        });
      }
      //store authenticated user
      req.user = decode;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Invalid token",
      error,
    });
  }
};
