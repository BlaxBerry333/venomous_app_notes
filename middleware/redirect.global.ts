import { PAGE_PATHNAME } from "~/utils/get-page-pathname";
import useAccount from "~/composables/use-account";

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAccount();

  if (to.path === PAGE_PATHNAME.accountProfile) {
    if (!isAuthenticated.value) {
      return navigateTo(PAGE_PATHNAME.accountSignin);
    }
  }
});
