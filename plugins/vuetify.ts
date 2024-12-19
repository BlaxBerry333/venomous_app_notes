import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import colors from "vuetify/util/colors";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "dark",
      themes: {
        light: {
          colors: {
            primary: colors.teal.base,
            secondary: colors.teal.lighten2,
          },
        },
        dark: {
          colors: {
            primary: colors.teal.darken1,
            secondary: colors.teal.darken2,
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
