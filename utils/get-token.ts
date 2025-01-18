import { jwtDecode } from "jwt-decode";

/**
 * 解析 token
 * @description
 * - iat: (令牌的发行时间戳) Math.floor(Date.now() / 1000)
 * - exp: (Token的过期时间戳) iat + tokenExpirationTime
 * - expiresIn: (表示Token的有效期限)
 */
export function decodeJWT<T>(token: string) {
  const decoded = jwtDecode(token);
  return decoded as {
    data: T;
    iat: number;
    exp: number;
    expiresIn: number;
  };
}
