import APIError from "../Utils/apiError.utils.js";

const signUpMiddleware = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) return next(new APIError(400, `name is missing`));
  if (!email) return next(new APIError(400, `email is missing`));
  if (!password) return next(new APIError(400, `password is missing`));

  if (name.length < 3 || name.length > 25) {
    return next(
      new APIError(
        400,
        `name should have atleast 3 letters minimum and 25 letters maximum`
      )
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new APIError(400, "Invalid email format"));
  }

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_.\/!#$%^&*])[A-Za-z\d@_.\/!#$%^&*]{8,12}$/;
  if (!strongPasswordRegex.test(password)) {
    return next(
      new APIError(
        400,
        "Password must be minimum 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@_./!#$%^&*)"
      )
    );
  }
  next();
};

export default signUpMiddleware
