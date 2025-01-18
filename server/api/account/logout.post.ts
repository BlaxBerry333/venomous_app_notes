import { AccountModel } from "~/server/models";
import { AccountDataType, CommonResponseDataType } from "~/utils/types";

export type PostAccountLogoutRequestBodyType = Pick<AccountDataType, "email" | "password">;

export type PostAccountLogoutReturnType = CommonResponseDataType<
  AccountDataType,
  {
    account: AccountDataType;
    message: string;
  }
>;

/**
 * POST /api/account/logout
 */
export default defineEventHandler(async (event): Promise<PostAccountLogoutReturnType> => {
  try {
    const requestBody = (await readBody(event)) as PostAccountLogoutRequestBodyType;

    // ------------------------------------------------------------------------------------------

    const existedAccount = await AccountModel.findOne({
      email: requestBody.email,
    });
    if (!existedAccount) {
      event.node.res.statusCode = 404;
      return {
        code: 404,
        error: "[404] Account not found.",
        data: null,
      };
    }

    // ------------------------------------------------------------------------------------------

    const updatedAccount = await AccountModel.findOneAndUpdate(
      { email: requestBody.email },
      {
        ...requestBody,
        updated_at: new Date().toISOString(),
        is_active: false,
      },
      { new: true },
    );

    // --------------------------------------------------------------------------------

    event.node.res.statusCode = 200;
    return {
      code: 200,
      error: null,
      data: {
        account: updatedAccount as AccountDataType,
        message: "Account Logout successfully.",
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
