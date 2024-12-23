import { useTheme as useVuetifyTheme } from "vuetify";

export default function () {
  const vuetifyTheme = useVuetifyTheme();

  // ------------------------------------------------------------------------------------------

  onMounted(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        ::selection {
          background-color: ${vuetifyTheme.current.value.colors.primary}; /* 设置选中文本的背景色 */
          color: white;                                                   /* 设置选中文本的文字颜色 */
        }
      `;
    document.head.appendChild(style);
  });

  // ------------------------------------------------------------------------------------------

  return vuetifyTheme;
}
