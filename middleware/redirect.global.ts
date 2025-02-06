import { PAGE_PATHNAME } from "~/utils/get-page-pathname";
import useAccount from "~/composables/use-account";

const PATHNAME_NO_NEED_AUTHENTICATION: string[] = [
  PAGE_PATHNAME.accountSignin,
  PAGE_PATHNAME.accountSignup,
];

export default defineNuxtRouteMiddleware((to) => {
  const account = useAccount();

  if (to.path === PAGE_PATHNAME.home) {
    return;
  }

  // 检查 accessToken
  account.checkAccessToken();

  // 已经登录，访问登录相关页面时直接跳转到 note 列表
  if (account.isAuthenticated && PATHNAME_NO_NEED_AUTHENTICATION.includes(to.path)) {
    return navigateTo(PAGE_PATHNAME.noteList, { replace: true });
  }

  // 未登陆，访问非登陆相关页面时直接跳转到登录
  if (!account.isAuthenticated && !PATHNAME_NO_NEED_AUTHENTICATION.includes(to.path)) {
    return navigateTo(PAGE_PATHNAME.accountSignin, { replace: true });
  }
});
