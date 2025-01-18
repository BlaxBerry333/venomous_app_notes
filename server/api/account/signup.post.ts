import { AccountDataType, AccountRoleType, CommonResponseDataType } from "~/utils/types";
import { AccountModel } from "~/server/models";
import { hashMessageSync } from "~/server/utils/handle-bcrypt";

export type PostAccountSignupRequestBodyType = Pick<
  AccountDataType,
  "email" | "password" | "display_name"
>;

export type PostAccountSignupReturnType = CommonResponseDataType<
  AccountDataType,
  {
    token: string;
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
        display_name: requestBody.display_name || requestBody.email,
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

    const accountData: Omit<AccountDataType, "password"> = {
      _id: createdAccount[0]._id,
      display_name: createdAccount[0].display_name,
      email: createdAccount[0].email,
      avatar: createdAccount[0].avatar,
      created_at: createdAccount[0].created_at,
      updated_at: createdAccount[0].updated_at,
      is_active: createdAccount[0].is_active,
      role: AccountRoleType["NORMAL"],
    };

    event.node.res.statusCode = 201;
    return {
      code: 201,
      error: null,
      data: {
        token: signToken(accountData),
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
