import { defineStore } from "pinia";
import type { PostAccountLoginReturnType } from "~/server/api/account/login.post";
import type { PostAccountSignupReturnType } from "~/server/api/account/signup.post";
import type { AccountDataType } from "~/utils/types";

const useAccount = defineStore(
  "account",
  () => {
    const accessToken = ref<string | null>(null);
    const account = ref<Omit<AccountDataType, "password"> | null>(null);
    const isAuthenticated = ref<boolean>(false);

    function _setDataAccordingToToken(token: string) {
      accessToken.value = token;
      account.value = decodeJWT<Omit<AccountDataType, "password">>(token).data;
      isAuthenticated.value = true;
    }
    function _clearData() {
      accessToken.value = null;
      account.value = null;
      isAuthenticated.value = false;
    }

    async function handleLogoIn(_: Pick<AccountDataType, "email" | "password">) {
      try {
        const { data } = await $fetch<PostAccountLoginReturnType>("/api/account/login", {
          method: "post",
          body: _,
          onResponseError: async ({ response }) => {
            if (response._data.error) {
              alert(response._data.error);
            }
          },
        });
        if (data) {
          _setDataAccordingToToken(data.token);
          navigateTo(PAGE_PATHNAME.noteList, { replace: true });
          return;
        }
      } catch {
        // ...
      }
    }

    async function handleLogout() {
      try {
        await $fetch<PostAccountLoginReturnType>("/api/account/logout", {
          method: "post",
          body: account.value,
          onResponse: () => {
            _clearData();
            navigateTo(PAGE_PATHNAME.home, { replace: true });
          },
          onResponseError: async ({ response }) => {
            if (response._data.error) {
              alert(response._data.error);
            }
          },
        });
      } catch {
        // ...
      }
    }

    async function handleSignup(_: Pick<AccountDataType, "email" | "display_name" | "password">) {
      try {
        const { data } = await $fetch<PostAccountSignupReturnType>("/api/account/signup", {
          method: "post",
          body: _,
          onResponseError: async ({ response }) => {
            if (response._data.error) {
              alert(response._data.error);
            }
          },
        });
        if (data) {
          _setDataAccordingToToken(data.token);
          navigateTo(PAGE_PATHNAME.noteList, { replace: true });
          return;
        }
      } catch {
        //  ...
      }
    }

    return {
      account,
      isAuthenticated,
      handleLogoIn,
      handleLogout,
      handleSignup,
    };
  },
  {
    persist: {
      pick: ["account", "isAuthenticated"],
    },
  },
);

export default useAccount;
