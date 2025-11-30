import User from "../Models/user.models.js";
import APIError from "../Utils/apiError.utils.js";

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) throw new APIError(400, "name is missing");
    if (!email) throw new APIError(400, "email is missing");
    if (!password) throw new APIError(400, "password is missing");

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

    res.status(201).json({
      success: true,
      message: "User has Signed Up Successfully",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(`SignUp error occured: ${error}`);
    return res.status(500).json({
      success: false,
      message: `Please check fields or it might be an internal error: ${error}`,
    });
  }
};

export default userSignUp;
