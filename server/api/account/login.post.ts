import { AccountModel } from "~/server/models";
import { checkHashedMessageSync } from "~/server/utils/handle-bcrypt";
import { AccountDataType, CommonResponseDataType } from "~/utils/types";

export type PostAccountLoginRequestBodyType = Pick<AccountDataType, "email" | "password">;

export type PostAccountLoginReturnType = CommonResponseDataType<
  AccountDataType,
  {
    account: AccountDataType;
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
    console.log({
      dbP: existedAccount.password,
      p: requestBody.password,
      isPasswordMatched,
    });

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
        ...requestBody,
        updated_at: new Date().toISOString(),
        is_active: true,
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
