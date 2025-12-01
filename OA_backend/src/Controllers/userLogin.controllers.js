import bcrypt from "bcrypt";
import User from "../Models/user.models.js";
import APIError from "../Utils/apiError.utils.js";
import jwtGenerator from "../Utils/jwtGenerator.utils.js";

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const normalizedEmail = email.toLowerCase().trim();

  const userExists = await User.findOne({
    email: normalizedEmail,
  }).select("+passHash");

  if (!userExists)
    throw new APIError(404, "User with this email does not exist");

  const passIsValid = await bcrypt.compare(password, userExists.passHash);

  if (!passIsValid) throw new APIError(401, "Wrong Password, Please Check!");

  const { accessToken, refreshToken } = jwtGenerator(userExists._id);

  userExists.refreshToken = refreshToken;

  await userExists.save();

  return res.status(200).json({
    success: true,
    message: "User is valid",
    data: {
      accessToken,
      refreshToken,
      email: userExists.email,
      name: userExists.name,
    },
  });
};

export default userLogin;
