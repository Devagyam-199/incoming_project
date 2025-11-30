import { Router } from "express";
import crypto from "crypto";
import config from "../../config.js";

const AuthRouter = Router();

const base64Encoder = (buffer) => {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const codeVerifierGenerator = () => {
  return base64Encoder(crypto.randomBytes(32));
};

const codeChallengeGenerator = (codeVerify) => {
  const hash = crypto.createHash("sha256").update(codeVerify).digest();
  return base64Encoder(hash);
};

AuthRouter.get("/auth/airtable", (req, res) => {
  const codeVerify = codeVerifierGenerator();
  const codeChallenge = codeChallengeGenerator(codeVerify);

  req.session.codeVerify = codeVerify; //i have implemented a simple cache for codeVerify to verify integrity.

  const authorizationUrl = new URL(`${config.airtableUrl}/oauth2/v1/authorize`);

  authorizationUrl.searchParams().set("response-type", "code");
  authorizationUrl.searchParams().set("clientId", config.clientId);
  authorizationUrl.searchParams().set("redirect_uri", config.redirectUri);
  authorizationUrl.searchParams().set("scope", config.scope);
  authorizationUrl.searchParams().set(
    "state",
    crypto.randomBytes(16).toString("hex")
  );
  authorizationUrl.searchParams().set("code_challenge_method", "S256");
  authorizationUrl.searchParams().set("code_challenge", codeChallenge);

  return res.redirect(authorizationUrl.toString());
});

export default AuthRouter;
