import jwt from "jsonwebtoken";

const jwtGenerator = (userId) => {
  const payload = {
    id: userId,
    iat: Math.floor(Date.now() / 1000),
  };
  const accessToken = jwt.sign(
    { ...payload, type: "access" },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    { ...payload, type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

export default jwtGenerator;
