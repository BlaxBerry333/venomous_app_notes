import jwt from "jsonwebtoken";

const config = useRuntimeConfig();
const secretKey: string = config.security.jwtSecretKey;
const expires: number = config.security.jwtExpire;

/**
 * 签发 token
 */
export function signToken(payload: object): string {
  return jwt.sign(
    {
      data: payload,
      expiresIn: expires,
    },
    secretKey,
    {
      expiresIn: expires,
    },
  );
}

/**
 * 验证 token
 * @description
 * - iat: (令牌的发行时间戳) Math.floor(Date.now() / 1000)
 * - exp: (Token的过期时间戳) iat + tokenExpirationTime
 * - expiresIn: (表示Token的有效期限)
 */
export function verifyToken<T>(token: string) {
  return jwt.verify(token, secretKey) as {
    data: T;
    iat: number;
    exp: number;
    expiresIn: number;
  };
}
