import { AccountModel } from "~/server/models";
import { hashMessageSync } from "~/server/utils/handle-bcrypt";
import { AccountDataType, CommonResponseDataType } from "~/utils/types";

export type PostAccountSignupRequestBodyType = Pick<AccountDataType, "email" | "password">;

export type PostAccountSignupReturnType = CommonResponseDataType<
  AccountDataType,
  {
    account: AccountDataType;
    message: string;
  }
>;

/**
 * POST /api/account/signup
 */
export default defineEventHandler(async (event): Promise<PostAccountSignupReturnType> => {
  try {
    const requestBody = (await readBody(event)) as PostAccountSignupRequestBodyType;

    // ------------------------------------------------------------------------------------------

    const existedAccount = await AccountModel.findOne({
      email: requestBody.email,
    });
    if (existedAccount) {
      event.node.res.statusCode = 409;
      return {
        code: 409,
        error: "[409] Account already existed.",
        data: null,
      };
    }

    // ------------------------------------------------------------------------------------------

    const createdAccount = await AccountModel.create([
      {
        display_name: requestBody.email,
        email: requestBody.email,
        password: hashMessageSync(requestBody.password),
        avatar:
          "https://preview.redd.it/nothing-makes-you-smile-more-than-looking-into-the-face-of-v0-u5mzf8uvcy0a1.jpg?width=640&crop=smart&auto=webp&s=befd8c197595c2f760a9704a60234b9e98e14232",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true,
      },
    ]);

    // --------------------------------------------------------------------------------

    event.node.res.statusCode = 201;
    return {
      code: 201,
      error: null,
      data: {
        account: createdAccount[0],
        message: "Account created successfully.",
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
