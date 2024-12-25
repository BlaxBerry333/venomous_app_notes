import { PAGE_PATHNAME } from "~/utils/get-page-pathname";
import useAccount from "~/composables/use-account";

export default defineNuxtRouteMiddleware((to) => {
  const account = useAccount();

  if (to.path === PAGE_PATHNAME.home) {
    return;
  }

  if (account.isAuthenticated && to.path === PAGE_PATHNAME.accountSignin) {
    return navigateTo(PAGE_PATHNAME.noteList, { replace: true });
  }

  if (
    !account.isAuthenticated &&
    to.path !== PAGE_PATHNAME.accountSignin &&
    to.path !== PAGE_PATHNAME.accountProfile
  ) {
    return navigateTo(PAGE_PATHNAME.accountSignin, { replace: true });
  }
});
