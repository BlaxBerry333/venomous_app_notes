import { defineStore } from "pinia";

export type AccountDataType = {
  email: string;
  displayName: string;
  avatar: string;
};

const useAccount = defineStore(
  "account",
  () => {
    const account = ref<AccountDataType | null>(null);
    const isAuthenticated = ref<boolean>(false);

    async function handleLogoIn(_: Pick<AccountDataType, "email"> & { password: string }) {
      account.value = {
        email: _.email,
        displayName: "BlaxBerry",
        avatar: "https://avatars.githubusercontent.com/u/166675080?v=4",
      };
      isAuthenticated.value = true;

      navigateTo(PAGE_PATHNAME.noteList, { replace: true });
    }

    async function handleLogout() {
      navigateTo(PAGE_PATHNAME.home, { replace: true });

      account.value = null;
      isAuthenticated.value = false;
    }

    return {
      account,
      isAuthenticated,
      handleLogoIn,
      handleLogout,
    };
  },
  {
    persist: {
      pick: ["account", "isAuthenticated"],
    },
  },
);

export default useAccount;
