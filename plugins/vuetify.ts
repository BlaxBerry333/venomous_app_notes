import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import colors from "vuetify/util/colors";

export default defineNuxtPlugin((app) => {
  const storedThemeMode = useCookie<string>("theme-mode");

  const vuetify = createVuetify({
    theme: {
      defaultTheme: storedThemeMode.value || "dark",
      themes: {
        light: {
          colors: {
            primary: colors.teal.base,
            secondary: colors.teal.lighten1,
          },
        },
        dark: {
          colors: {
            primary: colors.teal.base,
            secondary: colors.teal.darken1,
          },
        },
      },
    },

    defaults: {
      VBtn: {
        color: "primary",
        size: "large",
        class: "rounded-lg text-body-1",
      },
      VSheet: {
        class: "rounded-lg",
      },
      VCard: {
        class: "rounded-lg",
      },
      VListItem: {
        class: "rounded-lg",
      },
    },
  });
  app.vueApp.use(vuetify);
});
