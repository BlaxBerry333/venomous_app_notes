import { AccountDataType, CommonResponseDataType } from "~/utils/types";
import { AccountModel } from "~/server/models";

export type GetAccountDataRequestBodyType = Omit<AccountDataType, "password">;

export type GetAccountDataReturnType = CommonResponseDataType<
  AccountDataType,
  {
    account: AccountDataType;
    message: string;
  }
>;

/**
 * GET /api/account/<email>
 */
export default defineEventHandler(async (event): Promise<GetAccountDataReturnType> => {
  try {
    const accountEmail = event.context.params?.email;
    if (!accountEmail) {
      event.node.res.statusCode = 400;
      return {
        code: 400,
        error: "[bad request] Note ID is required.",
        data: null,
      };
    }

    // ------------------------------------------------------------------------------------------

    const account = await AccountModel.findOne({
      email: accountEmail,
    });
    if (!account) {
      event.node.res.statusCode = 404;
      return {
        code: 404,
        error: "[404] Note not found.",
        data: null,
      };
    }

    // ------------------------------------------------------------------------------------------

    event.node.res.statusCode = 200;
    return {
      code: 200,
      error: null,
      data: {
        account,
        message: "ok",
      },
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      code: 500,
      error: (error as Error).message,
      data: null,
    };
  }
});
