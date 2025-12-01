import User from "../Models/user.models.js";
import APIError from "../Utils/apiError.utils.js";

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  const normalizedEmail = email.toLowerCase().trim();

  const exisitingUser = await User.findOne({ email: normalizedEmail });

  if (exisitingUser) {
    throw new APIError(
      400,
      "The user with this email already exists, please try loging in or try another email"
    );
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    passHash: password,
  });

  return res.status(201).json({
    success: true,
    message: "User has Signed Up Successfully",
    data: {
      name: user.name,
      email: user.email,
    },
  });
};

export default userSignUp;
