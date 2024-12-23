import useAccount from "~/composables/use-account";
import { PAGE_PATHNAME } from "~/utils/get-page-pathname";

export default function () {
  const { isAuthenticated } = useAccount();

  const navigationItems = [
    // {
    //   label: "nav.home",
    //   icon: "mdi-home",
    //   to: "/",
    // },

    ...(isAuthenticated.value
      ? [
          {
            label: "nav.account-profile",
            icon: "mdi-account",
            to: PAGE_PATHNAME.accountProfile,
          },
          {
            label: "nav.note-list",
            icon: "mdi-apps",
            to: PAGE_PATHNAME.noteList,
          },
          {
            label: "nav.note-create",
            icon: "mdi-pen-plus",
            to: PAGE_PATHNAME.noteCreate,
          },
        ]
      : []),
  ];

  // ------------------------------------------------------------------------------------------

  return {
    navigationItems,
  };
}
