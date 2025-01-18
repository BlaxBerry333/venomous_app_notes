import jwt from "jsonwebtoken";

const config = useRuntimeConfig();
const secretKey: string = config.security.jwtSecretKey;
const expires: number = config.security.jwtExpire;

/**
 * 签发 token
 */
export const signToken = (payload: object) => {
  return jwt.sign(
    {
      ...payload,
      expiresIn: expires,
    },
    secretKey,
    {
      expiresIn: expires,
    },
  );
};

/**
 * 验证 token
 */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("[Unauthorized] Invalid access token"); // Handle JWT errors
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new Error("[Unauthorized] Expired access token"); // Handle token expiration
    } else {
      throw new Error("[Unauthorized] Access token verification failed"); // Handle other errors
    }
  }
};
