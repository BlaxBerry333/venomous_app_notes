import useTheme from "./use-theme";

export default function () {
  const vuetifyTheme = useTheme();

  const storedThemeMode = useCookie<string>("theme-mode");

  // ------------------------------------------------------------------------------------------

  const isDarkModeTheme = computed<boolean>(() => vuetifyTheme.global.current.value.dark);

  function toggleTheme(): void {
    const newThemeMode = isDarkModeTheme.value ? "light" : "dark";

    vuetifyTheme.global.name.value = newThemeMode;
    storedThemeMode.value = newThemeMode;
  }

  // ------------------------------------------------------------------------------------------

  return {
    isDarkModeTheme,
    toggleTheme,
  };
}
