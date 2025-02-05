import { AccountDataType } from "~/utils/types";

export default defineEventHandler((event) => {
  const url = event.node.req.url;
  if (!url?.startsWith("/api/note")) {
    return;
  }

  // ------------------------------------------------------------------------------------------

  const authorization = event.node.req.headers.authorization;
  const accessToken = authorization?.split(" ")[1];
  if (!accessToken) {
    event.node.res.statusCode = 401;
    return {
      code: 401,
      error: "[401] Unauthorized",
      data: null,
    };
  }

  const decodedToken = verifyToken<AccountDataType>(accessToken);

  if (!decodedToken.data) {
    event.node.res.statusCode = 401;
    return {
      code: 401,
      error: "[401] Unauthorized",
      data: null,
    };
  }
});
