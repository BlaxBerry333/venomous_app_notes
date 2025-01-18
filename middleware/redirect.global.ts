import { PAGE_PATHNAME } from "~/utils/get-page-pathname";
import useAccount from "~/composables/use-account";

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = storeToRefs(useAccount());

  if (to.path === PAGE_PATHNAME.home) {
    return;
  }

  const pathnameNoNeedAuthentication: string[] = [
    PAGE_PATHNAME.accountSignin,
    PAGE_PATHNAME.accountSignup,
  ];

  // 已经登录，访问登录相关页面时直接跳转到 note 列表
  if (isAuthenticated.value && pathnameNoNeedAuthentication.includes(to.path)) {
    return navigateTo(PAGE_PATHNAME.noteList, { replace: true });
  }

  // 未登陆，访问非登陆相关页面时直接跳转到登录
  if (!isAuthenticated.value && !pathnameNoNeedAuthentication.includes(to.path)) {
    return navigateTo(PAGE_PATHNAME.accountSignin, { replace: true });
  }
});
