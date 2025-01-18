import { AccountDataType, CommonResponseDataType } from "~/utils/types";
import { AccountModel } from "~/server/models";
import { checkHashedMessageSync } from "~/server/utils/handle-bcrypt";
import { signToken } from "~/server/utils/handle-jwt";

export type PostAccountLoginRequestBodyType = Pick<AccountDataType, "email" | "password">;

export type PostAccountLoginReturnType = CommonResponseDataType<
  AccountDataType,
  {
    token: string;
    message: string;
  }
>;

/**
 * POST /api/account/login
 */
export default defineEventHandler(async (event): Promise<PostAccountLoginReturnType> => {
  try {
    const requestBody = (await readBody(event)) as PostAccountLoginRequestBodyType;

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

    const isPasswordMatched: boolean = checkHashedMessageSync(
      requestBody.password,
      existedAccount.password,
    );
    if (!isPasswordMatched) {
      event.node.res.statusCode = 401;
      return {
        code: 401,
        error: "[Bad Request] Wrong Password",
        data: null,
      };
    }

    // ------------------------------------------------------------------------------------------

    const updatedAccount = await AccountModel.findOneAndUpdate(
      { email: requestBody.email },
      {
        updated_at: new Date().toISOString(),
        is_active: true,
      },
      { new: true },
    );
    if (!updatedAccount) {
      event.node.res.statusCode = 500;
      return {
        code: 500,
        error: "[500] Something went wrong.",
        data: null,
      };
    }

    // --------------------------------------------------------------------------------

    const accountData: Omit<AccountDataType, "password"> = {
      _id: updatedAccount._id,
      display_name: updatedAccount.display_name,
      email: updatedAccount.email,
      avatar: updatedAccount.avatar,
      created_at: updatedAccount.created_at,
      updated_at: updatedAccount.updated_at,
      is_active: updatedAccount.is_active,
      role: updatedAccount.role,
    };

    event.node.res.statusCode = 200;
    return {
      code: 200,
      error: null,
      data: {
        token: signToken(accountData),
        message: "Account Login successfully.",
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
